import React, { useContext } from 'react'
import axios from 'axios';
import GoogleLogin from 'react-google-login'
import { UserContext } from '../../context';
import { toast } from 'react-toastify';
import {useDispatch} from 'react-redux'

const Google = ({informParent = f => f}) => {
    const [state, setState] = useContext(UserContext)
    const dispatch = useDispatch()
    const responseGoogle = (response) => {
        console.log(response.tokenId);
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/google-login`,
            data: {idToken: response.tokenId}
        })
        .then(response => {
            console.log('GOOGLE SIGNIN SUCCESS', response)
            toast.success(`Hey ${response.data.user.name}, Welcome back!`,
                {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            setState(response.data)
            dispatch({
                type: 'LOGGED_IN_USER',
                payload: response.data
            })
            //inform parent component
            informParent(response);
        })
        .catch(error => {
            console.log('GOOGLE SIGNIN ERROR', error.response)
        })
      }

      console.log('STATE', state)
    return(
        <div className='pb-3'>
            <GoogleLogin
                clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                render={renderProps => (
                    <button onClick={renderProps.onClick} disabled={renderProps.disabled} className='btn btn-danger btn-lg btn-block'>
                        <i className='fab fa-google pr-2'></i> Login with Google
                    </button>
                  )}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

export default Google;