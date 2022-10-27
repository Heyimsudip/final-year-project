import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {userDetailInformation, userdetails} from "../action/userdetails"
import DetailInformationForm from './DetailInformationForm';
import { useHistory } from "react-router-dom";

function DetailInformation() {
  const {auth} = useSelector((state) => ({...state}))
  let history = useHistory();
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
    contactno: '',
    profileimage: '',
    citizenshipimage: '',
  });

  const [profilePreview, setProfilePreview] = useState('https://via.placeholder.com/200x200.png?text=PROFILE IMAGE PREVIEW')
  const [citizenshipPreview, setCitizenshipPreview] = useState('https://via.placeholder.com/200x200.png?text=CITIZENSHIP IMAGE PREVIEW')

  //destructuring variables from state
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
    contactno,
    profileimage,
    citizenshipimage
  } = values

  const [userDetails, setUserDetails] = useState([])

  useEffect(() =>{
    loaduserdetails()
  },[])

  const loaduserdetails = async () => {
    let {data} = await userdetails(auth.token)
    setUserDetails(data)
  }

  console.log('USER DETAILS', userDetails[0])

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

    console.log([...detailInformationData])

    try {
      let res = await userDetailInformation(token, detailInformationData)
      console.log('Detail Information Create Response',res)
      toast.success('User Details Created',
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
    setValues({...values, profileimage: e.target.files[0]})
  }

  const handleCitizenshipImageChange = (e) => {
    setCitizenshipPreview(URL.createObjectURL(e.target.files[0]))
    setValues({...values, citizenshipimage: e.target.files[0]})
  }

  const handleChange = e => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  const UserProfile = () => {
    history.push(`/userprofile/${userDetails[0]._id}`)
  }


  return (
    
    <div style={{
      height: "100vh",
      marginTop: "40px",
      marginBottom: "600px"
    }}>
      <div className='p-5 container-fluid bg-secondary text-center'> 
      <h2 style={{
        color: 'white'
      }}>User Detail Informtion</h2>
      </div>
      <div className='container-fluid' style={{
         maxWidth: "1068px",
         margin: 'auto',
      }}>
        <div className='row'>
        <div className='col-md-7'>
          <br />
          <button onClick={UserProfile} disabled={!userDetails[0]} className='btn btn-outline-primary m-2'>View Profile</button>
          <DetailInformationForm 
            handleChange={handleChange} 
            handleCitizenshipImageChange={handleCitizenshipImageChange}
            handleProfileImageChange={handleProfileImageChange}
            values={values}
            setValues={setValues}
            handleSubmit={handleSubmit} />
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

export default DetailInformation