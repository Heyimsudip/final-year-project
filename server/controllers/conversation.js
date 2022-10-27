import Conversation from "../models/Conversation";

export const newConversation = async (req, res) => {
    let sender = req.body.userId
    let receiver = req.params.ownerId
    let isChat = await Conversation.find({
        $and: [
            {members: {$elemMatch: {$eq: sender}}},
            {members: {$elemMatch: {$eq: receiver}}},
        ]
    })

    if(isChat.length>0){
        res.send(isChat)
    }else{
        let sender = req.body.userId
        let receiver = req.params.ownerId
        const convo = new Conversation({
            members: [sender, receiver]
        });
    
        try {
            const savedConversation = await convo.save()
            res.status(200).json(savedConversation)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

export const getconversation = async (req, res) => {
   try {
       const conversation = await Conversation.find({
            members: {$in:[req.params.userId]}
       })
       res.status(200).json(conversation)
   } catch (error) {
    res.status(500).json(err)
   }
};