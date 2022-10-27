import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {FiEye} from "react-icons/fi"
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom"

function Headers({currentChat, currentUser}) {
    const [user, setUser] = useState([])
    let history = useHistory();
    const friend = currentChat.members.find(member => member !== currentUser)
    console.log('friend', friend)

    useEffect(() =>{
        const getUser = async () => {
            try {
              const res = await axios(`/user/${friend}`)
              console.log('Friend Infomation',res.data)
              setUser(res.data)
            } catch (err) {
              console.log(err)
            }
          }
          getUser()
    },[friend])


      const viewProfile = () =>{
          history.push(`/friendProfile/${user._id}`)
      }



  return (
   <div className='d-flex justify-content-center align-items-center' style={{
       backgroundColor: "#dbdbdb",
       borderRadius: "10px",
   }}>
    <div style={{
        marginTop: "15px",
        marginRight: "10px"
    }}>
       <h2 style={{
           color: "rgb(114, 114, 114)"
       }}>{user && user.name}</h2>
    </div>
    <div>
        <FiEye 
        onClick={viewProfile} 
        style={{
          fontSize: "20px",
          color: "rgb(114, 114, 114)"
        }} />
      </div>
   </div>
  )
}

export default Headers