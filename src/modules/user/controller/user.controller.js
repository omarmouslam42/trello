import userModel from "../../../../DB/model/User.model.js"
import { asencHandler } from "../../../utils/ErrorHandling.js"
import jwt  from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const getUser= asencHandler( async(req,res,next)=>{
    console.log(req.headers.Authorization);
    const decoded= jwt.verify(req.headers.authorization,"slamyaS7by")
    // console.log(decoded);
    // console.log(req.user);
    const user= await userModel.findById(req.user._id)
    return res.json({ message: "Done"  , user})
} )



export const changePassword= asencHandler( async (req,res,next)=>{
    const {NewPassword,oldPassword}=req.body
    // const {authorization}=req.headers
    console.log({NewPassword,oldPassword});
    // console.log(authorization);
    const user= await userModel.findById(req.user._id);
    // console.log(user);
    const match = bcrypt.compareSync(oldPassword, user.password)
    // console.log(match);
    if (!match) {
        return next(new Error("In-valid data.."))
    }
    const hashNewpassword=bcrypt.hashSync(NewPassword,6)
    const persone= await userModel.findOneAndUpdate(user._id,{password:hashNewpassword})
    return res.status(200).json({message:"Done",persone})
    
})

export const updateUser= asencHandler( async(req,res,next)=>{
    // const{firstName,lastName,age}=req.body;
    const user = await userModel.findByIdAndUpdate({_id:req.user._id},req.body,{new:true})
    return res.status(200).json({message:"Done",user})

})

export const deleteUser= asencHandler( async(req,res,next)=>{
    const user =await userModel.findByIdAndDelete({_id:req.user._id})
    res.status(200).json({message:"Done",user})
})


export const softDelete= asencHandler( async(req,res,next)=>{
    const user= await userModel.findByIdAndUpdate({_id:req.user._id},{isDeleted:true},{new:true});
    res.status(200).json({message:"Done",user})

})


export const logOut=asencHandler( async(req,res,next)=>{
    const user= await userModel.findByIdAndUpdate({_id:req.user._id},{isloggedIn:false},{new:true});
    res.status(200).json({message:"Done",user})
})