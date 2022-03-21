const jwt = require('jsonwebtoken');
const adminModel = require('../Model/adminModel');
const patientModel = require('../Model/patientModel');
const doctorModel = require('../Model/doctorModel')


var adminAuth = async (req,res,next)=>{
    try {
        const token = req.cookies.jwt1
        if (token !=null) {
            const verifyUser = jwt.verify(token,process.env.JWT_SECRET_KEY);
            const data = await adminModel.findById(verifyUser.userId).select('-password')
            if (data!=null) {
                console.log(data);
                req.user = data
            next()
            } else {
                res.send('You are Unauthorized')
            }
            
        } else {
            res.redirect('/admin-login')
        }
     
    } catch (error) {
        console.log(error.message);
        
    }
    
}
var patientAuth = async (req,res,next)=>{
    try {
        const token = req.cookies.jwt2
        if (token !=null) {
            const verifyUser = jwt.verify(token,process.env.JWT_SECRET_KEY);
            const data = await patientModel.findById(verifyUser.userId).select('-password')
            if (data!=null) {
                console.log(data);
                req.user = data
            next()
            } else {
                res.send('You are Unauthorized')
            }
            
        } else {
            res.redirect('/patient-login')
        }
     
    } catch (error) {
        console.log(error.message);
        
    }
    
}
var doctorAuth = async (req,res,next)=>{
    try {
        const token = req.cookies.jwt3
        if (token !=null) {
            const verifyUser = jwt.verify(token,process.env.JWT_SECRET_KEY);
            const data = await doctorModel.findById(verifyUser.userId).select('-password')
            if (data!=null) {
                console.log(data);
                req.user = data
            next()
            } else {
                res.send('You are Unauthorized')
            }
            
        } else {
            res.redirect('/patient-login')
        }
     
    } catch (error) {
        console.log(error.message);
        
    }
    
}
module.exports = {
    adminAuth,
    patientAuth,
    doctorAuth
}
