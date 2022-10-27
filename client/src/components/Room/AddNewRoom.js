import React, { useState } from 'react'
import useGeoLocation from '../GeoLocation/useGeoLocation';
import { createRoom } from '../action/room';
import {useSelector} from 'react-redux'
import { toast } from 'react-toastify';
import AddNewRoomForm from './AddNewRoomForm';


function AddNewRoom() {
  const {auth} = useSelector((state) => ({...state}))
  const {token} = auth
  const location = useGeoLocation();
  const latitude = JSON.stringify(location.coordinates.latitude);
  const longitude = JSON.stringify(location.coordinates.longitude)
  const [values, setValues] = useState({
    title: '',
    content: '',
    address: '',
    image: '',
    price: '',
    contract: '',
    noofrooms: '',
    noofbathroom: '',
    balcony: '',
    solarwater: '',
    drinkingwater: '',
    electricity: '',
    wastemng: '',
    wifi: '',
    parking: '',
    isBooked: '',
  });

  const [preview, setPreview] = useState('https://via.placeholder.com/100x100.png?text=PREVIEW')

  const { title,
  content,
  address,
  image,
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
  parking,
  isBooked,
} = values

  const handleSubmit = async (e) => {
    e.preventDefault()
    let roomData = new FormData()
    roomData.append('title', title)
    roomData.append('content', content)
    roomData.append('address', address)
    roomData.append('price', price)
    image && roomData.append('image', image)
    roomData.append('contract', contract)
    roomData.append('noofrooms', noofrooms)
    roomData.append('noofbathroom', noofbathroom)
    roomData.append('balcony', balcony)
    roomData.append('solarwater', solarwater)
    roomData.append('drinkingwater', drinkingwater)
    roomData.append('electricity', electricity)
    roomData.append('wastemng', wastemng)
    roomData.append('wifi', wifi)
    roomData.append('parking', parking)
    roomData.append('isBooked', isBooked)
    roomData.append('latitude', latitude)
    roomData.append('longitude', longitude)

    console.log([...roomData])
    
    try {
      let res = await createRoom(token, roomData)
    console.log('HOTEL CREATE RESPONSE', res)
    toast.success('New Room is posted',
    {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })
    setTimeout(() => {
      window.location.reload();
    }, 2000)
    } catch (err) {
      console.log(err)
      toast.error('Error saving the room !! Please fill all the fields Again.',
    {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })
    }
    
  }
  const handleImageChange = (e) => {
    // console.log(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]))
    setValues({...values, image: e.target.files[0]})
  }

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  }

  return (
    <div>
    {/* {window.alert("Enable the Location on Browser")} */}
      <div className='container-fluid bg-secondary p-5 text-center'>
        <h2 className='text-white'>Add Room</h2>
      </div>
      <div className='container-fluid' style={{
         maxWidth: "1068px",
         margin: 'auto',
         marginBottom: "20px"
      }}>
       <div className='row'>
       <div className='col-md-8'>
          <br />
          <AddNewRoomForm
            values={values}
            setValues={setValues}
            handleChange={handleChange}
            handleImageChange={handleImageChange}
            handleSubmit={handleSubmit}
             />
        </div>
        <div className='col-md-4'>
          <img src={preview} alt="preview_img" className='img img-fluid m-2' />
          {/* <pre>{JSON.stringify(values, null, 4)}</pre> */}
        </div>
       </div>
      </div>
    </div>
  )
}

export default AddNewRoom