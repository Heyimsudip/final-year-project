import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'
import { UserContext } from '../../context';
import Google from './Google';
import { authenticate, isAuth } from './helpers'
import {useDispatch} from 'react-redux'


function Signin({history}) {
    const [state, setState] = useContext(UserContext)
    const [values, setValues] = useState({
        email: "",
        password: "",
        buttonText: "Submit"
    });
    const dispatch = useDispatch()

    const {email, password, buttonText} = values
    

    const handleChange = (name) => (event) => {
        setValues({...values, [name]: event.target.value})
    }

    const informParent = response => {
        authenticate(response, () => {
            isAuth() && isAuth().role === 'admin' ? history.push('/admindashboard') : history.push('/basic/seller')
        })
    }

    const ClickSubmit = event =>{
        event.preventDefault()
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signin`,
            data: {email, password}
        })
        .then(response => {
            console.log('SIGNIN SUCCESS', response);
            setState(response.data)
            dispatch({
                type: 'LOGGED_IN_USER',
                payload: response.data
            })
            
            
            //save the response (user, token) localstorage/cookie
            authenticate(response, () => {
                setValues({...values, name: '', email: '', password: '', buttonText: "Submitted"})
                toast.success(`Hey ${response.data.user.name}, Welcome back!`,
                {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                isAuth() && isAuth().role === 'admin' ? history.push('/admindashboard') : history.push('/basic/seller')
            })
        })
        .catch(error => {
            console.log('SIGNIN ERROR', error.response.data)
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

    console.log('STATE =>', state)

    const signinForm = () => (
        <form>
            <div className='form-group'>
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} defaultValue={email} type="email" className="form-control" placeholder='Enter your email' />
            </div>
            <br />
            <div className='form-group'>
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} defaultValue={password} type="password" className="form-control" placeholder='Enter your password' />
            </div>
            <br />
            <div>
                <button className='btn btn-primary' onClick={ClickSubmit}>{buttonText}</button> {" "}
                <Link to="/auth/password/forgot" className='btn btn-outline-danger ml-2'>
                    Forgot Password
                </Link>
            </div>
        </form>
    )

    console.log('STATE =>', state)
  return (
            <div className='col-md-6 offset-md-3' style={{
                minHeight: "100vh"
            }}>
                <ToastContainer />
                {isAuth() ? <Redirect to="/dashboard" /> : null}
                <h1 className='p-5 text-center'>Login</h1>
                {signinForm()}
                <br/>
                <Google informParent={informParent}/>
            </div>
  )
}

export default Signin