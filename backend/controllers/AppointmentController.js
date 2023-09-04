const express = require('express');
const Appointment = require('../Models/AppointmentSchema');
const catchAsyncErrors = require("../middleware/catchAsyncError");
const Inpatient = require('../Models/InpatientSchema');

exports.bookAppointment = catchAsyncErrors(async (req, res) => {
    try {
        const { doctorId, date, reason } = req.body;

        const appointment = await Appointment.create({
            doctorId,
            date,
            reason,
            patientId: req.user.id,
        });

        const totalBeds = 10;

        const occupiedBeds = await Inpatient.countDocuments({ isOccupied: true });

        if (occupiedBeds >= totalBeds) {
            throw new Error('No available beds');
        }

        let randomBedNumber;
        let isOccupied = true;

        while (isOccupied) {
            randomBedNumber = Math.floor(Math.random() * totalBeds) + 1;
            isOccupied = await Inpatient.exists({ bedNumber: randomBedNumber, isOccupied: true });
            console.log(randomBedNumber, isOccupied);
        }

        const inpatient = await Inpatient.create({
            patientId: req.user.id,
            admissionDate: new Date(),
            bedNumber: randomBedNumber,
            isOccupied: true,
        });

        res.status(201).json({ success: true, appointment, bedNumber: randomBedNumber });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});
