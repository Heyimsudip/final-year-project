import express from 'express'
import { createSubscription, prices, subscriptionStatus, subscriptions, customerportal } from '../controllers/subs';
import { requireSignin } from '../middleware/requireSignin';

const router = express.Router();

router.get("/prices", prices)
router.post("/create-subscription", requireSignin, createSubscription)
router.get('/subscription-status', requireSignin, subscriptionStatus)
router.get('/subscriptions', requireSignin, subscriptions)
router.get('/customer-portal', requireSignin, customerportal)

module.exports = router;