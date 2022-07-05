require('dotenv').config()
const express= require ('express');
const cors= require ('cors');
const morgan=require('morgan');
const bodyParser = require("body-parser")
const  nodemailer = require('nodemailer');
const app= express();
app.use(cors());
app.use(morgan());
app.use(bodyParser.json());
// app.use(express.json());


app.post('/api/user',(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    console.log(req.header)
    var transporter = nodemailer.createTransport({
        host:'smtppro.zoho.in',
        secure:true ,
        auth: {
          user: 'newyear2022@zohomail.in',
          pass: process.env.PASS ,
        }
      });
      
      var emailId=req.body.emailId;
      console.log(emailId);
      var friendName=req.body.friendName;
      console.log(friendName);
      var userName= req.body.userName;
      var mailOptions = {
        from: 'newyear2022@zohomail.in',
        to: `${emailId}`,
        subject: 'newyearwish',
        html: `Hey ${friendName}, I wish you a happy new year
        from  ${userName} ${process.env.API}` ,
        attachments: [{
        filename: 'newyear.gif',
        path:'../frontend/src/assets/newyear.gif',
        cid: 'newyearwish' 
}],
         
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      res.json("success");
})


app.get('/*',function(req,res){
  res.sendFile(path.join(__dirname+'/dist/frontend/index.html'))
})


//PORT
const port = process.env.PORT || 3000;


app.listen(port,()=>{
    console.log("server on 3000");
})



