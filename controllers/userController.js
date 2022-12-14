import User from "../models/userModel.js";
import nodemailer from 'nodemailer';
import { Result } from "express-validator";

export async function insert(request, response) {
 
  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    requireTLS: true,
    secure: false,
    auth: {
      user: 'hr@rslsofttech.com',
      pass: 'upennynhqtgpdybp'
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  var mailOptions = {
    from: 'hr@rslsofttech.com',
    to: 'hr@rslsofttech.com',
    subject: `Contact Us`,
    html: `
    <p>You received new email from rsl website.</p>
    <table style="width:50%">
    <tr>
      <td><b>Name</b></td>
      <td>${request.body.name}</td>
    
    </tr>
    <tr>
    <td><b>Email</b></td>
    <td>${request.body.email}</td>
  
  </tr>
  <tr>
  <td><b>Phone</b></td>
  <td>${request.body.phone}</td>
</tr>
<tr>
<td><b>Candidates_resume</b></td>
<p><a href="https://rslsofttech.com:3000/candidates_resume/${request.file.filename}">link for ${request.body.name}'s resume</a></p>
</tr>
<tr>
<td><b>Message</b></td>
<td>${request.body.message}</td>

</tr>
  </table>`
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      const user = new User({
        name: request.body.name,
        email:request.body.email,
        phone:request.body.phone,
        message:request.body.message,
        candidates_resume:request.file.filename
      })

      user.save()
      .then(result => {
         response.status(200).send({success:true, msg: "successfully send mail",
         data: `https://rslsofttech.com:3000/candidates_resume/${request.file.filename}` ,
         new_user:result
    })
      }).catch(e => {
        response.status(400).send({success:false,error:e});
      })
    }
  });

}
export async function fetchAll(request, response) {
  try {
    const data = await User.find()
    response.json(data);
  } catch (error) {
    response.json({ message: 'Something went wrong' });
  }
}



