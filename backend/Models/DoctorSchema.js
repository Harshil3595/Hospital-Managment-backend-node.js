const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

const DoctorSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
        maxLength:[30,"Name cannot exceed 30 characters"],
        minLength:[4,"Name cannot less than 4 characters"]
    },
    specialization:{
        type:String,
        require:true,
    },
    contact:{
        type:Number,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})

DoctorSchema.pre("save",async function(next){

    if(!this.isModified("password")){
        next();
    }
    
    this.password=await bcrypt.hash(this.password,10);

})

//JWT TOKEN
DoctorSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}

//compare password
DoctorSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}


module.exports=mongoose.model('Doctor',DoctorSchema);