const User = require('../models/user')
const jwt = require('jsonwebtoken')
const sendEmail = require('./sendMail')
const sendforgotPasswordEmail = require('./sendforgotPasswordEmail')
const _ = require('lodash')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const authCtrl = {
    register: async (req, res) => {
        try {
            const {name, email, password} = req.body

            //create account in stripe
            const customer = await stripe.customers.create({
                email,
            })
            
    
            User.findOne({email}).exec((err, user) => {
            if(user){
                return res.status(400).json({
                    error: 'Email is taken'
                })
            }
    
            const token = jwt.sign({name, email, password, stripe_customer_id: customer.id}, process.env.JWT_ACCOUNT_ACTIVATION, {expiresIn: '10m'})
            
            sendEmail(email, token)
            res.json({msg: `message: Email has been sent to ${email}. Please follow the instruction to reset your password`})
        })
    
        } catch (error) {
            return res.status(500).json({msg: err.message})
        }
    },

    accountActivation: async (req, res) => {
        try {
            const {token} = req.body

        if(token) {
            jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, function (err, decoded){
                if(err){
                    console.log('JWT Verify In Account Activation Error', err)
                    return res.status(401).json({
                        error: 'Expred link. Signup again'
                    })
                }

                const {name, email, password, stripe_customer_id} = jwt.decode(token)
                
                const user = new User({name, email, password, stripe_customer_id})

                user.save((err, user) => {
                    if(err){
                        console.log('SAVE USER IN ACCOUNT ACTIVATION ERROR', err)
                        return res.status(401).json({
                            error: 'Error saving user in database. Try Signup again!'
                        })
                    }
                    return res.json({
                        message: 'Signup success. Please signin.'
                    })
                })

            })
        }else{
            return res.json({
                message: 'Something went wrong try again!!'
            })
        }
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    login: async (req, res) => {
        const {email, password} = req.body
        //check if user exist
        User.findOne({email}).exec((err, user) => {
            if(err || !user) {
                return res.status(400).json({
                    error: 'User with that email does not exist. Please sign up'
                })
            }
            //authenticate
            if(!user.authenticate(password)){
                return res.status(400).json({
                    error: 'Email and password do not match'
                })
            }
            //generate a token and send to client
            const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
            const {_id, name, email, role, stripe_customer_id, subscriptions, followings, stripe_account_id, stripe_seller, stripeSession, createdAt } = user

            return res.json({
                token,
                user: {_id, name, email, role, stripe_customer_id, subscriptions, followings, stripe_account_id, stripe_seller, stripeSession, createdAt}
            })
        })
    },

    forgotPassword: async (req, res) => {
        try {
            const {email} = req.body
            User.findOne({email}, (err, user) => {
                if(err || !user) {
                    return res.status(400).json({
                        error: 'User with that email does not exist'
                    })
                }
                const token = jwt.sign({_id: user._id, name: user.name}, process.env.JWT_RESET_PASSWORD, {expiresIn: '10m'})
                
                return user.updateOne({
                    resetPasswordLink: token
                  }, (err, success) => {
                      if(err) {
                          console.log('RESET PASSWORD LINK ERROR', err)
                          return res.status(400).json({
                              error: 'Database connection error on user password forgot request'
                          })
                      }else{
                        sendforgotPasswordEmail(email, token)
                        res.json({message: `Email has been sent to ${email}. Please follow the instruction to reset your password`})
    
                      }
                  })
                
            })
        } catch (error) {
            return res.status(500).json({msg: err.message})
        }
    },

    resetPassword: async (req, res) => {
        const {resetPasswordLink, newPassword} = req.body

        if(resetPasswordLink){
            jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function(err, decoded){
                if(err){
                    return res.status(400).json({
                        error: 'Expred link. Try again'
                    })
                }

                User.findOne({resetPasswordLink}, (err, user) => {
                    if(err || !user) {
                        return res.status(400).json({
                            error: 'Something went wrong. Try later'
                        });
                    }

                    const updatedFields = {
                        password: newPassword,
                        resetPasswordLink: ''
                    }

                    user = _.extend(user, updatedFields)

                    user.save((err, result) => {
                        if(err){
                            return res.status(400).json({
                                error: 'Error resetting user password'
                            })
                        }
                        res.json({
                            message: `Great! Now you can login with your new password`
                        })
                    })
                })
            })
        }
    }
}

module.exports = authCtrl