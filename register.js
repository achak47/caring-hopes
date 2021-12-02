
const registerdoctor = (req,res,bcrypt,doctor)=>{
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
}

const registerpeople = (req,res,bcrypt,public)=>{
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
}
module.exports = {
    registerdoctor : registerdoctor,
    registerpeople : registerpeople
}