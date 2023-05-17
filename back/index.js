const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

const salt = bcrypt.genSaltSync(10);
const scrkey = "djfn44cecne4cb54wmxwm53qxwxw3243";

app.use(cors({credentials:true,origin:'http://localhost:3000'}))
app.use(express.json());



mongoose.connect('mongodb+srv://SaKe:5MEuUcaDDEVUfR4l@cluster0.wys8skj.mongodb.net/?retryWrites=true&w=majority');


app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try{
     const userDoc = await User.create({
         username,
         password:bcrypt.hashSync(password,salt),
         });
     res.json(userDoc);
    }catch(e){
        res.status(400).json(e);
    }
});
app.post('/login', async (req,res) => {
    const {username,password} = req.body;
    const userDoc = await User.findOne({username});
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
        // logged in
        jwt.sign({username,id:userDoc._id}, scrkey, {}, (err,token) => {
          if (err) throw err;
          res.cookie('token', token).json('ok');
        });
      } else {
        res.status(400).json('wrong credentials');
      }
  });




app.listen(4000);

