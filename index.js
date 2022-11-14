import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import fs from 'fs'
import https from 'https'
import userrouter from './routers/userRuter.js';
const app = express()
app.use(express.json());
app.use(userrouter)
const PORT = 3000;

var options = {
    key: fs.readFileSync('../ssl/privatekey.key'),
    cert: fs.readFileSync('../ssl/certificate.pem')
};

app.use(cors({ origin: true }));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


app.use("/candidates_resume", express.static("public/images"));
//mongodb+srv://YogeshGurjar:<password>@cluster0.zgip5ve.mongodb.net/<DATABASE>?retryWrites=true&w=majority
mongoose.connect("mongodb+srv://preeti:Indore1234@cluster0.qzngd29.mongodb.net/RSL?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log("Database connected")
  }

});

// simple route
app.get("/", (req, res) => {
  res.send(
    `<h1 style='text-align: center'>
          Wellcome to RSL Backend 
          <br><br>
          <b style="font-size: 182px;">😃👻</b>
      </h1>`
  );
});

https.createServer(options, app).listen(3000,() => console.log("App running in port 3000 !"));

// app.listen(PORT, () => {
//   console.log(`Server is running at ${PORT}`)
// })
