import React, { useEffect, useState } from 'react'
import { allnewlyregistersubscriber} from '../../action/admin';
import { useSelector } from 'react-redux';
import AdminCard from '../AdminCard/AdminCard';

function Subscriberlist() {
  const {auth} = useSelector((state) => ({...state}))
  const [subscriberlist, setsubscriberlist] = useState([])

  useEffect(() =>{
    loadalluserdata()
  },[])

  const loadalluserdata = async () => {
    let res = await allnewlyregistersubscriber(auth.token)
    setsubscriberlist(res.data)
    console.log("newly register user", res.data)
  }
  

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
      <span>Subscriber List</span>
    </div>
    {
    subscriberlist.map(u =>(
      <AdminCard key={u._id} user={u}/>
    ))
  }
  </div>
  )
}

export default Subscriberlist