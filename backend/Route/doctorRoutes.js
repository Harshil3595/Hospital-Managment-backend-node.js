const express=require('express');
const { createPrescription, updatePrescription, createMedicalRecord, updateMedicalRecord } = require('../controllers/DoctorController');
const {isAuthenticatedUser,authorizedRoles}=require('../middleware/auth');

const router=express.Router();

router.route('/prescription').post(createPrescription);
router.route('/prescription/:id').put(updatePrescription);
router.route('/medicalrecord').post(isAuthenticatedUser,createMedicalRecord);
router.route('/medicalrecord/:id').put(isAuthenticatedUser,updateMedicalRecord)

module.exports=router;