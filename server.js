//Statements are used to import in express js  we use require.. for react we use import 
const express =require("express");
const cors = require("cors")
const mongoose = require('mongoose');
// creating the code for express.js
const app = express();
const port =4000;


// to avoid cors policy between ports so we use cors 
app.use(cors()) 
app.use(express.json())
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/todo');
    }
  
//design the schema using mongoose 
const  userSchema = new mongoose.Schema({
    username: String, 
    password: String
  }); 
  const User = mongoose.model('User', userSchema);

app.post("/register" , async(req,res)=>{
const {username ,password }=req.body;
//console.log(req.body)
// const user = new User()
const user = await User.findOne({ username }).exec();
if(user){
    
    res.json({
        message:'username already exist  '
    })
    return; 
}
await User.create({username,password});
res.json({
    message:"success",
   
})
});
main().catch(err => console.log(err));



app.listen(port , ()=>{
    console.log(`Example app listening at http://localhost:${port}`) 
 })