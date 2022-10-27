import express from 'express'
import { create, rooms, image, sellerRooms, remove, read, update, userRoomBookings, isAlreadyBooked, searchListings} from '../controllers/room';
import { requireSignin } from '../middleware/requireSignin';
import formidable from 'express-formidable'
import { roomOwner} from '../middleware';

const router = express.Router();

router.post("/create-room", requireSignin, formidable(), create)
router.get("/rooms", rooms)
router.get("/room/image/:roomId", image)
router.get("/seller-rooms", requireSignin, sellerRooms)
router.delete("/delete-room/:roomId", requireSignin, roomOwner, remove )
router.get("/room/:roomId", read)
router.put('/update-room/:roomId', requireSignin, roomOwner, formidable(), update)
router.get('/user-room-bookings', requireSignin, userRoomBookings)
router.get('/is-already-booked/:roomId', requireSignin, isAlreadyBooked)
router.post('/search-listings', searchListings)


module.exports = router;