import express from 'express'
import { getconversation, newConversation } from '../controllers/conversation';
import { requireSignin } from '../middleware/requireSignin';

const router = express.Router();

router.post("/newconversation/:ownerId", requireSignin, newConversation)
router.get("/getconversation/:userId", requireSignin, getconversation)

module.exports = router;