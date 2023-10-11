//Statements are used to import in express js  we use require.. for react we use import 
const express =require("express");
const cors = require("cors")
const mongoose = require('mongoose');
// creating the code for express.js
const app = express();
const port =4000;


// to avoid cors policy between ports we use cors 
app.use(cors()) 
app.use(express.json())
//design the schema using mongoose 
const  userSchema = new mongoose.Schema({
    username: String, 
    password: String
  }); 
  const User = mongoose.model('User', userSchema);

app.post("/register" , async(req,res)=>{
const {username ,password }=req.body;
// const user = new User()
await User.create({username,password});
res.json({
    message:"success",
   
})
});
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/todo');
  }


app.listen(port , ()=>{
    console.log(`Example app listening at http://localhost:${port}`) 
 })