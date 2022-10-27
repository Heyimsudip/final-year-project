import express from 'express'
import { getmessage, newmessage } from '../controllers/message';
import { requireSignin } from '../middleware/requireSignin';

const router = express.Router();

router.post("/newmessage", requireSignin, newmessage)
router.get("/getmessage/:conversationId", requireSignin, getmessage)

module.exports = router;