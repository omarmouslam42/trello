
import taskModel from "../../../../DB/model/Task.model.js";
import { asencHandler } from "../../../utils/ErrorHandling.js"
import userModel from  "../../../../DB/model/User.model.js";


export const addTask = asencHandler( async (req,res,next)=>{
    const {title,description,status,assignTo,deadline}=req.body;
    const checkAssign= await userModel.findById(assignTo);
    if (!checkAssign) {
        return next(new Error("this user you want to assign this task not exist"))
    }
    const task= await taskModel.create({title,description,status,userId:req.user._id,assignTo,deadline})
    if (new Date(deadline) < new Date(task.createdAt) ) {
        return next(new Error("Enter valid data"))
    }
    return res.status(200).json({message:"Done",task})
})


export const updateTask= asencHandler( async(req,res,next)=>{
    const {title,description,status,assignTo}=req.body
    const {userId}=req.params;
    if (req.user._id!=userId) {
        return next(new Error(" a creator only can upadet task",{status:400}))
    }
    const checkAssign= await userModel.findById(assignTo);
    if (!checkAssign) {
        return next(new Error("this user you want to assign this task not exist",{status:404}))
    }
    const task= await taskModel.findOneAndUpdate({_id:userId},{title,description,status,assignTo})
    // console.log(task);
    
    return res.status(200).json({message:"Done",task})
})



export const delelteTask= asencHandler( async(req,res,next)=>{
    const{userId}=req.params
        if (req.user._id!=userId) {
            return next(new Error("a creator only can delete task",{status:400}))
        }
        const task= await taskModel.deleteOne({_id:userId})
         return res.status(200).json({message:"Done",task})
})


export const getAllTasksWithUsers= asencHandler( async(req,res,next)=>{
    const tasks= await taskModel.find().populate([
        {
            path:"userId",
            select: "userName email "
        },{
            path:"assignTo",
            select: "userName email "
        }
    ])
   return res.status(200).json({message:"Done",tasks})
})



export const TasksOfoneUserData = asencHandler( async(req,res,next)=>{
   const tasks= await taskModel.find({userId:req.user._id}).populate([
    {
        path:"userId",
        select: "userName email "
    },{
        path:"assignTo",
        select: "userName email "
    }
   ])
   return res.status(200).json({message:"Done",tasks})
})



export const tasksOfEmploy= asencHandler( async(req,res,next)=>{
    const tasks= await taskModel.find({assignTo:req.user._id}).populate([
        {
            path:"userId",
            select: "userName email "
        },{
            path:"assignTo",
            select: "userName email "
        }
       ])
   return res.status(200).json({message:"Done",tasks})
})


export const tasksLate = asencHandler( async(req,res,next)=>{
    let day= new Date()
    // console.log(day);
    const tasks= await taskModel.find({
        deadline: { $lt: day}
    })
    // console.log(tasks);
    return res.status(200).json({message:"Done",tasks})
})