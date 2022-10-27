const express = require('express')

//import controller
const authCtrl = require('../controllers/auth')
const socialmediaCtrl = require('../controllers/socialmedia')

//import validators
const {userSignupValidator, userSigninValidator, forgotPasswordValidator, resetPasswordValidator} = require('../validators/auth')
const {runValidation} = require('../validators/index')

const router = express.Router()

router.post('/signup', userSignupValidator, runValidation, authCtrl.register)
router.post('/account-activation', authCtrl.accountActivation)
router.post('/signin', userSigninValidator, runValidation, authCtrl.login)

//forgot reset password
router.put('/forget-password', forgotPasswordValidator, runValidation, authCtrl.forgotPassword )
router.put('/reset-password', resetPasswordValidator, runValidation, authCtrl.resetPassword)

//google and facebook
router.post('/google-login', socialmediaCtrl.google)

module.exports = router

