import React, { useEffect, useState } from "react";
import { allrooms } from "./components/action/room";
import SmallCard from "./components/Cards/SmallCard";
import {BsFilterSquare} from 'react-icons/bs'


function App({history}) {
  const [searchKey, setSearchKey] = useState('')
  const [duplicaterooms, setDuplicaterooms] = useState([])
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    loadAllRooms()
  }, [])

  const loadAllRooms = async () => {
    let res = await allrooms();
    setRooms(res.data)
    setDuplicaterooms(res.data)
    console.log(res.data)
  }

  const search = () => {
    history.push('/searchfilter')
  }

  function filterBySearch(){
      const temprooms = duplicaterooms.filter(room => room.address.toLowerCase().includes(searchKey.toLowerCase()))
      setRooms(temprooms)
      console.log(temprooms)
  }

  return (
    <div style={{
      minHeight: "100vh"
  }}>
    <div className="bg-secondary p-5 text-center" >
          <h1 className="text-white"> Explore all the rooms</h1>
      </div>
      <br />
      <div className='container-fluid d-flex justify-content-center align-items-center'>
      <div className=' w-50' style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <input type="text"
            className="form-control"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            onKeyUp={filterBySearch}
            placeholder="Search Address" style={{ height: "50px", marginRight: "20px" }} />
        <div onClick={search}>
          <BsFilterSquare style={{
            fontSize: "40px",
            color: "#949494",
            cursor: "pointer",
          }} />
        </div>
            <br />
    </div>
      </div>
      <div className='container-fluid' style={{
         maxWidth: "1068px",
         margin: 'auto',
      }}>
        <div className='row'>
            {rooms.map((r) => <SmallCard key={r._id} r={r} />)}
        </div>
    </div></div>
    
  );
}

export default App;
