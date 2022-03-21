const express = require('express');
const HomeController = require('../Controller/homeController');
const upload = require('../Middleware/upload')
const router = express.Router();

//home controller and home routes 
router.get('/',HomeController.home)
//get  routes of doctor patient admin pages
router.get('/doctor-login',HomeController.doctorLoginViewPage)
router.get('/patient-login',HomeController.patientLoginViewPage)
router.get('/admin-login',HomeController.adminLoginViewPage)

//post route for admin - signup
router.post('/admin-appointment',upload.single('image'),HomeController.AdminSigup)
//post route for admin - login
router.post('/admin-login',HomeController.AdminLogin)
//post route for admin - logout
router.get('/admin-logout',HomeController.AdminLogout)


//post route for patient - signup
router.post('/patient-appointment',upload.single('image'),HomeController.PatientSigup)
//post route for patient - login
router.post('/patient-login',HomeController.PatientLogin)
//post route for patient - logout
router.get('/patient-logout',HomeController.PatientLogout)


//post route for doctor - signup
router.post('/doctor-appointment',upload.single('image'),HomeController.DoctorSigup)
//post route for doctor - login
router.post('/doctor-login',HomeController.DoctorLogin)
//post route for doctor - logout
router.get('/doctor-logout',HomeController.DoctorLogout)

//registration routes of doctor patient admin
router.get('/patient-appointment',HomeController.patientappointViewPage)
router.get('/doctor-appointment',HomeController.doctorappointViewPage)
router.get('/admin-appointment',HomeController.adminappointViewPage)


module.exports = router