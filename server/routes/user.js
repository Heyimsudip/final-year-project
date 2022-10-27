const express = require('express')
const userCtrl = require('../controllers/user')
const { adminMiddleware } = require('../middleware/adminMiddleware')
const { requireSignin } = require('../middleware/requireSignin')

const router = express.Router()

router.get('/user/:id', requireSignin, userCtrl.read)
router.put('/user/update', requireSignin, userCtrl.update)
router.put('/admin/update', requireSignin, adminMiddleware, userCtrl.update)

module.exports = router