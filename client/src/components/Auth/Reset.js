import axios from 'axios';
import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { toast, ToastContainer } from 'react-toastify'
import Layout from '../Layout/Layout'

function Reset({match}) {
    const [values, setValues] = useState({
        name: "",
        token: "",
        newPassword: "",
        buttonText: "Reset password"
    });

    useEffect(() => {
        let token = match.params.token
        let {name} = jwt.decode(token)
        if(token) {
            setValues({...values, name, token})
        }

    }, [])

    const { name, token, newPassword,  buttonText} = values

    const handleChange = (event) => {
        setValues({...values, newPassword: event.target.value})
    }

    const ClickSubmit = event =>{
        event.preventDefault()
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/reset-password`,
            data: {newPassword, resetPasswordLink: token}
        })
        .then(response => {
            console.log('RESET PASSWORD SUCCESS', response);
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
            setValues({...values, buttonText: 'Done'})
        })
        .catch(error => {
            console.log('RESET PASSWORD ERROR', error.response.data)
            setValues({...values, buttonText: 'Reset password'})
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

    const passwordForgotForm = () => (
        <form>
            <div className='form-group'>
                <label className="text-muted">New Password</label>
                <input onChange={handleChange} defaultValue={newPassword} type="password" className="form-control" placeholder='Type new Password' required />
            </div>
            <div>
                <button className='btn btn-primary' onClick={ClickSubmit}>{buttonText}</button>
            </div>
        </form>
    )
  return (
    <Layout>
            <div className='col-md-6 offset-md-3'>
                <ToastContainer />
                <h1 className='p-5 text-center'>Hey {name}, Type your new password</h1>
                {passwordForgotForm()}
            </div>
    </Layout>
  )
}

export default Reset