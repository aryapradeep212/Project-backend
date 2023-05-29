const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const mongoose = require('mongoose');
const userModel = require('./userModel');
const bookModel = require('./bookModel');

// App Initialization
const port = 9453;
const JWT_SECRET = "AryaPardeep212";
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb+srv://aryapradeep212:Arya@cluster0.zbd2evl.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });

app.post('/register', async (req, res) => {
  const { firstName, username, place, age, email, education, contactDetails, phone, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await userModel.findOne({ username });

    if (oldUser) {
      return res.send({ error: "User Exists" });
    }

    await userModel.create({
      firstName,
      username,
      place,
      age,
      email,
      education,
      contactDetails,
      phone,
      password: hashedPassword,
    });

    return res.send({ status: 'ok' });
  } catch (error) {
    console.log(error);
    res.send({ status: 'error' });
  }
});

app.get('/viewbook', async (req, res) => {
  try {
    const data = await bookModel.find();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.send({ status: 'error' });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userModel.findOne({ username });

    if (!user) {
      return res.send({ error: "User not found" });
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({}, JWT_SECRET);

      if (res.status(201)) {
        return res.json({ status: "ok", data: token });
      } else {
        return res.json({ error: "error" });
      }
    }

    res.json({ status: "error", error: "Invalid Password" });
  } catch (error) {
    console.log(error);
    res.send({ status: 'error' });
  }
});

app.post("/homepage",async(req,res)=>{
  const{token}=req.body
  try{
    const user=jwt.verify(token,JWT_SECRET)
    const Username=user.username
    userModel.findOne({username:Username})
    .then((data)=>{
      res.send({status:"ok",data:data})
    })
    .catch((error)=>{
      res.send({status:"error",data:error})
    })
  }catch(error){

  }
})

//admin routes
//const userRoutes=require('./routes/adminRoutes')
//app.use('/',adminRoutes)

// Port Checking
app.listen(port, () => {
  console.log('App listening on port 9453');
});
