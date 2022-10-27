import React from 'react'
import {WarningTwoTone} from "@ant-design/icons"

function StripeCancel() {
  return (
    <div className='d-flex justify-content-center font-weight-bold' style={{
      minHeight: "100vh"
  }}>
        <div className='d-flex align-items-center'>
            <WarningTwoTone style={{fontSize: "50px"}} />
        </div>
    </div>
  )
}

export default StripeCancel