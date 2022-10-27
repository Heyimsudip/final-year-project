import express from 'express'
import { getfeedback, postfeedback, removefeedback } from '../controllers/feedback';
import { requireSignin } from '../middleware/requireSignin';

const router = express.Router();

router.post("/feedback", requireSignin, postfeedback)
router.get("/getfeedback", requireSignin, getfeedback)
router.delete("/delete-feedback/:facebookId", requireSignin, removefeedback )

module.exports = router;