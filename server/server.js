const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

//connect to MongoDB Database
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB Connection Error', err))



//app middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
// app.use(cors()); //allows all origins
if(process.env.NODE_ENV = 'development'){
    app.use(cors({origin: `http://localhost:3000`}))
}

//import routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const subRoutes = require('./routes/subs')
const stripeRoutes = require('./routes/stripe')
const roomRoutes = require('./routes/room')
const adminRoutes = require('./routes/admin')
const followunfollowRoutes = require('./routes/followunfollow')
const conversationRoutes = require('./routes/conversation')
const messageRoutes = require('./routes/message')
const userDetails = require('./routes/detaileinformation')
const feedback = require('./routes/feedback')


//middleware
app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', subRoutes)
app.use('/api', stripeRoutes)
app.use('/api', roomRoutes)
app.use('/api', adminRoutes)
app.use('/api', followunfollowRoutes)
app.use('/api', conversationRoutes)
app.use('/api', messageRoutes)
app.use('/api', userDetails)
app.use('/api', feedback)

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`API is running on port ${port}`)
})