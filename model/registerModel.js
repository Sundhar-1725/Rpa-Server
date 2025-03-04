const mongoose = require('mongoose');

const registerModel = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        match:[/^[a-zA-Z0-9]+$/,"UserName can only containe Letters and Numbers"]
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format."]
    },
    password:{
        type:String,
        required:true
    },
    secret_key:{
        type:Number,
        match:[/^[0-9]{6}&/,"Secret Key Must Be exactly 6 digits"]
    },
})
const result = new mongoose.model('user',registerModel)
module.exports=result