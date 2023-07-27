import { Router } from "express";
import { changePassword, deleteUser, getUser, logOut, softDelete, updateUser } from "./controller/user.controller.js";
import { auth } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import * as validators from './user.validation.js';

const router= Router()
    router.get("/", auth,getUser)
    router.put("/changePassword",validation(validators.changePassword),auth,changePassword)
    router.put("/updateUser", auth,updateUser)
    router.delete("/deleteUser", auth,deleteUser)
    router.delete("/softDelete", auth,softDelete)
    router.post("/logOut", auth,logOut)

export default router