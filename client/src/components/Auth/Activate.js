import React, { useState, useEffect } from 'react'
import {} from 'react-router-dom'
import Layout from '../Layout/Layout'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Activate({match}) {
    const [values, setValues] = useState({
        name: "",
        token: "",
        show: true,
    });

    useEffect(() => {
        let token = match.params.token;
        let {name} = jwt.decode(token)

        if(token) {
            setValues({...values, name, token})
        }
    }, [])

    const {name, token, show} = values;

    const ClickSubmit = event =>{
        event.preventDefault()
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/account-activation`,
            data: {token}
        })
        .then(response => {
            console.log('ACCOUNT ACTIVATION', response)
            setValues({...values, show: false})
            toast.success(response.data.message,
                {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
        })
        .catch(error => {
            console.log('ACCOUNT ACTIVATION ERROR', error.response.data.error)
            toast.error(error.response.data.error,
                {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
        })
    }

    const activationLink = () => (
        <div className='text-center'>
            <h1 className='p-5'>Hey {name}, Ready to activate your account?</h1>
            <button className='btn btn-outline-primary' onClick={ClickSubmit}>Activate Account</button>
        </div>
    )

  return (
    <Layout>
            <div className='col-md-6 offset-md-3' style={{
                height: "100vh"
            }}>
                <ToastContainer />
                {activationLink()}
            </div>
    </Layout>
  )
}

export default Activate