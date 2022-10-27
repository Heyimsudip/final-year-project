import React, { useContext, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { UserContext } from '../../context'
import {isAuth,isSub, signout} from '../Auth/helpers'
import {useDispatch, useSelector} from 'react-redux'
import {HomeOutlined, GlobalOutlined} from "@ant-design/icons"
import { ChatState } from '../../context/ChatProvider'
import {FaRegBell} from 'react-icons/fa'
import Notification from '../notification/notification'
import Badge from '@mui/material/Badge'

function Layout({children, match, history}) {
    const [state, setState] = useContext(UserContext);
    const {notification, setNotification} = ChatState();
    const dispatch = useDispatch();

    const nav = () => (
        <ul className='nav border d-flex justify-content-around align-items-center fixed-top bg-white' style={{
            height: "7vh"
        }}>
            <li className='nav-item '>
                <Link className="nav-link d-flex align-items-center justify-content-center" aria-current="page" to="/">Easy Home <HomeOutlined className='h7 ms-2' /></Link>
            </li>
            <li className='nav-item '>
                <Link className="nav-link d-flex align-items-center justify-content-center" aria-current="page" to="/map">Explore <GlobalOutlined className='h7 ms-2' /></Link>
            </li>
            {
                !isAuth() && (
                <>
                    <li className='nav-item'>
                        <Link className='nav-link' to="/signin">
                            Login
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link className='nav-link' to="/signup">
                            Register
                        </Link>
                    </li>
                </>
                ) 
            }

            {
                isSub() && isSub().user && isSub().user.role === 'admin' && (
                
                    <div className='nav-item dropdown'>
                    <li className='nav-link dropdown-toggle' data-bs-toggle="dropdown">
                        {isAuth().name} 
                    </li>
                    <ul className='dropdown-menu'>
                        <li className='nav-item dropdown-item'>
                            <Link className='nav-link' to="/admin">
                               {state.user.email}
                            </Link>
                        </li>
                        <li className='nav-item dropdown-item'>
                            <Link className='nav-link' to="/admindashboard">
                                User List
                            </Link>
                        </li>
                        <li className='nav-item dropdown-item'>
                            <Link className='nav-link' to="/subscriberlist">
                                Subscriber List
                            </Link>
                        </li>
                        <li className='nav-item dropdown-item'>
                            <Link className='nav-link' to="/feedback-admin">
                                Feedback List
                            </Link>
                        </li>
                        {
                            isAuth() && (
                            <li className='nav-item dropdown-item'>
                            <Link onClick={() => {
                                    signout(() => {
                                        dispatch({
                                            type: "LOGOUT",
                                            payload: null,
                                        })
                                        setState({
                                            user: {},
                                            token: ""
                                        })
                                        history.push('/')
                                    })
                                }} to="/signin" className='nav-link'>
                                Logout
                            </Link>
                        </li>
                            )
                        }
                    </ul>
                </div>
                ) 
            }

            {
                isSub() && isSub().user && isSub().user.role === 'subscriber' && (
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: 'center'
                    }}>
                    <div className='nav-item dropdown'>
                        <li className='nav-link dropdown-toggle' data-bs-toggle="dropdown">
                        {isAuth().name} 
                        </li>
                        <ul className='dropdown-menu'>
                            <li className='nav-item dropdown-item'>
                                <Link className='nav-link' to="/private">
                                {state.user.email}
                                </Link>
                            </li>
                            <li className='nav-item dropdown-item'>
                                <Link className='nav-link' to="/host">
                                    Host your room
                                </Link>
                            </li>
                            <li className='nav-item dropdown-item'>
                                <Link className='nav-link' to="/detailinformation">
                                    Detail Information
                                </Link>
                            </li>
                            <li className='nav-item dropdown-item'>
                                <Link className='nav-link' to="/chat">
                                    Chat
                                </Link>
                            </li>
                            <li className='nav-item dropdown-item'>
                                <Link className='nav-link' to="/basic">
                                    Dashboard
                                </Link>
                            </li>
                            <li className='nav-item dropdown-item'>
                                <Link className='nav-link' to="/account">
                                    Account
                                </Link>
                            </li>
                            <li className='nav-item dropdown-item'>
                            <Link className='nav-link' to="/feedback">
                                Feedback
                            </Link>
                        </li>
                            {
                                isAuth() && (
                                <li className='nav-item dropdown-item'>
                                <Link onClick={() => {
                                        signout(() => {
                                            dispatch({
                                                type: "LOGOUT",
                                                payload: null,
                                            })
                                            setState({
                                                user: {},
                                                token: ""
                                            })
                                            history.push('/')
                                        })
                                    }} to="/signin" className='nav-link'>
                                    Logout
                                </Link>
                            </li>
                                )
                            }
                        </ul>
                    </div>
                    <div className='nav-item dropdown'>
                    <li className='nav-link dropdown-toggle' data-bs-toggle="dropdown">
                        <Badge 
                            badgeContent={notification.length} 
                            color="primary">
                            <FaRegBell style={{
                                fontSize: "17px"
                            }}/>
                        </Badge>
                    </li>
                    <ul className='dropdown-menu'>
                        <li className='nav-item dropdown-item'>
                           {!notification.length && "No New Messages"}
                           {notification.map(notif => (
                               <li key={notif._id}>
                                   <Notification notification={notification} notif={notif} sender={notif.senderId} setNotification={setNotification} />
                               </li>
                           ))}
                        </li>
                    </ul>
                </div>
                </div>
                ) 
            }

            {
                isSub() && isSub().user && isSub().user.role === 'user' && (
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: 'center'
                    }}>
                    <div className='nav-item dropdown'>
                    <li className='nav-link dropdown-toggle' data-bs-toggle="dropdown">
                    {isAuth().name} 
                    </li>
                    <ul className='dropdown-menu'>
                        <li className='nav-item dropdown-item'>
                            <Link className='nav-link' to="/private">
                            {state.user.email}
                            </Link>
                        </li>
                        <li className='nav-item dropdown-item'>
                                <Link className='nav-link' to="/dashboard">
                                    Dashboard
                                </Link>
                            </li>
                            <li className='nav-item dropdown-item'>
                                <Link className='nav-link' to="/detailinformation">
                                    Detail Information
                                </Link>
                            </li>
                            <li className='nav-item dropdown-item'>
                                <Link className='nav-link' to="/chat">
                                    Chat
                                </Link>
                            </li>
                        <li className='nav-item dropdown-item'>
                            <Link className='nav-link' to="/host">
                                Host your room
                            </Link>
                        </li>
                        <li className='nav-item dropdown-item'>
                            <Link className='nav-link' to="/feedback">
                                Feedback
                            </Link>
                        </li>
                        {
                            isAuth() && (
                            <li className='nav-item dropdown-item'>
                            <Link onClick={() => {
                                    signout(() => {
                                        dispatch({
                                            type: "LOGOUT",
                                            payload: null,
                                        })
                                        setState({
                                            user: {},
                                            token: ""
                                        })
                                        history.push('/')
                                    })
                                }} to="/signin" className='nav-link'>
                                Logout
                            </Link>
                        </li>
                            )
                        }
                    </ul>
                </div>
                <div className='nav-item dropdown'>
                    <li className='nav-link dropdown-toggle' data-bs-toggle="dropdown">
                        <Badge 
                            badgeContent={notification.length} 
                            color="primary">
                            <FaRegBell style={{
                                fontSize: "17px"
                            }}/>
                        </Badge>
                    </li>
                    <ul className='dropdown-menu'>
                        <li className='nav-item dropdown-item'>
                           {!notification.length && "No New Messages"}
                           {notification.map(notif => (
                               <li key={notif._id}>
                                   <Notification notification={notification} notif={notif} sender={notif.senderId} setNotification={setNotification} />
                               </li>
                           ))}
                        </li>
                    </ul>
                </div>
                </div>
                ) 
            }
        </ul>
    )
  return (
    <>
        {nav()}
        <div className='container-fluid mb-4'>
            {children}
        </div>
    </>
  )
}

export default withRouter(Layout)