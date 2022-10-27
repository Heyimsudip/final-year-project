const mongoose = require('mongoose')
const {Schema} = mongoose
const {ObjectId} = mongoose.Schema

const orderSchema = new mongoose.Schema({
    room: {
        type: ObjectId,
        ref: 'Room'
    },
    session: {},
    orderedBy: {
        type: ObjectId,
        ref: "User"
    }
},  {timestamps: true})

module.exports = mongoose.model('Order', orderSchema);