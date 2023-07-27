import jwt  from "jsonwebtoken";
import userModel from "../../../../DB/model/User.model.js";
import { asencHandler } from './../../../utils/ErrorHandling.js';
import bcrypt from 'bcryptjs'
import CryptoJS from"crypto-js";
import sendEmail from "../../../utils/email.js";
import confirmEmailDesign from "../../../utils/confirmEmail.js";

export const signup= asencHandler( async(req,res,next)=>{
    const {userName,email,password,age,phone}=req.body;
    const checkUser= await userModel.findOne({email})
    if (checkUser) {
        return next(new Error("Email Exist"))
    }
    const ciphertext = CryptoJS.AES.encrypt(phone, 'secret key 123').toString();
    const hashPassword= bcrypt.hashSync(password,6)
    const user= await userModel.create({userName,email,password:hashPassword,age,phone:ciphertext})
    // console.log(req.protocol);
    // console.log(req.headers.host);
    const tokenEmail= jwt.sign({id:user._id, email:user.email},process.env.EMAIL_SIGNETURE,{expiresIn:60*5})
    const NewtokenEmail= jwt.sign({id:user._id, email:user.email},process.env.EMAIL_SIGNETURE)
    
    const link =`${req.protocol}://${req.headers.host}/auth/confirmEmail/${tokenEmail}`
    const newRequestLink =`${req.protocol}://${req.headers.host}/auth/NewconfirmEmail/${NewtokenEmail}`
    const unsubscribeLink =`${req.protocol}://${req.headers.host}/auth/Unsubscribe/${email}`
    await sendEmail ({to:email, subject:"confirmEmail",html: confirmEmailDesign(link,newRequestLink,unsubscribeLink) })
    
    return res.json({message:"Done",user})
})



export const confirmEmail = asencHandler(async(req,res,next)=>{
    const {token}=req.params;
    const decoded= jwt.verify(token , process.env.EMAIL_SIGNETURE)
    const user = await userModel.findByIdAndUpdate(decoded.id,{confirmEmail:true})
    return user? res.send("Login"): res.send(`<a href="#"> You Must Signup </a>`)
})


export const NewconfirmEmail = asencHandler(async(req,res,next)=>{
    const {token}=req.params;
    const decoded= jwt.verify(token , process.env.EMAIL_SIGNETURE)
    const user = await userModel.findById(decoded.id)
    if (!user) {
       return res.send(`<a href="#"> You Must Login </a>`)
    }
    if (user.confirmEmail) {
        return res.send(`<a href="#"> You are already login </a>`) 
    }
    const NewtokenEmail= jwt.sign({id:user._id, email:user.email},process.env.EMAIL_SIGNETURE,{expiresIn:60*2})
    
    const link =`${req.protocol}://${req.headers.host}/auth/confirmEmail/${NewtokenEmail}`

    await sendEmail ({to:user.email, subject:"confirmEmail",html: confirmEmailDesign(link) })
    
   return res.send("Check your inbox now.")
})


export const Unsubscribe= asencHandler( async(req,res,next)=>{
const {email}=req.params;
const user = await userModel.findOneAndUpdate({email},{isloggedIn:false})
return res.send("you are Unsubscribe")
} )


export const login = asencHandler( async(req,res,next)=>{
    const {email,password}=req.body
    const user= await userModel.findOneAndUpdate({email},{isloggedIn:true,isDeleted:false})
    if (!user) {
       return next(new Error("In-valid Email",{cause:404}))
    }
    const match= bcrypt.compareSync(password,user.password)
    if (!match) {
        return next(new Error("In-valid login data"))
    }
    const token= jwt.sign({name:user.userName,id:user._id,isLoggedIn:true},process.env.TOKEN_SIGNITURE,{expiresIn:60*60*24})
    return res.status(200).json({message:"Done",token})
})


