const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors')

const app = express();
require('dotenv').config()
const port = 8000;
const URI = process.env.MONGODB_URL;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const allowedOrigins = ['http://localhost:5173', 'https://testiflow.netlify.app', 'https://netlify.com', 'https://cloudinary.com', 'https://console.cloudinary.com', 'https://cloudinary.app']
app.use(cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  }));

app.get("/", (req, res) =>{
    res.json("Hey, this is Home")
})

app.listen(port, () =>{
    console.log("Listening on " + port);
})

app.use("/user", require('./routes/userRoute'))
app.use("/api", require('./routes/TestimonialRoute'))
app.use("/api", require('./routes/upload'));

// mongo connection
mongoose.connect(URI).then(() =>{
    console.log("Mongodb connected");
}).catch((err) =>{
    console.log(err);
})