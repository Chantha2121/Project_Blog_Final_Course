import { Router } from "express";
import { upload } from "../utils/image_handle.js";
import { controllerLogin, controllerSignup } from "../controller/authenticationController.js";
const authenticationRoute = Router();

authenticationRoute.post('/signup',upload.single('image_profile'),controllerSignup);
authenticationRoute.post('/login',controllerLogin);

export default authenticationRoute;