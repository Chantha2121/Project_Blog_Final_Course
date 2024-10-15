import { Router } from "express";
import { verify_token } from "../utils/verify_token";
import { getUserController } from "../controller/userRoute.js";
const userRoute = Router();

userRoute.get('/getUser',verify_token, getUserController )

export default userRoute;