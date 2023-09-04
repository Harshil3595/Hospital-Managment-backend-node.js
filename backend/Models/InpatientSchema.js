const mongoose = require('mongoose');

const InpatientSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.ObjectId,
    ref: "Patient",
    required: true,
  },
  admissionDate: {
    type: Date,
    required: true,
  },
  dischargeDate: {
    type: Date,
  },
  bedNumber: {
    type: Number,
    required: true,
  },
  isOccupied: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    default: "In Progress",
    required: true,
  }
});

module.exports = mongoose.model('Inpatient', InpatientSchema);
