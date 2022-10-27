import axios from 'axios';
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import Layout from '../Layout/Layout'

function Forgot({history}) {
    const [values, setValues] = useState({
        email: "",
        buttonText: "Request password reset link"
    });

    const {email, buttonText} = values

    const handleChange = (name) => (event) => {
        setValues({...values, [name]: event.target.value})
    }

    const ClickSubmit = event =>{
        event.preventDefault()
        setValues({...values, buttonText: 'Submitting'})
        console.log('send request')
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/forget-password`,
            data: {email}
        })
        .then(response => {
            console.log('FORGOT PASSWORD SUCCESS', response);
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
            setValues({...values, buttonText: 'Rquested'})
        })
        .catch(error => {
            console.log('FORGOT PASSWORD ERROR', error.response.data)
            setValues({...values, buttonText: 'Request password reset link'})
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

    const resetPasswordForm = () => (
        <form>
            <div className='form-group'>
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} defaultValue={email} type="email" className="form-control" />
            </div>
            <br/>
            <div>
                <button className='btn btn-primary' onClick={ClickSubmit}>{buttonText}</button>
            </div>
        </form>
    )
  return (
    <Layout>
            <div className='col-md-6 offset-md-3' style={{
                minHeight: "100vh"
            }}>
                <ToastContainer />
                <h1 className='p-5 text-center'>Forgot Password</h1>
                {resetPasswordForm()}
            </div>
    </Layout>
  )
}

export default Forgot