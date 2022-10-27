import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

function AdminCard({user}) {
    const {auth} = useSelector((state) => ({...state}))
    const deleteUser = async () =>{
        const res = await axios.delete(`${process.env.REACT_APP_API}/delete-user/${user._id}`, {
            headers: {
                Authorization: `Bearer ${auth.token}`,
            },
        })
        console.log(res.data)
        toast.success('Feedback Removed',
            {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            setTimeout(() => {
            window.location.reload();
            }, 1000)
    }
  return (
    <div className='container'>
        <div className="row" style={{
        maxWidth: "1068px",
        margin: 'auto',
   }}>
       <div className="mb-4">
           <div className="card">
           <div className="card-body">
               <h5 className="card-title">
                   Username: {user?.name}
                   </h5>
               <h6 className="card-title">
                   Email: {user?.email}
                   </h6>
                <h6 className="card-title">
                   Role: {user?.role}
                   </h6>
               <button 
               onClick={deleteUser} 
               className="btn btn-primary">Remove</button>
           </div>
           </div>
       </div>
   </div>
    </div>
  )
}

export default AdminCard