const express=require('express');
const Prescription=require('../Models/PrescriptionSchema')
const catchAsyncErrors = require("../middleware/catchAsyncError");
const MedicalRecord=require('../Models/MedicalRecordSchema')

//create Perscription
exports.createPrescription=catchAsyncErrors(async(req,res) => {
    const prescription=await Prescription.create(req.body);
    res.status(201).json({success:true,prescription});
})

//update Prescription
exports.updatePrescription = catchAsyncErrors(async (req, res) => {
    const updatedPrescriptionData = req.body;
  
    const options = {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    };
  
    const prescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      updatedPrescriptionData,
      options
    );
  
    res.status(200).json({ success: true, prescription });
  });

//create MedicalRecord
exports.createMedicalRecord=catchAsyncErrors(async(req,res) => {
    const { patientId, date, diagnosis,treatments } = req.body;
    const medicalRecord=await MedicalRecord.create({
        patientId,
        date,
        diagnosis,
        treatments,
        doctorId:req.user.id
    });
    res.status(201).json({success:true,medicalRecord});
})

//update medicalRecord
exports.updateMedicalRecord=catchAsyncErrors(async(req,res) => {
    const newMedicalData={
        date:req.body.date,
        diagnosis:req.body.diagnosis,
        treatments:req.body.treatments,
    }

    const medicalRecord=await MedicalRecord.findByIdAndUpdate(req.params.id,newMedicalData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })

    res.status(200).json({success:true,medicalRecord})
})

  