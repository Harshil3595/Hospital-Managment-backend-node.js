const express = require('express');
const User=require('../Models/UserSchema');
const Doctor = require('../Models/DoctorSchema');
const Appointment=require('../Models/AppointmentSchema');
const sendToken=require('../utils/jwttoken')
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");

//get all the patients
exports.getAllPatients=catchAsyncErrors(async(req,res,next) => {
    const patients = await User.find({ role: 'patient' });
    res.status(201).json({ success: true, patients });
})

//delete a patient
exports.deletePatient=catchAsyncErrors(async(req,res) => {
    const patient = await User.findById(req.params.id);
    if (!patient) {
        return next(new ErrorHandler("Patient does not exist with this id", 404));
    }
    await patient.deleteOne();
    res.status(200).json({ success: true, message: "patient deleted succesfully" });
})

//create doctor
exports.createDoctor=catchAsyncErrors(async(req,res) => {
    const doctor=await Doctor.create(req.body);
    sendToken(doctor, 201, res);
})

//logindoctor
exports.loginDoctor=catchAsyncErrors(async(req,res) => {
    const{email,password}=req.body;
    //checking if doctor has given password and email both
    if(!email || !password){
        res.status(401).json({success:false,message:"Please enter valid email and password"})
    }

    const doctor=await Doctor.findOne({email}).select("+password");

    if(!doctor){
        res.status(401).json({success:false,message:"doctor doest not exit"})
    }

    const isPasswordMatched=await doctor.comparePassword(password);
    if(!isPasswordMatched){
       res.status(401).json({success:false,message:"Wrong passowrd"})
    }

    sendToken(doctor,200,res);
})

//get all doctors
exports.getAllDoctors=catchAsyncErrors(async(req,res,next) => {
    const doctors=await Doctor.find();
    res.status(201).json({success:true,doctors});
})

//delete doctor
exports.deleteDoctor=catchAsyncErrors(async(req,res) => {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
        return next(new ErrorHandler("Doctor does not exist with this id", 404));
    }
    await doctor.deleteOne();
    res.status(200).json({ success: true, message: "Doctor deleted succesfully" });
})

//get all apointmnts
exports.getAllAppointments=catchAsyncErrors(async(req,res) => {
    const appointments=await Appointment.find();
    res.status(201).json({success:true,appointments});
})

//delete appointment
exports.deleteAppointment=catchAsyncErrors(async(req,res) => {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
        return next(new ErrorHandler("Appointment does not exist with this id", 404));
    }
    await appointment.deleteOne();
    res.status(200).json({ success: true, message: "Appointment deleted succesfully" });
})

//get appointments of particular doctor
exports.getAppointmentsOfDoctor=catchAsyncErrors(async(req,res) =>{
    const doctorId=req.params.id;
    const appointments=await Appointment.find({doctorId});
    res.status(201).json({success:true,appointments});
})

//get appointments of particular patients
exports.getAppointmentsOfPatient=catchAsyncErrors(async(req,res) => {
    const patientId=req.params.id;
    const appointments=await Appointment.find({patientId});
    res.status(201).json({success:true,appointments});
})

//register patinet
exports.register=catchAsyncErrors(async(req,res) => {
    const user=await User.create(req.body);
    sendToken(user, 201, res);
})

//login patient
exports.login=catchAsyncErrors(async(req,res,next) =>{
    const{email,password}=req.body;
    //checking if patient has given password and email both
    if(!email || !password){
        res.status(401).json({success:false,message:"Please enter valid email and password"})
    }

    const user=await User.findOne({email}).select("+password");

    if(!user){
        res.status(401).json({success:false,message:"patient doest not exit"})
    }

    const isPasswordMatched=await user.comparePassword(password);
    if(!isPasswordMatched){
       res.status(401).json({success:false,message:"Wrong passowrd"})
    }

    sendToken(user,200,res);
})

//update Password
exports.updatePassword = catchAsyncErrors(async (req,res,next)=>{
    const user=await User.findById(req.user.id).select("+password");

    const isPasswordMatched=await user.comparePassword(req.body.oldPassword);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Old password us not a valid",400));
    }

    if(req.body.newPassword!==req.body.confirmPassword){
        return next(new ErrorHandler("Correct password validation failed",400));

    }

    user.password=req.body.newPassword;
    await user.save();
    sendToken(user,200,res);
})

//update profile
exports.updateProfile = catchAsyncErrors(async (req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email,
    }

    const user=await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })

    res.status(200).json({success:true})
})

//Get user Details
exports.getUserDetails = catchAsyncErrors(async (req,res,next)=>{

    if(!req.user.id){
        res.status(401).json({success:false,message:error.message})
    }
    const user=await User.findById(req.user.id);

    res.status(200).json({success:false,user})   
})

//Logout user
exports.logout=catchAsyncErrors(async(req,res) => {
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    })
res.status(200).json({success:true,message:"Logout successfully"});
})

