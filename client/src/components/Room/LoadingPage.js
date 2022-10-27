import { SyncOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserInLocalStorage } from '../action/auth'
import { allInfo } from '../action/room'

function Lodingpage({history}) {
    const [currentuser, setCurrrentuser] = useState([])
    const {auth: current} = useSelector((state) => ({...state}))
    const dispatch = useDispatch()

    useEffect(() => {
        const CurrentUserInfo = async () => {
          let res = await allInfo(current.user._id, current.token)
          setCurrrentuser(res.data)
          console.log("CURRENT USER INFO", res.data)
          updateUserInLocalStorage(res.data, () => {
            //update redux
            dispatch({
                type: 'LOGGED_IN_USER',
                payload: res.data,
            });
            //redirect user to dashboard
            window.location.href = "/";
        })
        }
        CurrentUserInfo()
        
      }, [])
  return (
    <div className='d-flex justify-content-center font-weight-bold' style={{
        minHeight: "100vh"
    }}>
        <div className='d-flex align-items-center'>
            <SyncOutlined spin style={{fontSize: "50px"}} />
        </div>
    </div>
  )
}

export default Lodingpage