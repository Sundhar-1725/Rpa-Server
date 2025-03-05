const mongoose = require('mongoose');

const credentialsModel = new mongoose.Schema({
    emrname:{
        type:String,
    },
    subemrname:{
        type:String,
    },
    updated_date:{
        type:String,
    },
    username:{
        type:String,
    },
    password:{
        type:String,
    }
    
})
const result = new mongoose.model('emrcredential',credentialsModel)
module.exports = result