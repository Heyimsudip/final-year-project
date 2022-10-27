import React, { useState } from 'react'
import CitizenshipModal from '../modals/CitizenshipModal'
import { useHistory } from "react-router-dom";

function UserProfileForm({u}) {
  let history = useHistory();
  const editpage = () =>{
    history.push(`/userprofile/edit/${u._id}`)
  }
  const [showModal, setShowModal] = useState(false);
  return (
    <div className='d-flex justify-content-center align-items-center' style={{
        height: "100vh"
      }}>
        <div className="card d-flex justify-content-center align-items-center" style={{
        width: "30rem",
        borderRadius: "20px",
        border: "4px solid #c7c7c7",
        background: "white"
      }}>
      {u.profileimage && u.profileimage.contentType ? (
        <img style={{
          width: "125px",
          marginTop: "15px",
          height: "125px",
          borderRadius: "50%",
          border: "5px solid #c7c7c7",
          objectFit: "cover"
        }} src={`${process.env.REACT_APP_API}/user-details/profileimage/${u._id}`} className="card-img-top" alt="..." />
      ):(
        <img style={{
          width: "125px",
          marginTop: "15px",
          height: "125px",
          borderRadius: "50%",
          border: "2px solid #c7c7c7",
          objectFit: "cover"
        }} src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png" className="card-img-top" alt="..." />
      )}
      <div className="card-body d-flex flex-column justify-content-center align-items-center">
        <h5 className="card-title text-secondary">
           Full Name:  {u.firstname} {u.lastname}
        </h5>
        <h9 className='text-secondary text-muted'>
           Email: {u.email}
        </h9>
        <h9 className='text-secondary text-muted'>
            Username: {u.username}
        </h9>
        <h9 className='text-secondary text-muted'>
           Age: {u.age}
        </h9>
        <h9 className='text-secondary text-muted'>
            Gender: {u.gender}
        </h9>
        <h9 className='text-secondary text-muted'>
            State: {u.state}
        </h9>
        <h9 className='text-secondary text-muted'>
            City: {u.city}
        </h9>
        <h9 className='text-secondary text-muted'>
            Address: {u.address}
        </h9>
        <h9 className='text-secondary text-muted'>
            Profession: {u.profession}
        </h9>
        <h9 className='text-secondary text-muted'>
            Relationship Status: {u.relationshipstatus}
        </h9>
        <h9 className='text-secondary text-muted'>
            Contact Number: {u.contactno}
        </h9>
        <br/>
        {showModal && <CitizenshipModal u={u} showModal={showModal} setShowModal={setShowModal} />}
        <div className='d-flex justify-content-between h4'>
          <button className="btn btn-secondary" onClick={editpage} style={{
            marginRight: "15px"
          }}>Update Details</button>
            <button onClick={() => setShowModal(!showModal)} 
            className='btn btn-primary'>Citizenship Photo</button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default UserProfileForm