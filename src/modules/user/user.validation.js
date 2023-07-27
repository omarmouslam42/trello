
import joi from "joi";
export const changePassword={
    body:joi.object({
        oldPassword:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        NewPassword:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    }).required()
} 