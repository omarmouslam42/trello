import { Router } from "express";
import { NewconfirmEmail, Unsubscribe, confirmEmail, login, signup } from "./controller/auth.controller.js";
import { validation } from "../../middleware/validation.js";
import * as validators from './auth.validation.js';

const router= Router()

router.post("/signup",validation(validators.signup),signup)
router.post("/login",validation(validators.login),login)
router.get("/confirmEmail/:token",confirmEmail)
router.get("/NewconfirmEmail/:token",NewconfirmEmail)
router.get("/Unsubscribe/:email",Unsubscribe)


export default router