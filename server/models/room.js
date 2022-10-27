const mongoose = require('mongoose')

const {Schema} = mongoose
const {ObjectId} = mongoose.Schema

const roomSchema = new Schema({
    title: {
        type: String,
        required: 'Title is required',
    },
    content: {
        type: String,
        required: 'Content is required',
        maxlength: 5000,
    },
    address: {
        type: String,
        required: 'Address is required',
        maxlength: 50,
    },
    price: {
        type: Number,
        required: 'Price is required',
        trim: true,
    },
    postedBy: {
        type:ObjectId,
        ref: "User"
    },
    image: {
        data: Buffer,
        contentType: String,
    },
    contract: {
        type: String,
        required: 'Contract is required',
    },
    noofrooms: {
        type: Number,
        required: 'Number of rooms are required',
    },
    noofbathroom: {
        type: Number,
        required: 'Number of bath rooms required',
    },
    balcony: {
        type: String,
        required: 'If Balcony is avaliable or not is required',
    },
    solarwater: {
        type: String,
        required: 'If Solar Water is avaliable or not is required',
    },
    drinkingwater: {
        type: String,
        required: 'If Drinking water is avaliable or not is required',
    },
    electricity: {
        type: String,
        required: 'If  electricity is avaliable or not is required',
    },
    wastemng: {
        type: String,
        required: 'If waste management is avaliable or not is required',
    },
    wifi: {
        type: String,
        required: 'If Wi-Fi is avaliable or not is required',
    },
    parking: {
        type: String,
        required: 'If Parking is avaliable or not is required',
    },
    latitude: {
        type: String,
        required: true,
    },
    longitude: {
        type: String,
        required: true,
    },
    isBooked: {
        type: String,
        required: 'For Default value select No to post this rooms information',
    }

},  {timestamps: true})

module.exports = mongoose.model('Room', roomSchema);