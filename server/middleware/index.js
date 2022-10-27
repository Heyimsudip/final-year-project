import Room from "../models/room"

export const roomOwner = async (req, res, next) => {
    let room = await Room.findById(req.params.roomId).exec()
    let owner = room.postedBy._id.toString() === req.user._id.toString();
    if(!owner) {
        return res.status(403).send("Unauthorized");
    }
    next();
}