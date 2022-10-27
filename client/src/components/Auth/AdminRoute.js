import React, { Component } from "react";
import {Route, Redirect} from 'react-router-dom'
import {isAuth, isAuthentication} from './helpers'

const AdminRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={
        props => isAuthentication() && isAuthentication().user && isAuthentication().user.role === 'admin'  ? <Component {...props} /> : <Redirect to={{
            pathname: '/signin',
            state: {from: props.location}
        }} />
    }>

    </Route>
)

export default AdminRoute

