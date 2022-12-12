const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const process = require('process');
//Database Connection
const connectDb = require('./connectDB');
//Schema and Model
const User = require('./model');
// to use environment variables
require('dotenv').config();

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
mongoose.set('strictQuery', true); 


//Connecting with database
connectDb();


//Routes
app.get("/", (req, res)=>{
    res.send("Ready to work.");
})

app.post("/login", (req, res)=> {
    const { email, password} = req.body
    User.findOne({ email: email}, (err, user) => {
        if(user){
            if(password === user.password ) {
                res.send({message: "Login Successful", user: user})
            } else {
                res.send({ message: "Password didn't match"})
            }
        } else {
            res.send({message: "User not registered"})
        }
    })
}) 

app.post("/signup", (req, res)=> {
    const { name, email, password} = req.body
    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registered"})
        } 
        else {
            const user = new User({
                name,
                email,
                password
            })
            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "Successfully Registered, Please login now." })
                }
            })
        }
    })   
})


// for deployment
const port = process.env.PORT || 4000;
app.listen(port, (err) => {
    if(err){
        console.log(err);
    }
    console.log(`Server started at port ${port}`);
})
