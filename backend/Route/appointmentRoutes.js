const express = require('express');
const {isAuthenticatedUser}=require('../middleware/auth');
const { bookAppointment } = require('../controllers/AppointmentController');
const router = express.Router();

router.route('/appointment').post(isAuthenticatedUser,bookAppointment);

module.exports = router;