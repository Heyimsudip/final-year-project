import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { allnewlyregisteruser } from '../action/admin'
import AdminCard from './AdminCard/AdminCard'


function AdminPage() {
  const {auth} = useSelector((state) => ({...state}))
  const [userlist, setuserlist] = useState([])

  useEffect(() =>{
    loadalluserdata()
  },[])

  const loadalluserdata = async () => {
    let res = await allnewlyregisteruser(auth.token)
    setuserlist(res.data)
  }

  console.log("newly register user", userlist)
  return (
    <div style={{
      marginTop: "60px",
      marginBottom: "30px",
  }}>
    <div style={{
       maxWidth: "1068px",
       margin: 'auto',
       fontSize: "40px",
        marginBottom: "5px"
    }}>
      <span>User List</span>
    </div>
    
    {
    userlist.map(u =>(
        <AdminCard key={u._id} user={u}/>
    ))
  }
  </div>
  )
}

export default AdminPage