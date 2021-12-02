var express = require("express")
var app = express() ;
const mongoose = require('mongoose')
const port = 3001 ;
const dotenv = require('dotenv')
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const nodemailer = require ('nodemailer');

dotenv.config() ;
const Users = require("./models") ;
const Register = require("./register") ;
const Login = require("./signin") ;
const doctor = Users.doctor ;
const public = Users.public ;
app.use(express.json()) ; //Middleware
app.use(cors()) ;
app.get('/' , (req,res)=>{
    res.json('Hi World') ;
})
app.get('/api',(req,res)=>{
   var obj = {} ;
    doctor.find({},(err,result)=>{
    if(err) throw err
    obj['doctors'] = result ;
    public.find({},(err,result)=>{
        if(err) throw err
        obj['public'] = result ;
        res.status(200).json(obj) ;
       })    
   })
})
app.post('/register',(req,res)=>{Register.registerdoctor(req,res,bcrypt,nodemailer,doctor)}) ;
app.post('/registerpeople',(req,res)=>{Register.registerpeople(req,res,bcrypt,public)}) ;
app.post('/signin',(req,res)=>{Login.doctorlogin(req,res,bcrypt,doctor)}) ;
app.post('/signinpeople',(req,res)=>{Login.peoplelogin(req,res,bcrypt,public)}) ;
app.post ('/email-activate-doctor', (req, res) => {Register.emailActivateDoctor(req, res, bcrypt, doctor)});
app.listen(process.env.PORT || port , ()=> {
    mongoose.connect(process.env.mongopath,{
        useNewUrlParser: true ,
        useUnifiedTopology: true
    }).then(()=>{
        console.log('Connection Succesful !!!')
    }).catch((err)=> console.log(err))
  })
/*app.post('/register',(req,res)=>{
    const { email,name,password,desc,number } = req.body ;  //Destructuring
    if(!email||!name||!password)
    {
       if(!email)
       {
        return res.status(400).json('Pls enter your email id') ;
       }
       if(!password)
       {
        return res.status(400).json('Pls enter your password') ;
       }
       if(!name)
       {
        return res.status(400).json('Pls enter your name') ;
       }
    }
    const hash = bcrypt.hashSync(password) ;
    doctor.find({'email':email},(err,result)=>{
        if(err) throw err ;
        if(result.length){res.status(200).json('User with the same Email Already Exists');
    }
        else{
            new doctor({
                name : name,
                number : number,
                email: email,
                desc : desc,
                password: hash
            }).save((err,result)=>{
                if(err) throw err ;
                else res.status(200).json('Success!')
            })
        }
    })
})
app.post('/registerpeople',(req,res)=>{
    const { email,name,password,number } = req.body ;  //Destructuring
    if(!email||!name||!password)
    {
       if(!email)
       {
        return res.status(400).json('Pls enter your email id') ;
       }
       if(!password)
       {
        return res.status(400).json('Pls enter your password') ;
       }
       if(!name)
       {
        return res.status(400).json('Pls enter your name') ;
       }
    }
    const hash = bcrypt.hashSync(password) ;
    public.find({'email':email},(err,result)=>{
        if(err) throw err ;
        if(result.length){res.status(200).json('User with the same Email Already Exists');
    }
        else{
            new public({
                name : name,
                number : number,
                email: email,
                password: hash
            }).save((err,result)=>{
                if(err) throw err ;
                else res.status(200).json('Success!')
            })
        }
    })
})
app.post('/signin',(req,res)=>{
    const { email,password} = req.body ;
    if(!email || !password){
      return res.status(400).json('Pls Enter your details properly') ;
    }
    doctor.find({'email':email},(err,result)=>{
        if(err) throw err
        if(result.length == 0){
            res.status(200).json("No such User exists ! Pls enter a valid email id")
        }
        else{
            const isvalid = bcrypt.compareSync(password , result[0].password) ;
            if(isvalid) res.send(result[0])
            else res.status(200).json("Wrong Password")
        }
    })
})
app.post('/signinpeople',(req,res)=>{
    const { email,password} = req.body ;
    if(!email || !password){
      return res.status(400).json('Pls Enter your details properly') ;
    }
    public.find({'email':email},(err,result)=>{
        if(err) throw err
        if(result.length == 0){
            res.status(200).json("No such User exists ! Pls enter a valid email id")
        }
        else{
            const isvalid = bcrypt.compareSync(password , result[0].password) ;
            if(isvalid) res.send(result[0])
            else res.status(200).json("Wrong Password")
        }
    })
})
*/