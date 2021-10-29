var express = require("express")
var app = express() ;
const mongoose = require('mongoose')
const port = 3001 ;
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const schema = new mongoose.Schema({
    name : String,
    number: String,
    email : String,
    desc : String,
    password : String
  });
var people = mongoose.model('users',schema)
app.use(express.json()) ; //Middleware
app.use(cors()) ;
app.get('/' , (req,res)=>{
    res.json('Hi World') ;
})
app.get('/api',(req,res)=>{
   people.find({},(err,result)=>{
    if(err) throw err
    res.send(result)
   })
})
app.post('/register',(req,res)=>{
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
    people.find({'email':email},(err,result)=>{
        if(err) throw err ;
        if(result.length){res.status(200).json('User with the same Email Already Exists');
    }
        else{
            new people({
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
app.post('/signin',(req,res)=>{
    const { email,password} = req.body ;
    if(!email || !password){
      return res.status(400).json('Pls Enter your details properly') ;
    }
    people.find({'email':email},(err,result)=>{
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
const mongopath = 'mongodb+srv://achak47_1:abd17vk18@cluster0.qrwei.mongodb.net/people?retryWrites=true&w=majority'
app.listen(process.env.PORT || port , ()=> {
    mongoose.connect(mongopath,{
        useNewUrlParser: true ,
        useUnifiedTopology: true
    }).then(()=>{
        console.log('Connection Succesful !!!')
    }).catch((err)=> console.log(err))
  })