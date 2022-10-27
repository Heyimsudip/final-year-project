import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import OrderModal from '../modals/OrderModal';


function BookingCard({room, 
    session, 
    orderedBy}) {
    const [showModal, setShowModal] = useState(false);
    const history = useHistory();
  return (
    <>
        <div className='card mb-3' style={{
      maxWidth: "1068px",
      margin: 'auto',
   }}>
            <div className='row g-0'>
                <div className='col-md-4'>
                {room.image && room.image.contentType ? (
                        <img 
                    src={`${process.env.REACT_APP_API}/room/image/${room._id}`} 
                    alt='default hotel'
                    className="card-image img img-fluid rounded" />
                    ) : (
                        <img 
                    src='https://via.placeholder.com/900x500.png?text=Hotel+Image' 
                    alt='default hotel'
                    className="card-image img img-fluid rounded" />
                    )}
                </div>
                <div className='col-md-8'>
                    <div className='card-body'>
                       <div className='d-flex align-items-center justify-content-between'>
                       <h3 className='card-title'>
                            {room.title}    
                        </h3>
                       </div>
                        <br/>
                        <p className='alert alert-secondary'>Entire Rental unit in {room.address}</p>
                        <br/>
                        <p className='card-text blockquote-footer'>{`${room.title}: ${room.content.substring(0, 200)}.....`}</p>
                        <p className='card-text'>
                            <span className='float-right text-muted'>
                                {room.noofrooms} rooms. {room.noofbathroom} bathrooms
                            </span>

                        </p>
                        
                        {showModal && <OrderModal session={session} orderedBy={orderedBy} showModal={showModal} setShowModal={setShowModal} />}

                        <div className='d-flex justify-content-between h4'>
                        <button onClick={() => setShowModal(!showModal)} 
                        className='btn btn-primary'>Show Payment info</button>
                        {/* <button onClick={() => history.push(`/room/${room._id}`)} className='btn btn-primary'>Show more</button> */}              
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default BookingCard