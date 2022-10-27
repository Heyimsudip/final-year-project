import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { conversation } from '../action/chat'
import { allInfo } from '../action/room'

function RoomOwnerProfile({match, history}) {
  const [owner, setOwnerInfo] = useState([])
  const {auth} = useSelector((state) => ({...state}))
  const [followed, setFollowed] = useState(false)

  useEffect(() => {
    setFollowed(auth && auth.user && auth.user.followings && auth.user.followings.includes(owner?._id));
  },[auth, owner])

  useEffect(() => {
    OwnerInfo()
  }, [])

  const OwnerInfo = async () => {
    let data = await allInfo(match.params.ownerId, auth.token)
    setOwnerInfo(data.data)
    console.log("OWNER INFO", data.data)
  }

    const handleClick = async () => {
      try {
        let res = await conversation(auth.token, owner._id, auth.user._id)
        console.log('New conversation create',res)
        history.push('/loadingpage')
      } catch (error) {
        console.log(error)
      }
    }


  return (
    <div className='d-flex justify-content-center align-items-center' style={{
      height: "100vh"
    }}>
      <div className="card d-flex justify-content-center align-items-center" style={{
      width: "18rem",
      borderRadius: "20px",
      border: "2px solid gray",
      background: "white"
    }}>
    <img style={{
      width: "125px",
      marginTop: "10px",
      height: "125px",
      borderRadius: "50%",
      border: "2px solid gray",
      objectFit: "cover"
    }} src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png" className="card-img-top" alt="..." />
    <div className="card-body d-flex flex-column justify-content-center align-items-center">
      <h5 className="card-title text-secondary">{owner.name}</h5>
      <p className='text-secondary text-muted'>{owner.email}</p>
      <br/>
      {owner.name !== auth.user.name &&
       (
        <button 
        onClick={handleClick} 
        className="btn btn-secondary">
          Chat
        </button>
       ) 
      }
      <p className='mt-2 text-secondary blockquote-footer'>Follow the room owner to chat</p>
    </div>
  </div>
    </div>
  )
}

export default RoomOwnerProfile