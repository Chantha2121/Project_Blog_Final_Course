import { Router } from "express";
import { verify_token } from "../utils/verify_token.js";
import { editUserController, getUserController } from "../controller/userRoute.js";
import { upload } from "../utils/image_handle.js";
const userRoute = Router();

userRoute.get('/getUser',verify_token, getUserController );
userRoute.put("/editUser",upload.single("image_profile"), verify_token, editUserController);

export default userRoute;