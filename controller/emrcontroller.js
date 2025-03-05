const bcrypt = require('bcrypt');
const credentialsModel = require('../model/credentialsModel')

const emrDetails = {
    "1" : "Raintree",
    "2" : "Modmed",
    "3" : "Athena Health",
    "4" : "Experity"
}

const subEmrDetails = {
    "1" : "Selkirk Neurology",
    "2" : "Homeward Health"
}

exports.getEmr= async(req,res)=>{
    try {
        const filterEmrDetails = Object.entries(emrDetails).map(([key,value])=>{
            return{id:key,name:value}
        })
        return res.status(201).json({message:"Emr Details Fetched Successfully",data:filterEmrDetails})
        
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"})
    }
}

exports.getSubEmr =async(req,res)=>{
    try {
        const filterdSubEmrDetails = Object.entries(subEmrDetails).map(([key,value])=>{
              return {id:key,name:value}
        })
        return res.status(201).json({message:"Sub Emr Details Fetched Successfully",data:filterdSubEmrDetails})
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"})
    }
}

exports.createCredentials = async(req,res)=>{
    try {
        const{emrname,subemrname,updated_date,username,password}=req.body
        if(!emrname || !updated_date || !username || !password){
            return res.status(200).json({message:"EmrName,UpdatedDate,UserName and Password field Should be Required"})
        }

        const hashedPassword = await bcrypt.hash(password,10)
        const emrCredentialsDetails = new credentialsModel({
            emrname,
            subemrname,
            updated_date,
            username,
            password:hashedPassword
        })
        await emrCredentialsDetails.save()
        return res.status(201).json({message:"EMR Credentials Updated Successfuly",data:emrCredentialsDetails})
        
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"})
    }
}

exports.getEmrCredentials = async(req,res)=>{
    try {
        const { emrname, subemrname } = req.query; 
        const query = { emrname };
        if (subemrname) {
            query.subemrname = subemrname; 
        }
        const credentialsData = await credentialsModel.find(query);

        if (credentialsData.length === 0) {
            return res.status(200).json({ message: "No matching EMR credentials found" });
        }

        return res.status(201).json({ 
            message: "EMR Credentials Fetched Successfully", 
            data: credentialsData 
        });

    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"})
    }
}