const express = require('express');
const {isAuthenticatedUser,authorizedRoles}=require('../middleware/auth');
const { getAllPatients, deletePatient, createDoctor, getAllDoctors, deleteDoctor, getAllAppointments, deleteAppointment, getAppointmentsOfDoctor, getAppointmentsOfPatient, logout, register, login, getUserDetails, loginDoctor, updatePassword, updateProfile } = require('../controllers/userController');
const router = express.Router();


router.route('/admin/patients').get(isAuthenticatedUser,authorizedRoles("admin"),getAllPatients);
router.route('/admin/patient/:id').delete(isAuthenticatedUser,deletePatient);
router.route('/admin/doctor').post(isAuthenticatedUser,createDoctor);
router.route('/admin/doctors').get(isAuthenticatedUser,getAllDoctors);
router.route('/admin/doctor/:id').delete(isAuthenticatedUser,deleteDoctor);
router.route('/admin/appointments').get(isAuthenticatedUser,getAllAppointments);
router.route('/admin/appointments/:id').delete(isAuthenticatedUser,deleteAppointment);
router.route('/admin/doctor/appointmets/:id').get(isAuthenticatedUser,getAppointmentsOfDoctor);
router.route('/admin/patient/appointmets/:id').get(isAuthenticatedUser,getAppointmentsOfPatient);
router.route('/register').post(register);
router.route('/me').get(isAuthenticatedUser,getUserDetails);
router.route('/login').post(login)
router.route('/password/update').post(isAuthenticatedUser,updatePassword)
router.route('/doctorlogin').post(loginDoctor);
router.route('/logout').post(logout);
router.route("/me/update").put(isAuthenticatedUser,updateProfile);

module.exports = router;