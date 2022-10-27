import { SyncOutlined } from '@ant-design/icons'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import MainProfilePage from './MainProfilePage'

function FriendProfile({match}) {
    const [userDetails, setUserDetails] = useState([])
    const {auth} = useSelector((state) => ({...state}))

    useEffect(() =>{
        const getUser = async () => {
            try {
              const res = await axios(`/userinfodetails/${match.params.userId}`)
              setUserDetails(res.data)
            } catch (err) {
              console.log(err)
            }
          }
          getUser()
    },[match.params.userId])

    console.log(userDetails)
  return (
    <div className='d-flex justify-content-center font-weight-bold' style={{
        minHeight: "100vh"
    }}>
        {userDetails.map((u) =><MainProfilePage key={u._id} u={u}/>)}
    </div>
  )
}

export default FriendProfile