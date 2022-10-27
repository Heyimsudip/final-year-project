import React, { useEffect, useState } from 'react'
import {isAlreadyBooked, read} from '../action/room';
import {useSelector} from 'react-redux'
import { getSessionId } from '../action/stripe';
import {loadStripe} from '@stripe/stripe-js'

function ViewRoom({match, history}) {
    const [room, setRoom] = useState({});
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false)
    const [alreadyBooked, setAlreadyBooked] = useState(false);
    const {auth} = useSelector((state) => ({...state}))
    
    useEffect(() => {
        loadSellerRoom()
    },[])

    useEffect(() => {
        if(auth && auth.token) {
            isAlreadyBooked(auth.token, match.params.roomId)
            .then(res => {
                // console.log(res)
                if(res.data.ok) setAlreadyBooked(true);
            })
        }
    },[])

    const loadSellerRoom = async () => {
        let res = await read(match.params.roomId)
        console.log(res)
        setRoom(res.data)
        setImage(`${process.env.REACT_APP_API}/room/image/${res.data._id}`)
      };
    
    const handleClick = async e => {
        e.preventDefault()

        if(!auth || !auth.token){
            history.push('/signin')
            return;
        }
        
        setLoading(true)
        if(!auth) history.push('/signin')
        console.log(auth.token, match.params.roomId);
        let res = await getSessionId(auth.token, match.params.roomId)
        // console.log("get sessionid response, res.data.sessionId", res.data.sessionId)
        const stripe = await loadStripe(process.env.REACT_APP_SCTRIPE_KEY)
        stripe.redirectToCheckout({
            sessionId: res.data.sessionId,
        })
        .then((result) => console.log(result));
    }

  return (
    <div style={{
        minHeight: "100vh",
        marginBottom: "30px"
    }}>
        <div className='container-fluid bg-secondary p-5 text-center'>
            <h2 className='text-white'>{room.title}</h2>
        </div>
        <div className='container-fluid' style={{
             maxWidth: "1068px",
             margin: 'auto',
        }}>
            <div className='row'>
                <div className='col-md-6'>
                    <br />
                    <img src={image} alt={room.title} className="img img-fluid m-2" />
                </div>

                <div className='col-md-6 mt-4'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <p className='blockquote'>Entire rental unit hosted by {room.postedBy && room.postedBy.name}</p>
                    </div>
                    <hr />
                    <p className='card-text'>
                            <span className='float-right text-muted blockquote-footer'>
                                Address: {room.address}  
                            </span>
                    </p>
                    <p className='card-text'>
                            <span className='float-right text-muted blockquote-footer'>
                                Contract: {room.contract}  
                            </span>
                    </p>
                    <p className='card-text'>
                            <span className='float-right text-muted blockquote-footer'>
                                No of Rooms: {room.noofrooms}  
                            </span>
                    </p>
                    <p className='card-text'>
                            <span className='float-right text-muted blockquote-footer'>
                                No of Bathrooms: {room.noofbathroom}  
                            </span>
                    </p>
                   <div className='container'>
                       <div className='row'>
                       <div className='col-sm'>
                            <div className='d-flex align-items-center'>
                            <img src='/balcony.png' alt='logo' style={{
                            width: "30px",
                            height: "30px"
                        }} />
                        <div className='text-muted ms-2'>
                            : {room.balcony}
                        </div> 
                        </div>
                        <br/>
                            <div className='d-flex align-items-center'>
                            <img src='/solar-energy.png' alt='logo' style={{
                            width: "30px",
                            height: "30px",
                        }} /> <div className='text-muted ms-2'>
                                : {room.solarwater}
                        </div>
                            </div>
                        <br/>
                        <div className='d-flex align-items-center'>
                        <img src='/garbage-bin.png' alt='logo' style={{
                            width: "30px",
                            height: "30px",
                        }} />
                        <div className='text-muted ms-2'>
                        : {room.wastemng}
                        </div>
                        </div>
                        <br/>
                        <div className='d-flex align-items-center'>
                        <img src='/parking-area.png' alt='logo' style={{
                            width: "30px",
                            height: "30px",
                        }} />
                        <div className='text-muted ms-2'>
                        : {room.parking}
                        </div>
                        </div>
                    </div>
                    <div className='col-sm'>
                    <div className='d-flex align-items-center'>
                    <img src='/drink.png' alt='logo' style={{
                            width: "30px",
                            height: "30px"
                        }} />
                        <div className='text-muted ms-2'>
                        : {room.drinkingwater}
                        </div>
                    </div>
                    <br/>
                        <div className='d-flex align-items-center'>
                        <img src='/plugin.png' alt='logo' style={{
                            width: "30px",
                            height: "30px",
                        }} />
                        <div className='text-muted ms-2'>
                        : {room.electricity}
                        </div>
                        </div>
                        <br/>
                        <div className='d-flex align-items-center'>
                        <img src='/wifi-router.png' alt='logo' style={{
                            width: "30px",
                            height: "30px",
                        }} />
                        <div className='text-muted ms-2'>
                        : {room.wifi}
                        </div>
                        </div>     
                    </div>
                    </div>
                   </div>
                    
                    <br />
                    <div className='d-flex justify-content-between align-items-center alert alert-secondary'>
                        <p>Price: ${room.price} / month</p>
                        <p>Posted by: {room.postedBy && room.postedBy.name}</p>
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                    <button onClick={handleClick} className='btn btn-block btn-sm btn-primary mt-1' disabled={loading || alreadyBooked}>
                        {loading 
                            ? "Loading..." 
                            : alreadyBooked
                            ? "Already Booked"
                            : auth && auth.token 
                            ? 'Book Now' 
                            : 'Login to Book'}
                    </button>
                    {auth && auth.token &&(
                        <button  onClick={() => history.push(`/profile/${room.postedBy._id}`)} className='btn btn-block btn-sm btn-outline-danger mt-1 '>
                            Room Owner Profile
                        </button>
                    )}
                    </div>
                    <hr />
                    <p className='blockquote mt-2' style={{
                        fontSize: "15px"
                    }}>{room.content && room.content.substring(0, 200)}...</p>
                    <hr />
                </div>
            </div>
        </div>
    </div>

  )
}

export default ViewRoom