// in react we use import , in server  as a express we use require

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json()); 
// connected to the mongoDB 
async function main() {
  
    await mongoose.connect('mongodb://127.0.0.1:27017/todo', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
}   
// creating the schema using mongoose 

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const User = mongoose.model('User', userSchema);

const todosSchema = new mongoose.Schema({
  userId: String,
  todos: [
    {
      checked: Boolean,
      text: String,
    },
  ],
});
const Todos = mongoose.model('Todos', todosSchema);


app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).exec();
  if (user) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  await User.create({ username, password });
  return res.json({ message: 'Registration successful' });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).exec();
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid login' });
  }

  return res.json({ message: 'Login successful' });
});  




// create a post function for todolist
app.post('/todolist', async (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(' ');
  const [username, password] = token.split(':');
  const todosItems = req.body;

  const user = await User.findOne({ username }).exec();
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid login' });
  }

  const todos = await Todos.findOne({ userId: user._id }).exec();
  if (!todos) {
    await Todos.create({
      userId: user._id,
      todos: todosItems,
    });
  } else {
    todos.todos = todosItems;
    await todos.save();
  }

  return res.json(todosItems);
});

// app.get('/todolist', async (req, res) => {
//     const { authorization } = req.headers;
//     const [, token] = authorization.split(' ');
//     const [username, password] = token.split(':');    
  
//     const user = await User.findOne({ username }).exec();
//     if (!user || user.password !== password) {
//       return res.status(401).json({ message: 'Invalid login' });
//     }
  
//     const {todos} = await Todos.findOne({ userId: user._id }).exec();

//    res.json(todos);
//   });

main().catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
