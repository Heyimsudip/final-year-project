import Feedback from "../models/Feedbackmodel";

export const postfeedback = async (req, res) => {
    const addfeedback = new Feedback(req.body)
    addfeedback.SendBy = req.user._id
    try {
        const savedFeedback = await addfeedback.save()
        res.status(200).json(savedFeedback)
    } catch (error) {
        res.status(500).json(err)
    }
 };

 export const getfeedback = async (req, res) => {
    let feedback = await Feedback.find().exec();
    res.json(feedback)
 };



 export const removefeedback = async (req, res) => {
    let removed = await Feedback.findByIdAndDelete(req.params.facebookId)
    .exec();
    res.json(removed)
}