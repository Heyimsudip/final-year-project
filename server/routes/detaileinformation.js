import express from 'express'
import { requireSignin } from '../middleware/requireSignin';
import formidable from 'express-formidable'
import { createuserdetail, profileimage, detailInformationofuser, cityzenshipimage, detailInfoofuser, updateuserinfo, detailuser } from '../controllers/detailinformation';

const router = express.Router();

router.post("/user-details-information", requireSignin, formidable(), createuserdetail)
router.get("/user-details/profileimage/:userId", profileimage)
router.get("/user-details/citizenshipimage/:userId", cityzenshipimage)
router.get("/user-details", requireSignin, detailInformationofuser)
router.get("/userinfodetails/:userId", requireSignin, detailuser)
router.get("/userdetails/:userId", requireSignin, detailInfoofuser)
router.put("/update-user-information/:userId", requireSignin, formidable(), updateuserinfo)


module.exports = router;