import mongoose from "mongoose";
// import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
  filePath: { type: String },
});




const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;