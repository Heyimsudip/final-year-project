import Room from '../models/room'
import Order from '../models/order'
import fs from "fs";

export const create = async (req, res) => {
    // console.log('req.fields', req.fields)
    // console.log('req.files', req.files)
    try {
        let fields = req.fields
        let files = req.files

        let room = new Room(fields);
        room.postedBy = req.user._id
        //handle image
        if(files.image){
            room.image.data = fs.readFileSync(files.image.path);
            room.image.contentType = files.image.type;
        }

        room.save((err, result) => {
            if(err){
                console.log('saving hotel err =>', err)
                res.status(400).send('ERROR SAVING ROOM')
            }
            res.json(result);
        })

    } catch (err) {
        console.log(err)
        res.status(400).json({
            err: err.message
        })
    }
}

export const rooms = async (req, res) => {
    let all = await Room.find({isBooked: "No"})
    .limit(20)
    .select('-image.data')
    .populate('postedBy', '_id name')
    .exec();
    // console.log(all)
    res.json(all)
};

export const image = async (req, res) => {
    let room = await Room.findById(req.params.roomId).exec();
    if(room && room.image && room.image.data !== null){
        res.set('Content-Type', room.image.contentType)
        return res.send(room.image.data);
    }
}

export const sellerRooms = async (req, res) => {
    let all = await Room.find({postedBy: req.user._id})
    .select('-image.data')
    .populate('postedBy', '_id name')
    .exec()
    console.log(all)
    res.send(all);
}

export const remove = async (req, res) => {
    let removed = await Room.findByIdAndDelete(req.params.roomId)
    .select('-image.data')
    .exec();
    res.json(removed)
}

export const read  = async (req, res) => {
    let room = await Room.findById(req.params.roomId)
    .populate('postedBy', '_id name')
    .select('-image.data')
    .exec();
    console.log('SINGLE ROOM', room)
    res.json(room)
}

export const update = async (req, res) => {
    // console.log('req.fields', req.fields)
    // console.log('req.files', req.files)
    try {
        let fields = req.fields
        let files = req.files

        let data = {...fields}

        if(files.image){
            let image = {}
            image.data = fs.readFileSync(files.image.path)
            image.contentType = files.image.type;

            data.image = image;
        }

        let update = await Room.findByIdAndUpdate(req.params.roomId, data, {new: true})
        .select("-image.data")
        res.json(update)

    } catch (err) {
        console.log(err)
        res.status(400).send("Hotel update failed. Try again")
    }
}

export const userRoomBookings = async (req, res) => {
    const all = await Order.find({orderedBy: req.user._id})
    .select('session')
    .populate('room', '-image.data')
    .populate('orderedBy', '_id name')
    .exec()
    res.json(all);
}

export const isAlreadyBooked = async (req, res) => {
    const {roomId} = req.params;
    //find orders of the currently logged in user
    const userOrders = await Order.find({orderedBy: req.user._id})
    .select('room')
    .exec();
    //check if hotel id is found in userOrders array
    let ids = []
    for (let i = 0; i < userOrders.length; i++){
        ids.push(userOrders[i].room.toString());
    }

    res.json({
        ok: ids.includes(roomId),
    })
}

export const searchListings = async (req, res) => {
    const {
        address, 
            price, 
            contract, 
            noofrooms, 
            noofbathroom, 
            balcony, 
            solarwater,
            drinkingwater,
            electricity,
            wastemng,
            wifi,
            parking
    } = req.body
    let result = await Room.find({address,price, 
        contract, 
        noofrooms, 
        noofbathroom, 
        balcony, 
        solarwater,
        drinkingwater,
        electricity,
        wastemng,
        wifi,
        parking })
    .select("-image.data")
    .exec();
    res.json(result)
}