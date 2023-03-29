const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const dbConnect = require('./config/connectDB');
const path = require('path');
//config dotenv
dotenv.config();

//database call
dbConnect();
const app = express();

//Middlewares
app.use(express.json());
app.use(morgan('dev'))
app.use(cors())



const PORT = process.env.PORT || 5001;


//Routes
app.use('/api/v1/admin', require('./routes/adminRoute'))
//customer route
app.use('/api/v1/customers', require('./routes/customerRoutes'))
//booking route
app.use('/api/v1/booking', require('./routes/bookingRoutes'))

//static files


//Listening
app.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`)
});

