import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { read, userDetaileditInformation } from '../action/userdetails'
import { useSelector } from 'react-redux';
import UserProfileEditForm from "./UserProfileEditForm"



function UserProfileEdit({match}) {
  const {auth} = useSelector((state) => ({...state}))
  const {token} = auth
  const [values, setValues] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    age: '',
    gender: '',
    state: '',
    city: '',
    address: '',
    profession: '',
    relationshipstatus: '',
    contactno: ''
  });

  const [profileimage, setProfileImage] = useState('')
  const [citizenshipimage, setCitizenshipImage] = useState('')

  const [profilePreview, setProfilePreview] = useState('https://via.placeholder.com/200x200.png?text=PROFILE IMAGE PREVIEW')
  const [citizenshipPreview, setCitizenshipPreview] = useState('https://via.placeholder.com/200x200.png?text=CITIZENSHIP IMAGE PREVIEW')

  const {
    firstname, 
    lastname, 
    username, 
    email, 
    age, 
    gender,
    state, 
    city, 
    address, 
    profession, 
    relationshipstatus, 
    contactno
  } = values

  useEffect(() => {
    loadUserDetails()
  },[])

  const loadUserDetails = async () => {
    let res = await read(match.params.userId, auth.token)
    // console.log('USER DETAILS INFORMATION',res)
    setValues({...values, ...res.data});
    setProfilePreview(`${process.env.REACT_APP_API}/user-details/profileimage/${res.data._id}`)
    setCitizenshipPreview(`${process.env.REACT_APP_API}/user-details/citizenshipimage/${res.data._id}`)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let detailInformationData = new FormData()
    detailInformationData.append('firstname', firstname )
    detailInformationData.append('lastname', lastname )
    detailInformationData.append('username', username )
    detailInformationData.append('email', email )
    detailInformationData.append('age', age )
    detailInformationData.append('gender', gender )
    detailInformationData.append('state', state )
    detailInformationData.append('city', city )
    detailInformationData.append('address', address )
    detailInformationData.append('profession', profession )
    detailInformationData.append('relationshipstatus', relationshipstatus )
    detailInformationData.append('contactno', contactno )
    profileimage && detailInformationData.append('profileimage', profileimage)
    citizenshipimage && detailInformationData.append('citizenshipimage', citizenshipimage)

    try {
      let res = await userDetaileditInformation(token, detailInformationData, match.params.userId)
      console.log('Detail Information Create Response',res)
      toast.success('User Details Updated',
      {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      })
      setTimeout(() => {
        window.location.reload();
      }, 2000)
    } catch (error) {
      console.log(error)
      toast.error('Error Saving the Detail Information',
      {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      })
    }
    
  }

  const handleProfileImageChange = (e) => {
    setProfilePreview(URL.createObjectURL(e.target.files[0]))
    setProfileImage(e.target.files[0])
  }

  const handleCitizenshipImageChange = (e) => {
    setCitizenshipPreview(URL.createObjectURL(e.target.files[0]))
    setCitizenshipImage(e.target.files[0])
  }

  const handleChange = e => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  return (
    <div style={{
        height: "100vh",
        marginBottom: "600px"
    }}>
      <div className='container-fluid bg-secondary p-5 text-center'>
        <h2 style={{
          color: "white"
        }}>Edit User Details</h2>
      </div>
      <div className='container-fluid'  style={{
         maxWidth: "1068px",
         margin: 'auto',
      }}>
        <div className='row'>
          <div className='col-md-7'>
            <br/>
            <UserProfileEditForm
             handleChange={handleChange} 
             handleCitizenshipImageChange={handleCitizenshipImageChange}
             handleProfileImageChange={handleProfileImageChange}
             values={values}
             setValues={setValues}
             handleSubmit={handleSubmit} 
            />
          </div>
          <div className='col-md-5'>
          <div style={{
            marginBottom: "10px",
            marginTop: "10px"
          }}>
            <img src={profilePreview} className="img img-fluid m-2" alt="" />
          </div>
          <div style={{
             marginBottom: "10px",
          }}>
            <img src={citizenshipPreview} className="img img-fluid m-2" alt="" />
          </div>
          {/* <pre>
            {JSON.stringify(values, null, 4)}
          </pre> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfileEdit