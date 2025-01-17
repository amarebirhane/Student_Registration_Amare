import mongoose from "mongoose";
// import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    title:
    {
        type: String,
        required: true
    },
    
  description: 
    {
        type: String,
        required: true
    },
    price:
    {
        type: Number, 
            required: true 
    },
});
    const Course = mongoose.models.Course || mongoose.model('Course', userSchema);
    export default Course;
