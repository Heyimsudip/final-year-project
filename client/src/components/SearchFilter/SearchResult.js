import React, { useEffect, useState } from 'react'
import SmallCard from '../Cards/SmallCard'
import queryString from 'query-string'
import { searchListings } from '../action/userdetails'

function SearchResult() {
    const [rooms, setRooms] = useState([])

    useEffect(() => {
        const {address, 
            price, 
            contract, 
            noofrooms, 
            noofbathroom, 
            balcony, 
            solarwater,
            drinkingwater,
            electricity,
            wastemng,
            wifi,
            parking
         } = queryString.parse(window.location.search);
        //  console.table({
        //     address, 
        //     price, 
        //     contract, 
        //     noofrooms, 
        //     noofbathroom, 
        //     balcony, 
        //     solarwater,
        //     drinkingwater,
        //     electricity,
        //     wastemng,
        //     wifi,
        //     parking
        //  })
        searchListings({
            address, 
            price, 
            contract, 
            noofrooms, 
            noofbathroom, 
            balcony, 
            solarwater,
            drinkingwater,
            electricity,
            wastemng,
            wifi,
            parking
        }).then((res) => {
            console.log('SEARCH RESULTS ===>', res.data)
            setRooms(res.data)
        })
    },[window.location.search])
  return (
    <div style={{
        minHeight: "100vh"
    }}>
      <div className="bg-secondary p-5 text-center" >
            <h1 className="text-white">List of Rooms</h1>
        </div>
        <br />
        <div className='container-fluid' style={{
           maxWidth: "1068px",
           margin: 'auto',
        }}>
          <div className='row'>
              {rooms.map((r) => <SmallCard key={r._id} r={r} />)}
          </div>
      </div></div>
  )
}

export default SearchResult