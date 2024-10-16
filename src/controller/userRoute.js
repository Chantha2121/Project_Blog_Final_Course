import pool from "../db/databaseConnection.js";


export const getUserController = (req, res) => {
    const authenticationUser = req.user;
    let sql = "SELECT * FROM user WHERE username = ?";
    if(!authenticationUser){
        return res.status(404).json({
            message: "Authentication is invalid"
        })
    }
    pool.query(sql, [authenticationUser], (error, row)=>{
        if(error){
            return res.status(500).json({
                message: error.message
            })
        }
        res.status(200).json({
            message: "Get data user is successfully",
            data : row
        })
    })
}

// Update user 
export const editUserController = (req, res) => {
    const authenticationUser = req.user;
    const profile_image = req.file;
    if(! authenticationUser && ! profile_image){
        return res.status(404).json({
            message: "Can't Update Profile"
        })
    }
    let sql = "UPDATE user SET image = ? WHERE username = ?";
    pool.query(sql, [profile_image.filename, authenticationUser],(error, row)=>{
        if(error){
            return res.status(500).json({
                message: error.message
            })
        }
        res.status(200).json({
            message: "Profile updated successfully",
            data: row
        })
    })
}