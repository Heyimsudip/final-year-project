import User from "../models/user"

//newly created subscribed user
export const alluser = async (req, res) => {
    let user = await User.find().sort({"createdAt" : -1})
    .select('-hashed_password')
    .select('-subscriptions')
    .select('-stripe_seller')
    .select('-stripeSession')
    .select('-stripe_customer_id')
    .select('-stripe_account_id')
    res.send(user)
}

export const allsubscribeduser = async (req, res) => {
    let user = await User.find({role: "subscriber"}).sort({"createdAt" : -1})
    .select('-hashed_password')
    // .select('-subscriptions')
    // .select('-stripe_seller')
    .select('-stripeSession')
    // .select('-stripe_customer_id')
    // .select('-stripe_account_id')
    res.send(user)
}

export const removeuser = async (req, res) => {
    let removed = await User.findByIdAndDelete(req.params.userId)
    .exec();
    res.json(removed)
}