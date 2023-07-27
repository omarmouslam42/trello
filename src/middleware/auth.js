
import jwt  from 'jsonwebtoken';
import { asencHandler } from '../utils/ErrorHandling.js';
import userModel from '../../DB/model/User.model.js';
 
export const auth = asencHandler( async (req,res,next)=>{
    const {authorization}=req.headers;
    // .startWith(process.env.KEY_OF_TOKEN)
    if (!authorization) {
       return next(new Error("Authorization id required"),{cause:401})
    }
    const token = authorization.split(process.env.KEY_OF_TOKEN)[1]
    const decoded= jwt.verify(token,process.env.TOKEN_SIGNITURE)
    if (!decoded?.id) {
        return next(new Error("In-valid token payload"))
    }
    const user =await userModel.findById(decoded.id).select("userName email isloggedIn isDeleted")
    if (!user) {
        return next(new Error("Not Register user"))
    }
    if (!user.isloggedIn) {
        return next(new Error("must be log-In"))
    }
    if (user.isDeleted) {
        return next(new Error("the account is deleted must be log-In"))
    }
    req.user=user;
    return next();
})