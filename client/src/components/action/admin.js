import axios from "axios";

export const allnewlyregisteruser = async (token) =>
    await axios.get(`${process.env.REACT_APP_API}/admin/alluser`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
})

export const allnewlyregistersubscriber = async (token) =>
    await axios.get(`${process.env.REACT_APP_API}/admin/allsubscribeduser`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
})

export const allfeedback = async (token) =>
    await axios.get(`${process.env.REACT_APP_API}/getfeedback`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })