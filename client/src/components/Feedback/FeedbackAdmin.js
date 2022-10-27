import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { allfeedback } from '../action/admin'
import FeedbackCard from './FeedbackCard'

function FeedbackAdmin() {
  const {auth} = useSelector((state) => ({...state}))
  const [feedback, getFeedback] = useState([])

  useEffect(() =>{
    loadFeedbackList()
  },[])

  const loadFeedbackList = async () => {
    let res = await allfeedback(auth.token)
    getFeedback(res.data)
    console.log(res.data)
  }

  return (
    <div style={{
        marginTop: "60px",
        marginBottom: "30px",
        height: "100vh"
    }}>
      <div style={{
         maxWidth: "1068px",
         margin: 'auto',
         fontSize: "40px",
          marginBottom: "5px"
      }}>
        <span>Feedback</span>
      </div>
      {
      feedback.map(f =>(
        <FeedbackCard key={f._id} response={f}/>
      ))
    }
    </div>
  )
}

export default FeedbackAdmin