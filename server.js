require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
// express app
const app = express()

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
