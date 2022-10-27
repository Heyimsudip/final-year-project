import axios from "axios";

export const conversation = async (token, ownerId, userId) =>
    await axios.post(`${process.env.REACT_APP_API}/newconversation/${ownerId}`, {userId}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
})