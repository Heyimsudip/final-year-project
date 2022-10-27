import React, { useEffect } from 'react'
import {LoadingOutlined} from '@ant-design/icons'
import {useSelector, useDispatch} from 'react-redux'
import { getAccountStatus } from '../action/stripe';
import { updateUserInLocalStorage } from '../action/auth';



function StripeCallback({history}) {
    const {auth} = useSelector((state) => ({...state}));
    const dispatch = useDispatch()

    useEffect(() => {
        if(auth && auth.token) accountStatus()
    }, [auth])

    const accountStatus = async () => {
        try {
            const res = await getAccountStatus(auth.token)
            // console.log('USER ACCOUNT STATUS ON STRIPE CALL BACK', res)
            //update user in local storage
            updateUserInLocalStorage(res.data, () => {
                //update redux
                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: res.data,
                });
                //redirect user to dashboard
                window.location.href = "/basic/seller";
            })
        } catch (err) {
            console.log(err)
        }
    }

  return (
    <div className='d-flex justify-content-center p-5'>
        <LoadingOutlined className='display-1 p-5 text-danger' />
    </div>
  )
}

export default StripeCallback