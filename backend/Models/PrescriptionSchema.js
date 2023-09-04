const mongoose=require('mongoose');

const PrescriptionSchema=new mongoose.Schema({
    appointmentId:{
        type:mongoose.Schema.ObjectId,
        ref:"Appointment",
    },
    patientId:{
        type:mongoose.Schema.ObjectId,
        ref:"Patient",
        required: true,
    },
    doctorId:{
        type:mongoose.Schema.ObjectId,
        ref:"Doctor",
        require:true,
    },
    medication:[{
        name:{
            type:String,
            require:true
        },
        dosage:{
            type:String,
            require:true
        },
        frequency:{
            type:String,
            require:true
        }
    }]
})

module.exports=mongoose.model('Prescription',PrescriptionSchema);