
import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { allrooms } from '../action/room'
import "./map.css"

function Map({showViewMoreButton = true, history}) {
  const [rooms, setRooms] = useState([])
  useEffect(() => {
    loadAllRooms()
  }, [])

  const loadAllRooms = async () => {
    let res = await allrooms();
    setRooms(res.data)
    console.log('ROOM INFO', res.data)
  }
  return (
        <MapContainer center={[27.67893420119506, 85.3213090454877]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
          url="https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}@2x.png?key=8gYs4SfRQuGjfQ3lPcLU"
        />

        {rooms.map(r => (
          <Marker
            key={r._id}
            position={[r.latitude, r.longitude]}>
          <Popup>
            <div className='container'>
              <div className='col-md-20'>
                <div className='card'>
                {r.image && r.image.contentType ? (
                        <img 
                    src={`${process.env.REACT_APP_API}/room/image/${r._id}`} 
                    alt='default hotel'
                    className="card-img-top rounded" />
                    ) : (
                        <img 
                    src='https://via.placeholder.com/900x500.png?text=Hotel+Image' 
                    alt='default hotel'
                    className="card-img-top rounded" />
                    )}
                    <div className='card-body'>
                      <h8 className='card-title'>Entire Rental unit in {r.address}</h8>
                      <p className='card-text'>Price: ${r.price} /month</p>
                      {showViewMoreButton && (<button onClick={() => history.push(`/room/${r._id}`)} className='btn btn-primary btn-sm'>Show more</button>)}
                    </div>
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
        ))}
      </MapContainer>
  )
}

export default Map