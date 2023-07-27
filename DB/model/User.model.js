import { Schema, model } from "mongoose";

const userSchema= new Schema({
    firstName: String,
    lastName: String,
    phone: String,
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    gender: {
        type: String,
        default: "Male",
        enum: ['Male', 'Female']
    },
   age:Number,
   isloggedIn:{
    type:Boolean,
    default:true,
   },
   isDeleted:{
    type:Boolean,
    default:false
   },
   confirmEmail:{
    type:Boolean,
    default:false
   }
}, { timestamps: true }
)

const userModel=model("User",userSchema)
export default userModel