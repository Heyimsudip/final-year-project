import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ConnectNav from './ConnectNav'
import DashboardNav from './DashboardNav'
import {useSelector} from "react-redux"
import {HomeOutlined} from "@ant-design/icons"
import {createConnectAccount} from "../action/stripe"
import { toast } from 'react-toastify'
import { deleteHotel, sellerRooms } from '../action/room'
import SmallCard from '../Cards/SmallCard'

function DashboardSeller() {
    const {auth} = useSelector((state) => ({...state}))
    const [rooms, setRooms] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        loadSellersRooms()
    }, [])

    const loadSellersRooms = async () => {
        let {data} = await sellerRooms(auth.token)
        setRooms(data)
    }

    const handleClick = async () => {
        setLoading(true)
        try {
            let res = await createConnectAccount(auth.token)
            console.log(res) //get login link
            window.location.href = res.data
        } catch (err) {
            console.log(err)
            toast.error('Stripe connection failed, Try Again.',
                {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            setLoading(false);
        }
    }

    const handleRoomDelete = async (roomId) => {
        if(!window.confirm('Are you sure? You want to delete this room.')) return;
        deleteHotel(auth.token, roomId).then(res => {
            toast.success('Room deleted successfully.',
                {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                loadSellersRooms();
        })
    }

    const connected = () => (
        <div className='container-fluid' style={{
            maxWidth: "1068px",
            margin: 'auto',
         }}>
            <div className='row' >
                <div className='col-md-10'>
                    <h2 >Your Rooms</h2>
                </div>
                <div className='col-md-2'>
                    <Link to="/rooms/newRoom" className='btn btn-primary'>+ Add New</Link>
                </div>
            </div>
            <div className='row' style={{
         maxWidth: "1068px",
         margin: 'auto',
      }}>
                {
                    rooms.map(r => <SmallCard key={r._id} r={r} showViewMoreButton={false} owner={true} handleRoomDelete={handleRoomDelete}/>)
                }
            </div>
        </div>
    )
    const notConnected = () => (
        <div className='container-fluid' >
            <div className='row'>
                <div className='col-md-6 offset-md-3 text-center'>
                    <div className='p-5 pointer'>
                        <HomeOutlined className='h1' />
                        <h4>Setup payouts to post rooms</h4>
                        <p className='lead'>MERN partners with stripe to transfer earning to your bank account</p>
                        <button disabled={loading} onClick={handleClick} className='btn btn-primary mb-3'>
                            {loading ? 'Processing' : 'Setup Payouts'}
                        </button>
                        <p className='text-muted'>
                            <small>
                                You'll be redirected to Stripe to complete the onboarding process.        
                            </small>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
  return (
    <div style={{
        minHeight: "100vh"
    }}>
    <div className='container-fluid bg-secondary p-5'>
        <ConnectNav />
    </div>
    <div className='container-fluid p-4'>
        <DashboardNav />
    </div>
    {auth && 
    auth.user && 
    auth.user.stripe_seller && 
    auth.user.stripe_seller.charges_enabled ?  
    connected() : 
    notConnected()}

    {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
</div>
  )
}

export default DashboardSeller