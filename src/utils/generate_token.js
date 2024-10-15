import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();
export const generate_token = name =>{
    jwt.sign(
        name,
        process.env.secret_key,
        {
            expiresIn: process.env.secret_expired
        }
    )
}