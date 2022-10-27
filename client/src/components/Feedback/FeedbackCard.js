import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

function FeedbackCard({response}) {
    const [user, getUser] = useState([])
    const {auth} = useSelector((state) => ({...state}))
    useEffect(() =>{
        loadUser()
    },[])

    const loadUser = async () =>{
        const res = await axios.get(`${process.env.REACT_APP_API}/user/${response.SendBy}`,{
            headers: {
                Authorization: `Bearer ${auth.token}`,
            },
        })
        getUser(res.data)
        console.log(res.data)
    }

    const deleteFeedback = async () =>{
        const res = await axios.delete(`${process.env.REACT_APP_API}/delete-feedback/${response._id}`, {
            headers: {
                Authorization: `Bearer ${auth.token}`,
            },
        })
        console.log(res.data)
        toast.success('Feedback Removed',
            {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            setTimeout(() => {
            window.location.reload();
            }, 1000)
    }

  return (
    <div className='container'>
        <div className="row" style={{
        maxWidth: "1068px",
        margin: 'auto',
   }}>
       <div className="mb-4">
           <div className="card">
           <div className="card-body">
               <h5 className="card-title">Username: {user.name}</h5>
               <h6 className="card-title">Email: {user.email}</h6>
               <p className="card-text">Feedback: {response.Feedbacktext}</p>
               <button onClick={deleteFeedback} className="btn btn-primary">Remove</button>
           </div>
           </div>
       </div>
   </div>
    </div>
  )
}

export default FeedbackCard