const mongoose=require('mongoose');

const AppointmentSchema=new mongoose.Schema({
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
    date:{
        type:Number,
        require:true
    },
    reason:{
        type:String,
        require:true
    }
})

module.exports=mongoose.model('Appointment',AppointmentSchema);