import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import {useSelector} from 'react-redux'
import { read, UpdateRoom } from '../action/room';
import RoomEditForm from './RoomEditForm';
import useGeoLocation from '../GeoLocation/useGeoLocation';


function EditRoom({match}) {
  const location = useGeoLocation();
  const {auth} = useSelector((state) => ({...state}))
  const {token} = auth
  const latitude = JSON.stringify(location.coordinates.latitude);
  const longitude = JSON.stringify(location.coordinates.longitude)
  const [values, setValues] = useState({
    title: '',
    content: '',
    address: '',
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

  const [image, setImage] = useState("");

  const [preview, setPreview] = useState('https://via.placeholder.com/100x100.png?text=PREVIEW')

  const { title,
    content,
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
    parking,
    isBooked,
  } = values

    useEffect(() => {
        loadSellerRoom()
    }, [])

    const loadSellerRoom = async () => {
      let res = await read(match.params.roomId)
      setValues({...values, ...res.data})
      setPreview(`${process.env.REACT_APP_API}/room/image/${res.data._id}`)
    };

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

      try {
        let res = await UpdateRoom(token, roomData, match.params.roomId)
        console.log('HOTEL UPDATE RES', res)
        toast.success(`${res.data.title} is updated`,
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
        toast.error(err.response.data.err,
        {
            position: "bottom-right",
            autoClose: 2000,
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
      setImage(e.target.files[0])
    }
  
    const handleChange = (e) => {
      setValues({...values, [e.target.name]: e.target.value});
    }

  return (
    <>
      <div className='container-fluid bg-secondary p-5 text-center'>
      <h2 className='text-white'>Edit Rooms</h2>
      </div>
      <div className='container-fluid'>
        <div className='row'>
        <div className='col-md-8'>
          <br />
          <RoomEditForm
          values={values}
          setValues={setValues}
          handleChange={handleChange}
          handleImageChange={handleImageChange}
          handleSubmit={handleSubmit}
          />
        </div>
        <div className='col-md-4'>
          <img src={preview} alt="preview_img" className='img img-fluid m-2' />
        </div>
        </div>
      </div>
    </>
  )
}

export default EditRoom