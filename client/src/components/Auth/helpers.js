import cookie from 'js-cookie'

//set in cookie
export const setCookie = (key, value) => {
    if(window !== 'undefined') {
        cookie.set(key, value, {
            expires: 1
        })
    }
}

//remove from cookie
export const removeCookie = (key) => {
    if(window !== 'undefined') {
        cookie.remove(key, {
            expires: 1
        })
    }
}

//get from cookie such ad stored token

//will be useful when we need to make request to server with token
export const getCookie = (key) => {
    if(window !== 'undefined') {
       return cookie.get(key)
    }
}

//set in localstorage
export const setLocalStorage = (key, value) => {
    if(window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value))
    }
}

//remove from localstorage
export const removeLocalStorage = (key, value) => {
    if(window !== 'undefined') {
        localStorage.removeItem(key, JSON.stringify(value))
    }
}

//authenticate user by passing data to cookie and localstorage during signin

export const authenticate = (response, next) => {
    console.log('AUTHENTICATE HELPER ON SIGNIN RESPONSE', response)
    setCookie('token', response.data.token)
    setLocalStorage('user', response.data.user)
    setLocalStorage('auth', response.data)
    next();
}

//access user info from localstorage

export const isAuth = () => {
    if(window !== 'undefined') {
        const cookieChecked = getCookie('token')
        if(cookieChecked){
            if(localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'))
            }else{
                return false;
            }
        }
    }
}

export const isSub = () => {
    if(window !== 'undefined') {
        if(localStorage.getItem('auth')) {
            return JSON.parse(localStorage.getItem('auth'))
        }else{
            return false;
        }
    }
}

export const isAuthentication = () => {
    if(window !== 'undefined') {
        const cookieChecked = getCookie('token')
        if(cookieChecked){
            if(localStorage.getItem('auth')) {
                return JSON.parse(localStorage.getItem('auth'))
            }else{
                return false;
            }
        }
    }
}

export const signout = next => {
    removeCookie('token')
    removeLocalStorage('user')
    removeLocalStorage('auth')
    next();
}

//Update user instant in local storage
export const updatedUser = (response, next) => {
    console.log('UPDATE USER IN LOCAL STORAGE HELPERS', response)
    if(typeof window !== 'undefined'){
        let auth = JSON.parse(localStorage.getItem('user'))
        auth = response.data
        localStorage.setItem('user', JSON.stringify(auth))
    }
    next();
}
