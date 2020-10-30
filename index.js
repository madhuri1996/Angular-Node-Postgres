const express = require('express');

const app = express();
const pool  = require('./db');

app.use(express.json());

//ROUTES//

// get all users

app.get('/allUsers', async(req,res) => {
    try {
        const allusers = await pool.query("SELECT * FROM login");
        res.json(allusers.rows);
    }catch(err) {
        console.log(err.message);
    }
})

// get a user

app.get('/getUser/:id', async(req,res) => {
    const { id } = req.params;
    try {
        const allusers = await pool.query("SELECT * FROM login WHERE user_name=$1",[id]);
        res.json(allusers.rows);
    }catch(err) {
        console.log(err.message);
    }
})

// create a user

app.post('/createUsers', async(req, res) => {
    try {
        console.log(req.body);
        const { name } = req.body;
        const newUser = await pool.query("INSERT INTO login (user_name) VALUES ($1) RETURNING *",
        [name]);
        
        res.json(newUser.rows);
    }
    catch(err){
        console.log(err.message);
    }
})

// update a user

app.put('/getUser/:id', async(req,res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const allusers = await pool.query("UPDATE login SET user_name=$1 WHERE user_id=$2",[name, id]);
        res.json("user details updated");
    }catch(err) {
        console.log(err.message);
    }
})

// delete a user

app.delete('/deleteUser/:id', async(req,res) => {
    const { id } = req.params;
    // const { name } = req.body;
    try {
        const allusers = await pool.query("DELETE FROM login WHERE user_id=$1",[id]);
        res.json("user details deleted");
    }catch(err) {
        console.log(err.message);
    }
})

app.listen(3000, () => {
    console.log("server is listening on port 3000");
    
});