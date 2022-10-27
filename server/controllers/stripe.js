import User from '../models/user'
import Room from '../models/room'
import Order from '../models/order'
import Stripe from 'stripe'
import queryString from 'query-string'

const stripe = Stripe(process.env.STRIPE_SECRET_ACCOUNT_KEY);

export const createConnectAccount = async (req, res) => {
    const user = await User.findById(req.user._id).exec();
    // console.log("USER => ", user)

    if(!user.stripe_account_id){
        const account = await stripe.accounts.create({
            type: "express",
        })
    
        // console.log("ACCOUNT ====>", account)
        user.stripe_account_id = account.id;
        user.save();
    }

    let accountLink = await stripe.accountLinks.create({
        account: user.stripe_account_id,
        refresh_url: process.env.STRIPE_REDIRECT_URL,
        return_url: process.env.STRIPE_REDIRECT_URL,
        type: 'account_onboarding'
    })

    accountLink = Object.assign(accountLink, {
        "stripe_user[email]": user.email || undefined,
    });

    // console.log('ACCOUNT LINK', accountLink);

    let link = `${accountLink.url}?${queryString.stringify(accountLink)}`
    res.send(link);
    // console.log("LOGIN LINK",link)
}

const updateDelayDays = async(accountId) => {
    const account = await stripe.accounts.update(accountId, {
        settings: {
            payouts: {
                schedule: {
                    delay_days: 7,
                }
            }
        }
    })
    return account;
}



export const getAccountStatus = async (req, res) => {
    // console.log('GET ACCOUNT STATUS')
    const user = await User.findById(req.user._id).exec();
    // console.log("USER => ", user)

    const account = await stripe.accounts.retrieve(user.stripe_account_id)
    // console.log('USER ACCOUNT RETRIEVE', account)

    //update delay days
    const updatedAccount = await updateDelayDays(account.id);

    const updatedUser = await User.findByIdAndUpdate(user._id, {
        stripe_seller: updatedAccount,
    }, {new: true}).select('-hashed_password').exec();

    // console.log(updatedUser);
    res.json(updatedUser);
}

export const getAccountBalance = async (req, res) => {
    const user = await User.findById(req.user._id).exec();

    try {
        const balance = await stripe.balance.retrieve({
            stripeAccount: user.stripe_account_id
        })
        // console.log('BALANCE ===>', balance)
        res.json(balance);
    } catch (err) {
        console.log(err)
    }
}

export const payoutSetting = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).exec();

        const loginLink = await stripe.accounts.createLoginLink(
            user.stripe_account_id,
            {
                redirect_url: process.env.STRIPE_SETTING_REDIRECT_URL,
            }
        );
        // console.log('LOGIN LINK FOR PAYOUT SETTING', loginLink)
        res.json(loginLink);
    } catch (err) {
        console.log('STRIPE PAYOUT SETTING ERR', err)
    }
}

export const stripeSessionId = async (req, res) => {
    // console.log('you hit stripe session id', req.body.roomId,)
    //1 get room id from req.body
    const {roomId} = req.body

    //2 find the room based room id from db
    const item = await Room.findById(roomId).populate('postedBy').exec();

    //3 20% charge as application fee
    const fee = (item.price * 0) / 100;

    //4 create a session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        //5 purchasing item details, it will be shown to user in checkout

        line_items: [
            {
                name: item.title,
                amount: item.price * 100, //in cents
                currency: "usd",
                quantity: 1,
            }
        ],

        //6 create payment intent with application fee and destinaation charge 80%
        payment_intent_data: {
            application_fee_amount: fee * 100,
            //tthis seller can see hims ballance in our frontend dashboard

            transfer_data: {
                destination: item.postedBy.stripe_account_id,
              },
        },

        success_url: `${process.env.STRIPE_SUCCESSFULLY_URL}/${item._id}`,
        cancel_url: process.env.STRIPE_CANCELED_URL,
    })

    //7 add this session onject to user in the db
    await User.findByIdAndUpdate(req.user._id, {stripeSession: session}).exec()

    //8 send session id as response to frontend
    res.send({
        sessionId: session.id,
    })
}

export const stripeSuccess = async (req, res) => {
    try {
        //1 get hotel id from req.body
const {roomId} = req.body
//2 find currently logged in user
const user = await User.findById(req.user._id).exec();

if(!user.stripeSession) return;

//3 retrive stripe session based on session id we previously save in user db
const session = await stripe.checkout.sessions.retrieve(user.stripeSession.id);
//4 if session payment status is paid,
if(session.payment_status === 'paid'){
    //5 check if order with that session id is already exist by quering orders collection
    const orderExist = await Order.findOne({'session.id': session.id}).exec();
    if(orderExist) {
        //6 if order exist, send success true
        res.json({success: true});
    }else{
        //7 else create new order and send success true
        let newOrder = await new Order({
            room: roomId,
            session,
            orderedBy: user._id
        }).save();
        //8 remove users's stripeSession
        await User.findByIdAndUpdate(user._id, {
            $set: { stripeSession: {} }
        });
        
        res.json({success: true})
    }
}
} catch (err) {
    console.log("STRIPE SUCCESS ERROR",err)
}
}