import React from 'react'
import {Select} from 'antd'

const {Option} = Select;

function RoomEditForm(props) {
    const {values, setValues, handleChange, handleImageChange, handleSubmit} = props
    const {title, content, address, price, contract, noofrooms, noofbathroom, balcony, solarwater, drinkingwater, electricity, wastemng, wifi, parking, isBooked} = values
  return (
     <form onSubmit={handleSubmit}>
      <div className='form-group'>
            <label className='btn btn-outline-secondary btn-block m-2 text-sm-left'>
            Image
            <input 
                type="file" 
                name='image' 
                onChange={handleImageChange} 
                accept="image/*" 
                hidden/>
            </label>
        </div>

        <div className='form-group'>
        <label className='ms-2 mt-2 h6'>Title</label>
        <input 
          type="text" 
          name='title' 
          onChange={handleChange} 
          placeholder="Enter the Title" 
          className='form-control ms-2'
          value={title} 
        />
        </div>    

        <div className='form-group'>
        <label className='ms-2 mt-2 h6'>Content</label>
        <textarea
          name='content' 
          onChange={handleChange} 
          placeholder="Enter the Content" 
          className='form-control m-2'
          value={content} 
        />
        </div>

        <div className='form-group'>
        <label className='ms-2 mt-2 h6'>Address</label>
        <input 
          type="text" 
          name='address' 
          onChange={handleChange} 
          placeholder="Enter the Address" 
          className='form-control m-2'
          value={address} 
        /> 
        </div>

        <div className='form-group'>
        <label className='ms-2 mt-2 h6'>Price</label>
        <input 
          type="number" 
          name='price' 
          onChange={handleChange} 
          placeholder="Enter the Price per month" 
          className='form-control m-2'
          value={price} 
        />
        </div>
        
        <div className='form-group'>
        <label className='ms-2 mt-2 h6'>Contract</label>
          <Select onChange={(value) => setValues({...values, contract: value})} 
          className="w-100 m-2" 
          size='large' 
          placeholder="Enter the Contract"
          value={contract}>

          <Option key={"1 Years"}>1 Years</Option>
          <Option key={"2 Years"}>2 Years</Option>
          <Option key={"3 Years"}>3 Years</Option>
          <Option key={"4 Years"}>4 Years</Option>
          <Option key={"5 Years"}>5 Years</Option>
        </Select>
        </div>
        
        <div className='form-group'>
        <label className='ms-2 mt-2 h6'>Number of Rooms</label>
        <Select onChange={(value) => setValues({...values, noofrooms: value})} 
          className="w-100 m-2" 
          size='large' 
          placeholder="Enter the Number of rooms"
          value={noofrooms}>
          <Option key={1}>1</Option>
          <Option key={2}>2</Option>
          <Option key={3}>3</Option>
          <Option key={4}>4</Option>
          <Option key={5}>5</Option>
          <Option key={6}>6</Option>
          <Option key={7}>7</Option>
        </Select>
        </div>

        <div className='form-group'>
        <label className='ms-2 mt-2 h6'>Number of bath rooms</label>
        <Select onChange={(value) => setValues({...values, noofbathroom: value})} 
          className="w-100 m-2" 
          size='large' 
          placeholder="Enter the Number of bathroom"
          value={noofbathroom}>
          <Option key={1}>1</Option>
          <Option key={2}>2</Option>
          <Option key={3}>3</Option>
          <Option key={4}>4</Option>
          <Option key={5}>5</Option>
          <Option key={6}>6</Option>
          <Option key={7}>7</Option>
        </Select>
        </div>

        <div className='form-group'>
        <label className='ms-2 mt-2 h6'>Balcony</label>
        <Select onChange={(value) => setValues({...values, balcony: value})} 
          className="w-100 m-2" 
          size='large' 
          placeholder="Enter If  the balcony is avaliable or not"
          value={balcony}>
          <Option key={"Yes"}>Yes</Option>
          <Option key={"No"}>No</Option>
        </Select>
        </div>

        <div className='form-group'>
        <label className='ms-2 mt-2 h6'>Solar Water</label>
        <Select onChange={(value) => setValues({...values, solarwater: value})} 
          className="w-100 m-2" 
          size='large' 
          placeholder="Enter If  the solar water is avaliable or not"
          value={solarwater}>
          <Option key={"Yes"}>Yes</Option>
          <Option key={"No"}>No</Option>
        </Select>
        </div>

        <div className='form-group'>
        <label className='ms-2 mt-2 h6'>Drinking Water</label>
        <Select onChange={(value) => setValues({...values, drinkingwater: value})} 
          className="w-100 m-2" 
          size='large' 
          placeholder="Enter If  the drinking water is avaliable or not"
          value={drinkingwater}>
          <Option key={"Yes"}>Yes</Option>
          <Option key={"No"}>No</Option>
        </Select>
        </div>

        <div className='form-group'>
        <label className='ms-2 mt-2 h6'>Electricity</label>
        <Select onChange={(value) => setValues({...values, electricity: value})} 
          className="w-100 m-2" 
          size='large' 
          placeholder="Enter If  the electricity is avaliable or not"
          value={electricity}>
          <Option key={"Yes"}>Yes</Option>
          <Option key={"No"}>No</Option>
        </Select>
        </div>

        <div className='form-group'>
        <label className='ms-2 mt-2 h6'>Waste Management</label>
        <Select onChange={(value) => setValues({...values, wastemng: value})} 
          className="w-100 m-2" 
          size='large' 
          placeholder="Enter If  the waste management is avaliable or not"
          value={wastemng}>
          <Option key={"Yes"}>Yes</Option>
          <Option key={"No"}>No</Option>
        </Select>
        </div>
        
        <div className='form-group'>
        <label className='ms-2 mt-2 h6'>Wi-Fi</label>
        <Select onChange={(value) => setValues({...values, wifi: value})} 
          className="w-100 m-2" 
          size='large' 
          placeholder="Enter If  the wifi is avaliable or not"
          value={wifi}>
          <Option key={"Yes"}>Yes</Option>
          <Option key={"No"}>No</Option>
        </Select>
        </div>

        <div className='form-group'>
        <label className='ms-2 mt-2 h6'>Parking</label>
        <Select onChange={(value) => setValues({...values, parking: value})} 
          className="w-100 m-2" 
          size='large' 
          placeholder="Enter If  the wifi is avaliable or not"
          value={parking}>
          <Option key={"Yes"}>Yes</Option>
          <Option key={"No"}>No</Option>
        </Select>
        </div>

        <div className='form-group'>
        <label className='ms-2 mt-2 h6'>Booked</label>
        <Select onChange={(value) => setValues({...values, isBooked: value})} 
          className="w-100 m-2" 
          size='large' 
          placeholder="Enter If  the wifi is avaliable or not"
          value={isBooked}>
          <Option key={"Yes"}>Yes</Option>
          <Option key={"No"}>No</Option>
        </Select>
        </div>
      <button className='btn btn-outline-primary m-2'>Save</button>
    </form>
  )
}

export default RoomEditForm