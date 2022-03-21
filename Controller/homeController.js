const adminModel = require('../Model/adminModel')
const patientModel = require('../Model/patientModel');
const departmentModel = require('../Model/departmentModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const doctorModel = require('../Model/doctorModel');


class HomeController{
    static home = (req,res)=>{
        res.render('home/home')
    }
    //login views of doctor patient and admin
    static doctorLoginViewPage = (req,res)=>{
        res.render('home/doctorLogin')
    }
    static patientLoginViewPage = (req,res)=>{
        res.render('home/patientLogin')
    }
    static adminLoginViewPage = (req,res)=>{
        res.render('home/adminLogin')
    }
    //registration page of patient
    static patientappointViewPage = async (req,res)=>{
        var results = await doctorModel.find({}).populate('specialization')
        res.render('home/patient-appoint',{data:results})
    }
    //registration page of doctor
    static doctorappointViewPage = async (req,res)=>{
        var results = await departmentModel.find({})
        res.render('home/doctor-appoint',{data:results})
    }
    //registration page of admin
    static adminappointViewPage = (req,res)=>{
        res.render('home/admin-appoint')
    }
    
    //admin signup function 
    static AdminSigup = async (req,res)=>{
        const {username,email,address,contact,role,password} = req.body
        console.log(req.body.username);
        const user = await adminModel.findOne({email:email})
        if (user!=null) {
            res.send({'status':'faild','message':'Email already exits'})
        } else {
           
            if (username && email && password) {
                    try {
                        const hasspassword = await bcrypt.hash(password,10);
                        const data = new adminModel({
                            username :username,
                            email:email,
                            address:address,
                            contact:contact,
                            role:role,
                            image:req.file.filename,
                            password:hasspassword
                        })
                        await data.save();
                        const saved_user = await adminModel.findOne({email:email});
                        //generate jwt token
                        const token = jwt.sign({userId:saved_user._id},process.env.JWT_SECRET_KEY,{expiresIn:'5d'});
                        console.log(token);
                        res.cookie('jwt1',token)
                        res.redirect('/admin-appointment')
                    } catch (error) {
                        res.send(error.message)
                    }
            } else {
                res.send({'status':'faild','message':'All field requird'})
            }
        }
    }

    //admin login function 
    static AdminLogin = async (req,res)=>{
        try {
            const {email,password} = req.body;
            if (email && password) {
                const user = await adminModel.findOne({email:email})
                if (user!=null) {
                    const isMatch = await bcrypt.compare(password,user.password);
                    if ((user.email == email ) && isMatch) {
                        //generate jwt token
                        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'5d'});
                        console.log(token);
                        res.cookie('jwt1',token)
                        res.redirect('/admin')
                       
                    } else {
                        res.send({'status':'faild','message':'Email or Password does not match'})
                    }
                } else {
                    res.send({'status':'faild','message':'You are not Registered User'})
                }
            } else {
                res.send({'status':'faild','message':'All field requird'})
            }
        } catch (error) {
            
        }
    }
    //admin logout function
    static AdminLogout = (req,res)=>{
        res.clearCookie('jwt1')
        console.log('you are logged out');
        res.redirect('/')
    }

   //patient signup function
     static PatientSigup = async (req,res)=>{
        const {patientname,email,address,contact,doctor,symptom,password} = req.body
        const user = await patientModel.findOne({email:email})
        if (user!=null) {
            res.send({'status':'faild','message':'Email already exits'})
        } else {
            if (patientname && email && password) {
                    try {
                        // var datetime = new Date();
                        // var dateNow = datetime.toISOString().slice(0,10)
                        const hasspassword = await bcrypt.hash(password,10);
                        console.log(req.file.filename);
                        const data = new patientModel({
                            patientname:patientname,
                            email:email,
                            address:address,
                            contact:contact,
                            doctorId:doctor,
                            image:req.file.filename,
                            symptom:symptom,
                            password:hasspassword
                        })
                        await data.save();
                        const saved_user = await patientModel.findOne({email:email});
                        //generate jwt token
                        const token = jwt.sign({userId:saved_user._id},process.env.JWT_SECRET_KEY,{expiresIn:'5d'});
                        console.log(token);
                        res.cookie('jwt',token)
                        res.redirect('/patient-appointment')
                    } catch (error) {
                        res.send(error.message)
                    }
            } else {
                res.send({'status':'faild','message':'All field requird'})
            }
        }
    }
       //patient login function 
       static PatientLogin = async (req,res)=>{
        try {
            const {email,password} = req.body;
            if (email && password) {
                const user = await patientModel.findOne({email:email})
                if (user!=null && user.status == 1) {
                    const isMatch = await bcrypt.compare(password,user.password);
                    if ((user.email == email ) && isMatch) {
                        //generate jwt token
                        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'5d'});
                        console.log(token);
                        res.cookie('jwt2',token)
                        res.redirect('/patient')
                       
                    } else {
                        res.send({'status':'faild','message':'Email or Password does not match'})
                    }
                } else {
                    res.send({'status':'faild','message':'You are not Registered User'})
                }
            } else {
                res.send({'status':'faild','message':'All field requird'})
            }
        } catch (error) {
            
        }
    }
    //patient logout function
    static PatientLogout = (req,res)=>{
        res.clearCookie('jwt2')
        console.log('you are logged out');
        res.redirect('/')
    }


   //doctor signup function
     static DoctorSigup = async (req,res)=>{
        const {doctorname,email,address,contact,specialization,password} = req.body
        const user = await doctorModel.findOne({email:email})
        if (user!=null) {
            res.send({'status':'faild','message':'Email already exits'})
        } else {
            if (doctorname && email && password) {
                    try {
                        const hasspassword = await bcrypt.hash(password,10);
                        const data = new doctorModel({
                            doctorname :doctorname,
                            email:email,
                            address:address,
                            contact:contact,
                            specialization:specialization,
                            image:req.file.filename,
                            password:hasspassword
                        })
                        await data.save();
                        const saved_user = await doctorModel.findOne({email:email});
                        //generate jwt token
                        const token = jwt.sign({userId:saved_user._id},process.env.JWT_SECRET_KEY,{expiresIn:'5d'});
                        console.log(token);
                        res.cookie('jwt',token)
                        res.redirect('/doctor-appointment')
                    } catch (error) {
                        res.send(error.message)
                    }
            } else {
                res.send({'status':'faild','message':'All field requird'})
            }
        }
    }
    
       //doctor login function 
       static DoctorLogin = async (req,res)=>{
        try {
            const {email,password} = req.body;
            if (email && password) {
                const user = await doctorModel.findOne({email:email})
                if (user!=null && user.status == 1) {
                    const isMatch = await bcrypt.compare(password,user.password);
                    if ((user.email == email ) && isMatch) {
                        //generate jwt token
                        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'5d'});
                        console.log(token);
                        res.cookie('jwt3',token)
                        res.redirect('/doctor')
                       
                    } else {
                        res.send({'status':'faild','message':'Email or Password does not match'})
                    }
                } else {
                    res.send({'status':'faild','message':'You are not Registered User'})
                }
            } else {
                res.send({'status':'faild','message':'All field requird'})
            }
        } catch (error) {
            
        }
    }
    //doctor logout function
    static DoctorLogout = (req,res)=>{
        res.clearCookie('jwt3')
        console.log('you are logged out');
        res.redirect('/')
    }


}
module.exports = HomeController