const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const process = require('process');



const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.set('strictQuery', true); 

mongoose.connect("mongodb+srv://Shubhendu:titan123@cluster0.hdhh4jd.mongodb.net/LoginData",
() => {
    console.log("DB connected")
})



//Schema and Model
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})
const User = new mongoose.model("UserData", userSchema)


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

// static files
// app.use(express.static(path.join(__dirname, './client/build')));
// app.get("*", (req,res)=>{
//     res.sendFile(path.join(__dirname, "./client/build/index.html"));
// })


// if(process.env.NODE_ENV == "production"){
//     app.use(express.static("client/build"));
// }

app.listen(port, (err) => {
    if(err){
        console.log(err);;
    }
    console.log(`Server started at port ${port}`);
})
