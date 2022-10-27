import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { userdetails } from '../action/userdetails'
import UserProfileForm from './UserProfileForm'

function UserProfile() {
  const [userDetails, setUserDetails] = useState([])
  const {auth} = useSelector((state) => ({...state}))

  useEffect(() =>{
    loaduserdetails()
  },[])

  const loaduserdetails = async () => {
    let {data} = await userdetails(auth.token)
    setUserDetails(data)
}

console.log(userDetails)
  return (
    <div style={{
      height: "100vh"
    }}>
      {userDetails.map((u) =><UserProfileForm key={u._id} u={u}/>)}
    </div>
  )
}

export default UserProfile