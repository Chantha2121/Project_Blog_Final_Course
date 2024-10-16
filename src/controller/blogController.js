import pool from "../db/databaseConnection.js";

export const getAllBlog = (req, res) => {
    const authenticationUser = req.user;
    let sql = "SELECT * FROM blog WHERE authorId = (SELECT id FROM user WHERE username = ?)"
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
            message: 'Get All data is successfully',
            data: row
        })
    })
}

// Create Blog 
export const createBlog = (req, res) => {
    const authenticatedUser = req.user;
    const content_image = req.file;
    const { title, content } = req.body;

    if (!authenticatedUser) {
        return res.status(404).json({
            message: "Authentication is invalid"
        });
    }

    try {
        if (!title && !content && !content_image) {
            return res.status(500).json({
                message: "Data is invalid"
            });
        }

        // Query to find the user
        let sql1 = "SELECT * FROM user WHERE username = ?";
        pool.query(sql1, [authenticatedUser], (error, rows) => {
            if (error) {
                return res.status(500).json({
                    message: error.message
                });
            }

            // Make sure user exists
            if (rows.length === 0) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            const userId = rows[0].id; // Correctly extract the user's id

            // Query to insert into blog table
            let sql2 = "INSERT INTO blog (title, content, image, authorId) VALUES (?, ?, ?, ?)";
            const sqlData = [title, content, content_image ? content_image.filename : null, userId];

            pool.query(sql2, sqlData, (error, result) => {
                if (error) {
                    return res.status(500).json({
                        message: error.message
                    });
                }

                res.status(200).json({
                    message: "Blog post created successfully",
                    data: result
                });
            });
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
