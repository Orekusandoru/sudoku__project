const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const Stats = require('./models/Stats');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();

const salt = bcrypt.genSaltSync(10);
const scrkey = "djfn44cecne4cb54wmxwm53qxwxw3243";

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(express.json());
app.use(cookieParser());



mongoose.connect('mongodb+srv://SaKe:5MEuUcaDDEVUfR4l@cluster0.wys8skj.mongodb.net/?retryWrites=true&w=majority');


app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  if(userDoc  ==null){
    res.status(400).json('wrong credentials');
  }else{
  const passOk = bcrypt.compareSync(password, userDoc.password);
  
  if (passOk) {
    // logged in
    jwt.sign({ username, id: userDoc._id }, scrkey, {}, (err, token) => {
      if (err) throw err;
      res.cookie('token', token).json({
        id: userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json('wrong credentials');
  }
}
});
app.get('/profile', (req, res) => {
  const { token } = req.cookies;
 
  if (token) {
    jwt.verify(token, scrkey, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    });
} else {
    res.status(401).json({ message: 'No token provided' });
}

});

app.post('/logout', (req, res) => {
  res.cookie('token', '').json('ok');
})

app.post('/createStats', async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, scrkey, {}, async (err, info) => {
    if (err) throw err;
    const author =info.id; 
    let statsDoc = await Stats.findOne({userId:author});
    

    if (Boolean(statsDoc)) {
      const count = statsDoc.rate;
      await statsDoc.updateOne({
      rate: count+1,
      user: info.username,
      userId: info.id,
      })
    } else {
        statsDoc = await Stats.create({
        rate: 0,
        user: info.username,
        userId: info.id,
      });
    }
    res.json(statsDoc);
  }
  )
});
app.get('/showStats', async (req, res) => {
  const { token } = req.cookies;
  if (token) {
  jwt.verify(token, scrkey, {}, async (err, info) => {
    if (err) throw err;
    const statsDoc = await Stats.find({})
    .sort({ rate: -1 })
    res.json(statsDoc);
    
    
  });
}else{
  res.status(401).json({ message: 'No token provided' });

}
});



app.listen(4000);

