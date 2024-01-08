import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type:String,
        require: [true, 'please provide username'],
        unique: true
    },
    email: {
        type:String,
        require: [true, 'please provide email'],
        unique: true
    },
    phoneNumber: {
        type:String,
        require: [true, 'please provide phonenumber'],
        unique: true
    },
    password:{
        type: String,
        require: [true, 'please provide phonenumber'],
    }
},
{
    timestamps: true,
})

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User
