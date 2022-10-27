import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'

function SmallCard({r, handleRoomDelete = (f) => f, 
    owner = false, 
    showViewMoreButton = true}) {
    const history = useHistory();
  return (
    <>
        <br />
        <hr />
        <div className='card mb-3' style={{
            border: "none"
        }}>
            <div className='row g-0'>
                <div className='col-md-4'>
                {r.image && r.image.contentType ? (
                        <img 
                    src={`${process.env.REACT_APP_API}/room/image/${r._id}`} 
                    alt='default hotel'
                    className="card-image img img-fluid rounded" />
                    ) : (
                        <img 
                    src='https://via.placeholder.com/900x500.png?text=Hotel+Image' 
                    alt='default hotel'
                    className="card-image img img-fluid rounded"  />
                    )}
                </div>
                <div className='col-md-8'>
                    <div className='card-body'>
                       <div className='d-flex align-items-center justify-content-between'>
                       <h3 className='card-title'>
                            {r.title}    
                        </h3>
                       </div>
                        <br/>
                        <p className='alert alert-secondary'>Entire Rental unit in {r.address}</p>
                        <br/>
                        <p className='card-text blockquote-footer'>{`${r.title}: ${r.content.substring(0, 200)}.....`}</p>
                        <p className='card-text'>
                            <span className='float-right text-muted'>
                                {r.noofrooms} rooms. {r.noofbathroom} bathrooms
                            </span>

                        </p>
                        
                        <div className='d-flex justify-content-between h4'>
                       {showViewMoreButton && (<><button onClick={() => history.push(`/room/${r._id}`)} className='btn btn-primary'>Show more</button>
                                                <span className='h5 text-secondary me-5'>
                                                    Price: ${r.price} /month
                                                 </span></>)}
                            {
                                owner && (
                                    <>
                                    <Link to={`/room/edit/${r._id}`}>
                                        <EditOutlined className='text-warning'/>
                                    </Link>
                                    <DeleteOutlined onClick={() => handleRoomDelete(r._id)} 
                                    className="text-danger" />
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default SmallCard