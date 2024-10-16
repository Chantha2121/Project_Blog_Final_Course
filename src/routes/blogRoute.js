import { Router } from "express";
import { verify_token } from "../utils/verify_token.js";
import { createBlog, getAllBlog, getBlogById, updateBlog } from "../controller/blogController.js";
import { upload } from "../utils/image_handle.js";
const blogRoute = Router();

blogRoute.get('/getAllBlog', verify_token, getAllBlog);
blogRoute.post('/createBlog',upload.single("content_image"), verify_token, createBlog);
blogRoute.get('/getBlogById/:id', verify_token, getBlogById);
blogRoute.put('/updateBlog/:id',upload.single("content_image"), verify_token, updateBlog);

export default blogRoute;