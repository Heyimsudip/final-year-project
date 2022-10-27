const User = require('../models/user')
const {OAuth2Client} = require('google-auth-library')
const jwt = require('jsonwebtoken')

const client = new OAuth2Client(process.env.GOOGLE_CLIENT)
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const socialmediaCtrl = {
    google: async (req, res) => {
        const {idToken} = req.body
        const verify = await client.verifyIdToken({idToken, audience: process.env.GOOGLE_CLIENT})
        const {email_verified, name, email} = verify.payload
        //create account in stripe
        const customer = await stripe.customers.create({
            email,
        })
        if(email_verified) {
            User.findOne({email}).exec((err, user) => {
                if(user){
                    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
                    const {_id, email, name, role, stripe_customer_id, subscriptions, followings, stripe_account_id, stripe_seller, stripeSession, createdAt} = user
                    return res.json({
                        token, user: {_id, email, name, role, stripe_customer_id, subscriptions, followings, stripe_account_id, stripe_seller, stripeSession, createdAt}
                    })
                }else{
                    let password = email + process.env.JWT_SECRET
                    user = new User({name, email, password, stripe_customer_id: customer.id})
                    user.save((err, data) => {
                        if(err) {
                            console.log('ERROR GOOGLE LOGIN ON USER SAVE', err)
                            return res.status(400).json({
                                error: 'User signup failed with google'
                            })
                        }

                        const token = jwt.sign({_id: data._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
                        const {_id, email, name, role, stripe_customer_id} = data
                        return res.json({
                            token, user: {_id, email, name, role, stripe_customer_id}
                        })
                    })


                }
            })
        }else{
            return res.status(400).json({
                error: 'Google login failed. Try again'
            })
        }
    }
}

module.exports = socialmediaCtrl