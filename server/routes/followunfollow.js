import express from 'express'
import { follow, ownerinfo, unfollow } from '../controllers/followunfollow';
import { requireSignin } from '../middleware/requireSignin';

const router = express.Router();

router.put("/:id/follow", requireSignin, follow)
router.put("/:id/unfollow", requireSignin, unfollow)
router.get('/ownerinfo/:ownerId', requireSignin, ownerinfo)


module.exports = router;
