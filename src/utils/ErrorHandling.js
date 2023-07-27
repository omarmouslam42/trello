
export const asencHandler= (fn)=>{
    return(req,res,next)=>{
        fn(req,res,next).catch(err=>{
            return next(new Error(err))
        })
    }
}

export const globalErrorHandling=(error,req,res,next)=>{
    return res.status(error.cause || 400).json({
        message:error.message,
        error,
        stack:error.stack
    })
}