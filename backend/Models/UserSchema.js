const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
        maxLength:[30,"Name cannot exceed 30 characters"],
        minLength:[4,"Name cannot less than 4 characters"]
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
        maxLength:[30,"Password cannot exceed 30 characters"],
        minLength:[4,"Password cannot less than 4 characters"]
    },
    role:{
        type:String,
        default:"patient"
    }
})

UserSchema.pre("save",async function(next){

    if(!this.isModified("password")){
        next();
    }
    
    this.password=await bcrypt.hash(this.password,10);

})

//JWT TOKEN
UserSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}

//compare password
UserSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

module.exports=mongoose.model('User',UserSchema);