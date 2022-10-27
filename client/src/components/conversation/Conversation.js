import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./conversation.css"

function Conversation({conversation, currentUser}) {
  const [user, setUser] = useState(null)

  useEffect(() =>{
    const friendId = conversation.members.find((m) => m !== currentUser._id)
    const getUser = async () => {
      try {
        const res = await axios(`/user/${friendId}`)
        console.log('Friend Infomation',res.data)
        setUser(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getUser()
  },[currentUser, conversation])

  return (
    <div className='conversation'>
      <img className='conversationImg'
        src='https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png'
        alt='defaultprofile'/>
      <span className='conversationName'>{user && user.name}</span>
    </div>
  )
}

export default Conversation