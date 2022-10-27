import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { userRoomBookings } from '../action/room'
import {useSelector} from 'react-redux'
import ConnectNav from './ConnectNav'
import BookingCard from '../Cards/BookingCard'

function UserDashboard() {
    const {auth} = useSelector((state) => ({...state}))
    const {token} = auth
    const [booking, setBooking] = useState([])

    useEffect(() => {
        loadUserBookings()
    }, [])

    const loadUserBookings = async () => {
        const res = await userRoomBookings(token)
        console.log(res)
        setBooking(res.data)
    }

  return (
    <><div className='container-fluid bg-secondary p-5'>
    <ConnectNav />
</div>
      <br/>
            <div className='container-fluid' style={{
      maxWidth: "1068px",
      margin: 'auto',
      height: "100vh"
   }} >
                <div className='row' >
                    <div className='col-md-10'>
                        <h2>Your Bookings</h2>
                    </div>
                    <div className='col-md-2'>
                        <Link to="/" className='btn btn-primary'>Browse Rooms</Link>
                    </div>
                </div>
            </div>
            <br />
            <div className='row'>
            {booking.map(b => (
                    <BookingCard  key={b._id} room={b.room} session={b.session} orderedBy={b.orderedBy}  />
                ))}
            </div></>
  )
}

export default UserDashboard