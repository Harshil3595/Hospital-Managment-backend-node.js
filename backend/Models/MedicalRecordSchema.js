const mongoose=require('mongoose');

const MedicalRecordSchema=new mongoose.Schema({
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
        type:String,
        require:true
    },
    diagnosis:{
        type:String,
        require:true
    },
    treatments:{
        type:String,
        require:true
    }
})

module.exports=mongoose.model('MedicalRecord',MedicalRecordSchema);