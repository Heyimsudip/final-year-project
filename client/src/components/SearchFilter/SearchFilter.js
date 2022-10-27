import { SearchOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
const {Option} = Select

function SearchFilter() {
  const history = useHistory();
  const [contract, setContract] = useState('')
  const [noofrooms, setNoofrooms] = useState('')
  const [noofbathroom, setNoofBathroom] = useState('')
  const [balcony, setBalcony] = useState('')
  const [solarwater, setSolarWater] = useState('')
  const [drinkingwater, setDrinkingWater] = useState('')
  const [electricity, setElectricity] = useState('')
  const [wastemng, setWasteManagement] = useState('')
  const [wifi, setWifi] = useState('')
  const [parking, setParking] = useState('')
  const [values, setValues] = useState({
    address: '',
    price: ''
  })

  const {address, price} = values;

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  }

  const handleSubmit = () => {
    history.push(`/search-result?address=${address}&price=${price}&contract=${contract}&noofrooms=${noofrooms}&noofbathroom=${noofbathroom}&balcony=${balcony}&solarwater=${solarwater}&drinkingwater=${drinkingwater}&electricity=${electricity}&wastemng=${wastemng}&wifi=${wifi}&parking=${parking}`);
}

  return (
    <div style={{
      height: "100vh"
    }}>
      <div className="bg-secondary p-5 text-center" >
          <h1 className="text-white">Search Filter Page</h1>
      </div>
      <div style={{
         maxWidth: "1068px",
         margin: 'auto',
      }}>
        <div style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between"
        }}>
          <input type="text" name="address" onChange={handleChange} placeholder="Address" className='form-control' value={address} style={{height: "50px", width: "100%", marginRight: "15px"}} />
          <input type="text" name="price" onChange={handleChange} placeholder="Price" className='form-control' value={price} style={{height: "50px", width: "100%"}} />
        </div>
          <br />
        <div
        style={{
          display: "flex",
          justifyContent: "space-between"
        }}>
        <Select onChange={(value) => setContract(value)} 
          className="w-100 m-2" 
          size='large' 
          placeholder="Enter the Contract">
          <Option key={"1 Years"}>1 Years</Option>
          <Option key={"2 Years"}>2 Years</Option>
          <Option key={"3 Years"}>3 Years</Option>
          <Option key={"4 Years"}>4 Years</Option>
          <Option key={"5 Years"}>5 Years</Option>
        </Select>
        <Select onChange={(value) => setNoofrooms(value)} 
          className="w-100 m-2" 
          size='large' 
          placeholder="Enter the Number of rooms">
          <Option key={1}>1</Option>
          <Option key={2}>2</Option>
          <Option key={3}>3</Option>
          <Option key={4}>4</Option>
          <Option key={5}>5</Option>
          <Option key={6}>6</Option>
          <Option key={7}>7</Option>
        </Select>
        </div>
        <div style={{
          display: "flex",
          justifyContent: "space-between"
        }}>
          <Select onChange={(value) => setNoofBathroom(value)} 
          className="w-100 m-2" 
          size='large' 
          placeholder="Enter the Number of bathroom">
          <Option key={1}>1</Option>
          <Option key={2}>2</Option>
          <Option key={3}>3</Option>
          <Option key={4}>4</Option>
          <Option key={5}>5</Option>
          <Option key={6}>6</Option>
          <Option key={7}>7</Option>
        </Select>
        <Select onChange={(value) => setBalcony(value)} 
          className="w-100 m-2" 
          size='large' 
          placeholder="Do you want balcony">
          <Option key={"Yes"}>Yes</Option>
          <Option key={"No"}>No</Option>
        </Select>
        </div>
        <div style={{
          display: "flex",
          justifyContent: "space-between"
        }}>
        <Select onChange={(value) => setSolarWater(value)} 
          className="w-100 m-2" 
          size='large' 
          placeholder="Do you want solar water">
          <Option key={"Yes"}>Yes</Option>
          <Option key={"No"}>No</Option>
        </Select>
        <Select onChange={(value) => setDrinkingWater(value)} 
          className="w-100 m-2" 
          size='large' 
          placeholder="Do you want drinking water">
          <Option key={"Yes"}>Yes</Option>
          <Option key={"No"}>No</Option>
        </Select>
        </div>
        <div style={{
          display: "flex",
          justifyContent: "space-between"
        }}>
        <Select onChange={(value) => setElectricity(value)} 
          className="w-100 m-2" 
          size='large' 
          placeholder="Do you want electricity">
          <Option key={"Yes"}>Yes</Option>
          <Option key={"No"}>No</Option>
        </Select>
        <Select onChange={(value) => setWasteManagement(value)} 
          className="w-100 m-2" 
          size='large' 
          placeholder="Do you want waste management">
          <Option key={"Yes"}>Yes</Option>
          <Option key={"No"}>No</Option>
        </Select>
        </div>
        <div style={{
          display: "flex",
          justifyContent: "space-between"
        }}>
        <Select onChange={(value) => setWifi(value)} 
          className="w-100 m-2" 
          size='large' 
          placeholder="Do you want wifi">
          <Option key={"Yes"}>Yes</Option>
          <Option key={"No"}>No</Option>
        </Select>
        <Select onChange={(value) => setParking(value)} 
          className="w-100 m-2" 
          size='large' 
          placeholder="Do you want parking">
          <Option key={"Yes"}>Yes</Option>
          <Option key={"No"}>No</Option>
        </Select>
        </div>
        <br/>
        <div style={{
          display: "flex",
          justifyContent: "center"
        }}>
        <button onClick={handleSubmit} className='btn btn-primary w-25'>
        <SearchOutlined 
          className="btn btn-square p-3" />
        </button>
        </div>
      </div>
    </div>
  )
}

export default SearchFilter