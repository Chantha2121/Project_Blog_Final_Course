import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

export const verify_token = (req, res, next) => {
    const authorized = req.headers.authorization;
    if(!authorized){
        return res.status(404).json({
            message: 'Invalid token'
        })
    }
    const token = authorized.split(" ")[1]
    jwt.verify(token,process.env.secret_key,(error, result)=>{
        if(error){
            return res.status(500).json({
                message: error.message
            })
        }
        req.user = result.username;
        next();
    })
}