const doctorlogin = (req,res,bcrypt,doctor)=>{
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
}

const peoplelogin = (req,res,bcrypt,public)=>{
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
}

module.exports = {
    doctorlogin:doctorlogin,
    peoplelogin:peoplelogin
}