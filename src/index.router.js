import userRouter from "./modules/user/user.router.js"
import authRouter from "./modules/auth/auth.router.js"
import taskRouter from "./modules/tasks/tasks.router.js"
import connectDB from "../DB/connection.js"
import { globalErrorHandling } from "./utils/ErrorHandling.js"



const bootstrap=(app,express)=>{
    app.use(express.json())
    app.use("/user",userRouter)
    app.use("/auth",authRouter)
    app.use("/task",taskRouter)
    
    app.use("*",(req,res,next)=>{
        return res.json({ message: "In-valid Routing" })
    })
    app.use(globalErrorHandling)
    connectDB()
}


export default bootstrap