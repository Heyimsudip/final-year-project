import express from 'express'
import { allsubscribeduser, alluser, removeuser } from '../controllers/admin';
import {requireSignin} from "../middleware/requireSignin"

const router = express.Router();

router.get("/admin/alluser", requireSignin, alluser)
router.get("/admin/allsubscribeduser", requireSignin, allsubscribeduser)
router.delete("/delete-user/:userId", requireSignin, removeuser )


module.exports = router;