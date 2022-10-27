import { Select } from 'antd';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { userdetails } from '../action/userdetails';

const {Option} = Select;

function DetailInformationForm(props) {
    const {values, handleChange, handleCitizenshipImageChange, handleProfileImageChange, handleSubmit, setValues} = props
    const {firstname, lastname, address, username, email, age, state, city, profession, contactno } = values
    const [userDetails, setUserDetails] = useState([])
    const {auth} = useSelector((state) => ({...state}))
  
    useEffect(() =>{
      loaduserdetails()
    },[])
  
    const loaduserdetails = async () => {
      let {data} = await userdetails(auth.token)
      setUserDetails(data)
  }

    console.log(userDetails[0])

  return (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label className='btn btn-outline-secondary btn-block m-2 text-left'>
          Profile Image
          <input 
            type="file" 
            name='profileimage' 
            onChange={handleProfileImageChange} 
            accept="image/*" 
            hidden />
        </label> 

        <label className='btn btn-outline-secondary btn-block m-2 text-left'>
          Citizenship Image
          <input 
            type="file" 
            name='citizenshipimage' 
            onChange={handleCitizenshipImageChange} 
            accept="image/*" 
            hidden />
        </label> 
      </div>
      <div className='form-group'>
        <label className='ms-2 mt-2 h6'>First Name</label>
        <input 
          type="text" 
          name='firstname' 
          onChange={handleChange} 
          placeholder="Enter the First Name" 
          className='form-control ms-2'
          value={firstname} 
        />
      </div>
      <div className='form-group'>
          <label className='ms-2 mt-2 h6'>Last Name</label>
          <input 
            type="text" 
            name='lastname' 
            onChange={handleChange} 
            placeholder="Enter the Last Name" 
            className='form-control ms-2'
            value={lastname} 
          />
      </div>
      <div className='form-group'>
          <label className='ms-2 mt-2 h6'>Username</label>
          <input 
            type="text" 
            name='username' 
            onChange={handleChange} 
            placeholder="Enter the Username" 
            className='form-control ms-2'
            value={username} 
          />
      </div>
      <div className='form-group'>
          <label className='ms-2 mt-2 h6'>Email</label>
          <input 
            type="text" 
            name='email' 
            onChange={handleChange} 
            placeholder="Enter the Email" 
            className='form-control ms-2'
            value={email} 
          />
      </div>
      <div className='form-group'>
          <label className='ms-2 mt-2 h6'>Age</label>
          <input 
            type="number" 
            name='age' 
            onChange={handleChange} 
            placeholder="Enter the Age" 
            className='form-control ms-2'
            value={age} 
          />
      </div>
      <div className='form-group'>
        <label className='ms-2 mt-2 h6'>Gender</label>
          <Select onChange={(value) => setValues({...values, gender: value})} 
          className="w-100 m-2" 
          size='large' 
          placeholder="Enter the Gender">
          <Option key={"Male"}>Male</Option>
          <Option key={"Female"}>Female</Option>
          <Option key={"Other"}>Other</Option>
        </Select>
      </div>
      <div className='form-group'>
          <label className='ms-2 mt-2 h6'>State</label>
          <input 
            type="text" 
            name='state' 
            onChange={handleChange} 
            placeholder="Enter the State" 
            className='form-control ms-2'
            value={state} 
          />
      </div>
      <div className='form-group'>
          <label className='ms-2 mt-2 h6'>City</label>
          <input 
            type="text" 
            name='city' 
            onChange={handleChange} 
            placeholder="Enter the City" 
            className='form-control ms-2'
            value={city} 
          />
      </div>
      <div className='form-group'>
          <label className='ms-2 mt-2 h6'>Address</label>
          <input 
            type="text" 
            name='address' 
            onChange={handleChange} 
            placeholder="Enter the Address" 
            className='form-control ms-2'
            value={address} 
          />
      </div>
      <div className='form-group'>
          <label className='ms-2 mt-2 h6'>Profession</label>
          <input 
            type="text" 
            name='profession' 
            onChange={handleChange} 
            placeholder="Enter the Profession" 
            className='form-control ms-2'
            value={profession} 
          />
      </div>
      <div className='form-group'>
        <label className='ms-2 mt-2 h6'>Relationship Status</label>
          <Select onChange={(value) => setValues({...values, relationshipstatus: value})} 
          className="w-100 m-2" 
          size='large' 
          placeholder="Enter the Relationship Status">
          <Option key={"Single"}>Single</Option>
          <Option key={"Married"}>Married</Option>
        </Select>
      </div>
      <div className='form-group'>
          <label className='ms-2 mt-2 h6'>Contact Number</label>
          <input 
            type="number" 
            name='contactno' 
            onChange={handleChange} 
            placeholder="Enter the Contact Number" 
            className='form-control ms-2 mb-2'
            value={contactno} 
          />
      </div>
      <button disabled={userDetails[0]} className='btn btn-outline-primary m-2'>Save</button>
    </form>
  )
}

export default DetailInformationForm