const express = require('express');
const cors = require('cors');
const PORT = 5050;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()

const allRoute = require('./routes/routes')

mongoose.connect(process.env.DATA_BASEURL)
.then(()=>console.log("Mongodb is connected"))
.catch(()=>console.log("Mongodb is not connected"))

const app = express()
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send("ChartRequest RPA Details")
})

app.use('/api',allRoute)

app.listen(PORT,()=>console.log("Server is running on:",PORT))