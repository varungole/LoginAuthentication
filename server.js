require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
// express app
const app = express()
const router = express.Router;

app.use(express.json())

//Connect to DB
mongoose.connect(process.env.MONGO_URI)
       .then( () => {
        console.log("Connected successfully!")
       })
       .catch((error) => {
        console.log(error)
       })

// listen for requests
app.listen(process.env.PORT, () => {
    console.log('Listening on port' , process.env.PORT)
})

let User = require('../LoginSystem/Schema');

//register new user
app.post('/users/register' , async (req , res) => {
    const {email , password , country} = req.body;

    try{
        const user = await User.create({email , password , email})
        res.status(200).json(user);
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
})s
