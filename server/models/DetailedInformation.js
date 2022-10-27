const mongoose = require('mongoose')

const {Schema} = mongoose
const {ObjectId} = mongoose.Schema

const detailInformationSchema = new Schema({
    firstname: {
                type: String,
                required: "First Name is required"
            },
            lastname: {
                type: String,
                required: "Last Name is required"
            },
            username: {
                type: String,
                required: "Username is required"
            },
            email: {
                type: String,
                required: "Email is required"
            },
            age: {
                type: Number,
                required: "Email is required"
            },
            gender: {
                type: String,
                required: "Gender is required"
            },
            state: {
                type: String,
                required: "State is required"
            },
            city: {
                type: String,
                required: "City is required"
            },
            address: {
                type: String,
                required: "Address is required"
            },
            profession: {
                type: String,
                required: "Profession is required"
            },
            relationshipstatus: {
                type: String,
                required: "Relationship Status is required"
            },
            contactno: {
                type: Number,
                required: "Contact Number is required"
            },
            profileimage: {
                data: Buffer,
                contentType: String,
            },
            citizenshipimage: {
                data: Buffer,
                contentType: String,
            },
            detailedInformationof: {
                type:ObjectId,
                ref: "User"
            }

},  {timestamps: true})

module.exports = mongoose.model('DetailInformation', detailInformationSchema);