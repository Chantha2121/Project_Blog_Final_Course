import { Router } from "express";
import { verify_token } from "../utils/verify_token.js";
import { createBlog, getAllBlog, getBlogById } from "../controller/blogController.js";
import { upload } from "../utils/image_handle.js";
const blogRoute = Router();

blogRoute.get('/getAllBlog', verify_token, getAllBlog);
blogRoute.post('/createBlog',upload.single("content_image"), verify_token, createBlog);
blogRoute.get('/getBlogById/:id', verify_token, getBlogById);

export default blogRoute;