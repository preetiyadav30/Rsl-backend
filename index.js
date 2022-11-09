import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import userrouter from './routers/userRuter.js';
const app = express()
app.use(express.json());
app.use(userrouter)
const PORT = 6700;

app.use(cors({ origin: true }));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


app.use("/candidates_resume", express.static("public/images"));

mongoose.connect("mongodb://127.0.0.1:27017/RSL", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log("Database connected")
  }

});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`)
})
