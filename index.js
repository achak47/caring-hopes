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
const freeSlot = Users.freeSlot;
const updateSlot = require ('./updateSlot');

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


//to get the list of all avaiable slots 
app.get ('/api-free-slots', (req, res) => {
    var obj = {};
    freeSlot.find ({}, (err, result) => {
        if (err) {
            res.status (400).send ('Error in loading freeslot database');
        }
        else {
            obj['freeslots'] = result;
            res.status (200).send (result);
        }
    })
});

//calling the apis
app.post('/register',(req,res)=>{Register.registerdoctor(req,res,bcrypt,nodemailer,doctor)}) ;
app.post('/registerpeople',(req,res)=>{Register.registerpeople(req,res,bcrypt,nodemailer,public)}) ;
app.post('/signin',(req,res)=>{Login.doctorlogin(req,res,bcrypt,doctor)}) ;
app.post('/signinpeople',(req,res)=>{Login.peoplelogin(req,res,bcrypt,public)}) ;
app.post ('/email-activate-doctor', (req, res) => {Register.emailActivateDoctor(req, res, bcrypt, doctor)});
app.post ('/email-activate-public', (req, res) => {Register.emailActivatePublic(req, res, bcrypt, public)});
app.post ('/update-free-slot', (req, res) => {updateSlot.updateSlot (req, res, freeSlot)});

app.listen(process.env.PORT || port , ()=> {
    mongoose.connect(process.env.mongopath,{
        useNewUrlParser: true ,
        useUnifiedTopology: true
    }).then(()=>{
        console.log('Connection Succesful !!!')
    }).catch((err)=> console.log(err))
  })
