import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';

function Feedback() {
    const {auth} = useSelector((state) => ({...state}))
    const [newFeedback, setNewFeedback] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const feedback = {
            SendBy: auth.user._id,
          Feedbacktext: newFeedback
        }
    
        try {
          const res = await axios.post("/feedback", feedback)
          setNewFeedback(" ")
          toast.success('Feedback Submitted',
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
                } catch (err) {
                console.log(err)
                }
            }
  return (
    <div style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "1068px",
        margin: 'auto',
    }}>
        <div className='container shadow-lg' style={{
            height: "60vh",
            width: "1000px",
            maxWidth: "800px",
            borderRadius: "10px",
            border: "3px solid #ababab",
        }}>
            <div className='row'>
                <div className='col-md-3'></div>
                <div className='col-md-6' style={{
                    marginTop: "30px"
                }}>
                    <h2 aria-hidden="true" style={{
                                    color: "#666666"
                                }}>Feedback Form</h2>
                    <p style={{
                                    color: "#858585"
                                }}>We would love to hear your thought, concers or problem with anything so we can improve!</p>
                    <hr/>
                    <form>
                        <div className='row'>
                            <div className='form-group mb-2'>
                                <label className='form-label' style={{
                                    color: "#858585"
                                }}>Do you wana say something? Then write below:</label>
                                <textarea rows="4" onChange={(e) => setNewFeedback(e.target.value)}  className='form-control' placeholder='Feedback....' required=""></textarea>
                            </div>
                            <button onClick={handleSubmit} className='btn btn-secondary mt-2'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Feedback