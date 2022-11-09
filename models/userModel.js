import mongoose from "mongoose";
//import validator from 'validator'
const UserSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    phone: { type: Number },
    candidates_resume: { type: String },
    message: { type: String }
});

const User = mongoose.model('users', UserSchema);

export default User;
