const mongoose = require("mongoose")
const {Schema} = mongoose
const {ObjectId} = mongoose.Schema

const FeedbackSchema = new mongoose.Schema(
    {
        SendBy: {
            type:ObjectId,
            ref: "User"
        },
        Feedbacktext: {
            type: String,
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Feedback", FeedbackSchema)