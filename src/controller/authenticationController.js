import bcrypt from 'bcrypt';
import {config} from 'dotenv'
import pool from '../db/databaseConnection.js';
import { generate_token } from '../utils/generate_token.js';
config();
export const controllerSignup = async (req, res)=>{
    const profile_image = req.file;
    const {name, email, password, confirm } = req.body;
    if(!name && !email && !password && !confirm && confirm !== password){
        return res.status(404).json({
            message: 'Invalid username or password'
        })
    }
    try{
        const salt = await bcrypt.genSalt(parseInt(process.env.round_number));
        const hashpassword = await bcrypt.hash(password, salt);
        let sql = "INSERT INTO user (username, email, password, image) VALUES (?, ?, ?, ?)";
        pool.query(sql,[name, email, hashpassword, profile_image.filename], (err, row)=>{
            if(err){
                return res.status(500).json({
                    message: 'Database error'
                })
            }
            const token = generate_token({username: name})
            res.status(200).json({
                token : token,
                data: row
            })
        });
    }
    catch(err){
        return res.status(500).json({
            message: err.message
        });
    }
}

export const controllerLogin = (req, res) => {
    const { email, password} = req.body;
    if(!email && !password) {
        return res.status(404).json({
            message: 'Data is invalid',
        })
    }
}