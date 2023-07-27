import joi from "joi";

export const signup= {
    body:joi.object({
        userName:joi.string().alphanum().required(),
        email:joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        cpassword:joi.string().valid(joi.ref("password")).required(),
        age:joi.number().integer().positive().min(18).max(60),
        phone:joi.string()
    }).required(),

    params:joi.object({
       flagName:joi.string()
    }).required()
}

export const login={
    body:joi.object({
        email:joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    }).required()
}