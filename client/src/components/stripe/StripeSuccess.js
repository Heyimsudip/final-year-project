import { SyncOutlined } from '@ant-design/icons'
import React, { useEffect } from 'react'
import {useSelector} from 'react-redux'
import { stripeSuccessRequest } from '../action/stripe'

function StripeSuccessfully({match, history}) {
    const {auth} = useSelector((state) => ({...state}))
    const {token} = auth

    useEffect(() => {
        // console.log("send the roomId to backend to create order", match.params.roomId);
        stripeSuccessRequest(token, match.params.roomId)
        .then(res => {
            // console.log('stripe success response', res.data)
           if(res.data.success){
            if(auth && auth.user && auth.user.role === "subscriber"){
                history.push("/basic")
            }else{
                history.push("/dashboard")
            }
           }else{
            history.push("/stripe/canceled")
           }
            
        })
    }, [match.params.roomId])
  return (
    <div className='d-flex justify-content-center font-weight-bold'style={{
        minHeight: "100vh"
    }}>
        <div className='d-flex align-items-center'>
            <SyncOutlined spin style={{fontSize: "50px"}} />
        </div>
    </div>
  )
}

export default StripeSuccessfully