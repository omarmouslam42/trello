const RequestMethods= ["body","params","query","headers","file"];
export const validation=(schema)=>{
// console.log(schema);
return  (req,res,next)=>{
    const validationErr=[];
    RequestMethods.forEach(key => {
        if (schema[key]) {
            const validationResult= schema[key].validate(req[key], {abortEarly : false})
            if (validationResult.error) {
                validationErr.push(validationResult.error.details)
            }
        }
    });
    if (validationErr.length) {
        return res.json({message:"validation Error",validationErr})
    }
    return next()
}
}