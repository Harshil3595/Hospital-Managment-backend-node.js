const express=require('express');
const connectToDatabse=require('./db');
const dotenv=require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser=require('body-parser');

const app=express();

app.use(express.json());
app.use(cookieParser());
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}));


const port=5000;
//config 
dotenv.config({path:"backend/config/config.env"});

connectToDatabse();

app.use('/api/auth',require('./Route/appointmentRoutes'));
app.use('/api/auth',require('./Route/userRoutes'));
app.use('/api/auth',require('./Route/doctorRoutes'))


app.listen(port,()=>{
    console.log(`app listening on port ${port}`)
})