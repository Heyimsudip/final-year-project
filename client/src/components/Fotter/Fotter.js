import { HomeOutlined } from '@ant-design/icons'
import React from 'react'

function Fotter() {
  return (
    <div className="bg-secondary p-5 text-center">
        <div className='text-white'>	Copyright ©2020 All rights reserved by:
					<p href="#" style={{
                        textDecoration: "none"
                    }}>
                        <strong className="text-warning d-flex align-items-center justify-content-center h5">Easy Home <HomeOutlined className='ms-2' /></strong>
					</p></div>
    </div>
  )
}

export default Fotter