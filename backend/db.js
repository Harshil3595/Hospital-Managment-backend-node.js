const mongoose=require('mongoose');

const URL="mongodb://localhost:27017/Hospital-Managment-System";
const connectToDatabse = () =>{
    mongoose.connect(URL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB', error);
    })
}
   
module.exports=connectToDatabse;