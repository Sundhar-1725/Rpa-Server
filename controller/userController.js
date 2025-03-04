const userRegisterModel = require('../model/registerModel');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt')

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(200).json({ message: "All fields are required" });
        }

        const userEmail = await userRegisterModel.findOne({ email });
        if (userEmail) {
            return res.status(200).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const secretKeyNumber = Math.floor(100000 + Math.random() * 900000);

        const newUser = new userRegisterModel({
            username,
            email,
            password: hashedPassword,
            secret_key: secretKeyNumber
        });

        await newUser.save();

        const emailTemplatePath = path.join(__dirname, '../views/email.html');
        let emailTemplate = fs.readFileSync(emailTemplatePath, 'utf-8');
        emailTemplate = emailTemplate.replace('{secretkey}', secretKeyNumber);

        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Robotic Process Automation Secret Key",
            html: emailTemplate
        };

        await transporter.sendMail(mailOptions);

        return res.status(201).json({ message: "User registered successfully and secret key sent to email" });

    } catch (error) {
        if (error.name === "ValidationError") {
            const validationErrors = {};
            Object.keys(error.errors).forEach((key) => {
                validationErrors[key] = error.errors[key].message;
            });
            return res.status(200).json({ message: "Validation errors", errors: validationErrors });
        }

        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(200).json({ message: "Eamil and Password Should be Required" })
        }
        const user = await userRegisterModel.findOne({ email })
        if (!user) {
            return res.status(200).json({ message: "Email Not Exists" })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(200).json({ message: "Password Error Found" })
        }
        return res.status(201).json({ message: "Login Successfully" })
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}


exports.secretKey = async(req,res)=>{
    try {
        const{secret_key} = req.body
        if(!secret_key){
            return res.status(200).json({message:"Secret_key Should be Need"})
        }
        const isMatchSecret_key = await userRegisterModel.findOne({secret_key})
        if(!isMatchSecret_key){
            return res.status(200).json({message:"SecretKey Not Valid"})
        }
        return res.status(201).json({message:"Secretkey Verifycation Successfully"})
        
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"})
    }
}

exports.forgotPassword = async (req, res) => {
    try {

        const { email, password, confirm_password } = req.body

        if(!email || !password || !confirm_password){
            return res.status(200).json({message:"Email,Password and ConfirmPassword Field are Required"})
        }
        const user = await userRegisterModel.findOne({ email })
        if (!user) {
            return res.status(200).json({ message: "Email Not Exists" })
        }
     
        if (password !== confirm_password) {
            return res.status(200).json({ message: "Password And Confirm Password Should be Same" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword
      
        await user.save()
        return res.status(201).json({ message: "New Password Updated Successfully" })

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

exports.forgotSecretKey = async(req,res)=>{
    try {
        const{email,secret_key} = req.body
        if(!email || !secret_key){
            return res.status(200).json({message:"Email and Secret_key Should Be need"})
        }
        const user = await userRegisterModel.findOne({email})
        if(!user){
            return res.status(200).json({message:"Email Not Exists"})
        }
        user.secret_key = secret_key
        user.save()
        return res.status(201).json({message:"New Secret Key updated Successfully"})
        
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"})
    }
}