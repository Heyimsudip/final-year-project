import Message from "../models/Message";

export const newmessage = async (req, res) => {
    const addMessage = new Message(req.body)

    try {
        const savedMessage = await addMessage.save()
        res.status(200).json(savedMessage)
    } catch (error) {
        res.status(500).json(err)
    }
 };

 export const getmessage = async (req, res) => {
   try {
       const messages = await Message.find({
        conversationId: req.params.conversationId,
       });
       res.status(200).json(messages);
   } catch (error) {
    res.status(500).json(err)
   }
 };