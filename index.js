import express from 'express';
import { config } from 'dotenv';
import pool from './src/db/databaseConnection.js';
import authenticationRoute from './src/routes/authenticationRoute.js';

config();

const app = express();
const port = process.env.port || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true}))
pool.getConnection((err, connection)=>{
    if(err){
        throw err;
    }
    console.log(`Database is connected`)
    connection.release();
})

app.use('/auth',authenticationRoute)

app.get('/', (req, res)=>{
    res.send(`Hello World!`);
})

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
});