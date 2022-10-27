import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { isAuth, getCookie, signout, updatedUser } from '../Auth/helpers';

function Admin({history}) {
  const [values, setValues] = useState({
      role: '',
      name: "",
      email: "",
      password: "",
      buttonText: "Submit"
  });

  const token = getCookie('token')

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = () => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('PRIVATE PROFILE UPDATE', response)
      const {role, name, email} = response.data
      setValues({...values, role, name, email})
    })
    .catch(error => {
      console.log('PROFILE UPDATE ERROR', error.response.data.error)
      if(error.response.status === 401){
          signout(() => {
            history.push('/')
          })
      }
    })
  }

  const {role, name, email, password, buttonText} = values

  const handleChange = (name) => (event) => {
      setValues({...values, [name]: event.target.value})
  }

  const ClickSubmit = event =>{
      event.preventDefault()
      setValues({...values, buttonText: 'Submitting'})
      axios({
          method: 'PUT',
          url: `${process.env.REACT_APP_API}/admin/update`,
          headers: {
            Authorization: `Bearer ${token}`
          },
          data: {name, password}
      })
      .then(response => {
          console.log('PRIVATE PROFILE UPDATE SUCCESS', response);
          updatedUser(response, () => {
            setValues({...values, buttonText: "Submitted"})
            toast.success('Profile Updated Successfully',
                {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
          });
      })
      .catch(error => {
          console.log('PRIVATE PROFILE UPDATE SIGNUP ERROR', error.response.data.error)
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

  const updateForm = () => (
      <form style={{
        minHeight: "100vh"
    }}>
            <div className='form-group'>
              <label className="text-muted">Role</label>
              <input defaultValue={role} type="text" className="form-control" disabled />
          </div>
          <br />
          <div className='form-group'>
              <label className="text-muted">Name</label>
              <input onChange={handleChange('name')} defaultValue={name} type="text" className="form-control" />
          </div>
          <br />
          <div className='form-group'>
              <label className="text-muted">Email</label>
              <input defaultValue={email} type="email" className="form-control" disabled/>
          </div>
          <br />
          <div className='form-group'>
              <label className="text-muted">Password</label>
              <input onChange={handleChange('password')} defaultValue={password} type="password" className="form-control" />
          </div>
          <br />
          <div>
              <button className='btn btn-primary' onClick={ClickSubmit}>{buttonText}</button>
          </div>
      </form>
  )

return (
          <div className='col-md-6 offset-md-3'>
              <ToastContainer />
              <h1 className='pt-5 text-center'>Admin</h1>
              <p className='lead text-center'>Profile Update</p>
              {updateForm()}
          </div>
)
}

export default Admin