import axios from 'axios'

export const userDetailInformation = async (token, data) =>
    await axios.post(`${process.env.REACT_APP_API}/user-details-information`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
})

export const userdetails = async (token) => 
    await axios.get(`${process.env.REACT_APP_API}/user-details`, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
})

export const read = async (userId, token) =>
    await axios.get(`${process.env.REACT_APP_API}/userdetails/${userId}`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    export const userDetaileditInformation = async (token, data, userId) =>
    await axios.put(`${process.env.REACT_APP_API}/update-user-information/${userId}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
})

export const searchListings = async (query) =>
    await axios.post(`${process.env.REACT_APP_API}/search-listings`, query);

