
import { Schema, Types, model } from "mongoose";

const taskSchema= new Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    status:{
        type:String,
        enum:["toDo","doing","done"],
        default:"toDo"
    },
    userId:{
        type:Types.ObjectId,
        ref:"User",
        require:true
    },
    assignTo:{
        type:Types.ObjectId,
        ref:"User",
    },
    deadline:{
        type:Date,
    }

},{ timestamps: true }
)

const taskModel= model("Task",taskSchema)

export default taskModel