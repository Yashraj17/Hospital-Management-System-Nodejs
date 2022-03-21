var appointmentModel = require('../Model/appointmentModel')
var patientModel = require('../Model/patientModel')
var dischargeModel = require('../Model/dischargeModel')
class DoctorController{
    static DoctorDashboard =async (req,res)=>{
        var appointment = await appointmentModel.find({status:1}).countDocuments()
        res.render('doctor/dashboard',{
            doctor:req.user,
            no_of_appointment:appointment
        })
    }

    //doctor - appointment function
    //doctor-appointment-dashboard
    static Doctor_Appointment_Dashboard =async (req,res)=>{
       
        res.render('doctor/doctor-appointment/appoint-dash',{
            doctor:req.user,
        })
    }

    //doctor-view-appointment
    static Doctor_view_Appointment =async (req,res)=>{
        const userId= req.user._id;
        const results = await appointmentModel.find({'doctorId':userId,'status':1}).populate('patientId')
        res.render('doctor/doctor-appointment/view-appoint',{
            doctor:req.user,
            data:results
        })
    }

    //doctor-delete-appointment
    static Doctor_delete_Appointment = async (req,res)=>{
        const userId= req.user._id;
        const results = await appointmentModel.find({'doctorId':userId,'status':1}).populate('patientId')
        res.render('doctor/doctor-appointment/delete-appoint',{
            doctor:req.user,
            data:results
        })
    }

    ////////   POST FUNCTION FOR DOCTOR 

    ///DOCTOR   delete appointment     //////////
    static Delete_appointment =async (req,res)=>{
        console.log('hey this is me');
        const d_id = req.params._id;
        await appointmentModel.remove({_id:d_id})
        res.redirect('/doctor/delete-appointment')
}








        //doctor - patient function
    //doctor-patient-dashboard
    static Doctor_Patient_Dashboard = (req,res)=>{
        res.render('doctor/doctor-patient/patient-dash',{doctor:req.user})
    }

    //doctor-discharge-patient
    static Doctor_discharge_Patient = async (req,res)=>{
        var dr_id = req.user._id;
        var results = await dischargeModel.find({doctorId:dr_id,status:1}).populate('patientId').populate('doctorId')
        res.render('doctor/doctor-patient/patient-dcharg',{
            doctor:req.user,
            data:results
        })
    }

    //doctor-view-patient
    static Doctor_view_Patient = async (req,res)=>{
        var results = await patientModel.find({doctorId:req.user._id,status:1})
        res.render('doctor/doctor-patient/patient-view',{
            doctor:req.user,
            data:results
        })
    }
}


module.exports = DoctorController