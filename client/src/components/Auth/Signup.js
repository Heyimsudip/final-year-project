import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Layout from '../Layout/Layout'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { isAuth } from './helpers'

function Signup() {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        buttonText: "Submit"
    });

    const {name, email, password, buttonText} = values

    const handleChange = (name) => (event) => {
        setValues({...values, [name]: event.target.value})
    }

    const ClickSubmit = event =>{
        event.preventDefault()
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signup`,
            data: {name, email, password}
        })
        .then(response => {
            console.log('SIGNUP SUCCESS', response)
            setValues({...values, name: '', email: '', password: '', buttonText: "Submitted"})
            toast.success(response.data.msg,
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
            console.log('SIGNUP ERROR', error.response.data)
            setValues({...values, buttonText: 'Submit'})
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

    const signupForm = () => (
        <form>
            <div className='form-group'>
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} defaultValue={name} type="text" className="form-control" placeholder='Enter your name' />
            </div>
            <br/>
            <div className='form-group'>
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} defaultValue={email} type="email" className="form-control" placeholder='Enter your email'/>
            </div>
            <br/>
            <div className='form-group'>
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} defaultValue={password} type="password" className="form-control" placeholder='Enter your password' />
            </div>
            <br/>
            <div>
                <button className='btn btn-primary' onClick={ClickSubmit}>{buttonText}</button> {" "}
                <Link to="/auth/password/forgot" className='btn btn-outline-danger ml-2'>
                    Forgot Password
                </Link>
            </div>
        </form>
    )

  return (
    <Layout>
            <div className='col-md-6 offset-md-3' style={{
                minHeight: "100vh"
            }}>
                <ToastContainer />
                {isAuth() ? <Redirect to="/" /> : null}
                <h1 className='p-5 text-center'>Register</h1>
                {signupForm()}
            </div>
    </Layout>
  )
}

export default Signup