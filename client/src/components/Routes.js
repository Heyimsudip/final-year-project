import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import App from '../App'
import AdminPage from './Admin/AdminPage'
import Subscriberlist from './Admin/SubscriberList/Subscriberlist'
import Activate from './Auth/Activate'
import AdminRoute from './Auth/AdminRoute'
import Forgot from './Auth/Forgot'
import PrivateRoute from './Auth/PrivateRoute'
import Reset from './Auth/Reset'
import Signin from './Auth/Signin'
import Signup from './Auth/Signup'
import SubscriberRoute from './Auth/SubscriberRoute'
import Chat from './Chat/Chat'
import FriendProfile from './Chat/FriendProfile'
import Dashboard from './Dashboard/Dashboard'
import DashboardSeller from './Dashboard/DashboardSeller'
import UserDashboard from './Dashboard/UserDashboard'
import DetailInformation from './DetailInformation/DetailInformation'
import Feedback from './Feedback/Feedback'
import FeedbackAdmin from './Feedback/FeedbackAdmin'
import Fotter from './Fotter/Fotter'
import Layout from './Layout/Layout'
import Map from './Map/Map'
import Account from './Pages/Account'
import Admin from './Pages/Admin'
import Home from './Pages/Home'
import Host from './Pages/Host'
import Private from './Pages/Private'
import StripeCancel from './Pages/stripe-cancel'
import StripeSuccess from './Pages/stripe-success'
import AddNewRoom from './Room/AddNewRoom'
import EditRoom from './Room/EditRoom'
import Lodingpage from './Room/LoadingPage'
import RoomOwnerProfile from './Room/RoomOwnerProfile'
import ViewRoom from './Room/ViewRoom'
import AuthRoute from './routes/AuthRoute'
import ScrollTop from './ScrollToTop/ScrollTop'
import SearchFilter from './SearchFilter/SearchFilter'
import SearchResult from './SearchFilter/SearchResult'
import StripeCallback from './stripe/StripeCallback'
import StripeCanceled from './stripe/StripeCancel'
import StripeSuccessfully from './stripe/StripeSuccess'
import UserProfile from './UserProfile/UserProfile'
import UserProfileEdit from './UserProfile/UserProfileEdit'

function Routes() {
  return (
    <Router>
        <ScrollTop/>
        <Layout />
        <ToastContainer position="bottom-right"
                      autoClose={2000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover/>
        <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/room" component={App} exact />
            <Route path="/signup" component={Signup} exact />
            <Route path="/signin" component={Signin} exact />
            <Route path="/auth/activate/:token" component={Activate} exact />
            <Route path="/searchfilter" component={SearchFilter} exact />
            <Route path="/search-result" component={SearchResult} exact />

            <PrivateRoute path="/private" component={Private} exact />
            <AdminRoute path="/admin" component={Admin} exact />
            <PrivateRoute path="/host" component={Host} exact />

            <Route path="/auth/password/forgot" component={Forgot} exact />
            <Route path="/auth/password/reset/:token" component={Reset} exact />

            <AuthRoute path="/stripe/success" component={StripeSuccess} exact/>
            <AuthRoute path="/stripe/cancel" component={StripeCancel} exact/>
            <SubscriberRoute path="/account" component={Account} exact/>
            <SubscriberRoute path="/basic" component={Dashboard} exact/>
            <SubscriberRoute path="/basic/seller" component={DashboardSeller} exact/>
            <SubscriberRoute path="/stripe/callback" component={StripeCallback} exact/>
            <SubscriberRoute path="/rooms/newRoom" component={AddNewRoom} exact/>
            <SubscriberRoute path="/room/edit/:roomId" component={EditRoom} exact/>
            <Route path="/room/:roomId" component={ViewRoom} exact/>
            <Route path="/map" component={Map} exact/>
            <AuthRoute path="/stripe/successfuly/:roomId" component={StripeSuccessfully} exact/>
            <AuthRoute path="/stripe/canceled" component={StripeCanceled} exact/>
            <AuthRoute path="/dashboard" component={UserDashboard} exact/>
            <AuthRoute path="/chat" component={Chat} exact/>
            <AuthRoute path="/profile/:ownerId" component={RoomOwnerProfile} exact/>
            <AuthRoute path="/userprofile/:userId" component={UserProfile} exact/>
            <AuthRoute path="/userprofile/edit/:userId" component={UserProfileEdit} exact/>
            <AuthRoute path="/loadingpage" component={Lodingpage} exact/>
            <AuthRoute path="/detailinformation" component={DetailInformation} exact/>
            <AuthRoute path="/feedback" component={Feedback} exact/>
            <AuthRoute path="/friendProfile/:userId" component={FriendProfile} exact/>
            <AdminRoute path="/admindashboard" component={AdminPage} exact/>
            <AdminRoute path="/subscriberlist" component={Subscriberlist} exact/>
            <AdminRoute path="/feedback-admin" component={FeedbackAdmin} exact/>
        </Switch>
        <Fotter />
    </Router>
  )
}

export default Routes