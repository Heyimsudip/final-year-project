import React from 'react'
import {Link} from 'react-router-dom'

function DashboardNav() {
    const active = window.location.pathname;
  return (
    <ul className='nav nav-tabs' style={{
      maxWidth: "1068px",
      margin: 'auto',
   }}>
        <li className='nav-item'>
            <Link className={`nav-link ${active === '/basic' && "active"}`} to="/basic">Your Bookings</Link>
        </li>
        <li className='nav-item'>
            <Link className={`nav-link ${active === '/basic/seller' && "active"}`} to="/basic/seller">Your Rooms</Link>
        </li>
    </ul>
  )
}

export default DashboardNav