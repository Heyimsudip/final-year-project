import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { allInfo } from '../action/room'


function Notification({notification, sender, setNotification, notif}) {
    const [sendername, setSendername]= useState()
    const {auth} = useSelector((state) => ({...state}))

    const history = useHistory

    useEffect(() =>{
       const getuserinfo = async () => {
           try {
               const res = await allInfo(sender,auth.token)
               console.log('Sender Info', res.data.name)
                setSendername(res.data.name)
           } catch (error) {
            console.log(error)
           }
       }
       getuserinfo()
    },[])

  return (
    <div onClick={() =>{
        setNotification(notification.filter((n) => n !== notif))
    }}>
        {`New Message from ${sendername}`}
    </div>
  )
}

export default Notification