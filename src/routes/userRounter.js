import { Router } from "express";
import { verify_token } from "../utils/verify_token.js";
import { deleteUserController, editUserController, getUserController } from "../controller/userRoute.js";
import { upload } from "../utils/image_handle.js";
const userRoute = Router();

userRoute.get('/getUser',verify_token, getUserController );
userRoute.put("/editUser",upload.single("image_profile"), verify_token, editUserController);
userRoute.delete("/deleteUser", verify_token, deleteUserController)

export default userRoute;