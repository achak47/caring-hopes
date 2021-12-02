const jwt = require ('jsonwebtoken');
const account_activate_api_key = "accountactivate123";
CLIENT_URL="http://localhost:3000";

const registerdoctor = (req,res,bcrypt,nodemailer,doctor)=>{
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
    doctor.find({'email':email},async (err,result)=>{
        if(err) throw err ;
        if(result.length){res.status(200).json('User with the same Email Already Exists');
    }
        else{
            const token = jwt.sign ({name, email, password, desc, number}, account_activate_api_key, {expiresIn : '20m'});

            //reusable transporter objec using the default SMTP transport
            let testAccount = await nodemailer.createTestAccount ();
            let transporter = nodemailer.createTransport ({
                host: 'smtp.mail.yahoo.com',
              port: 465,
              service:'yahoo',
              secure: false,
              auth : {
                user : process.env.TRANSPORTER_USER_ACCOUNT,
                pass : process.env.TRANSPORTER_USER_ACCOUNT_PASSWORD
              },
              debug : false, 
              logger : true,
            })
            var mailOptions = {
                from : process.env.TRANSPORTER_USER_ACCOUNT,
                to:email,
                subject: "Test Mail from Caring Hopes !",
                text : "Welcome to Caring Hopes Teleconsultancy service !",
                html : `
                <h2>Please click on the given link to activate your account</h2>
                <p>${CLIENT_URL}/authentication/activate/${token}</p>
                `
              }
              let info = transporter.sendMail (mailOptions, (error, info) => {
                if(error) {
                  console.log (error);
                  res.json ({yo : 'error'});
                  res.sendStatus (500);
                }else {
                  console.log ('Message sent : ' + info.response);
                  res.sendStatus(200).json ({message : 'Mail sent successfully ! kindly activate your account'});
                };
                return res.end();
              });
            
        }
    })
}

//function to activate the email 
const emailActivateDoctor = (req, res, bcrypt, doctor) => {
    const {token} = req.body;

    if (token) {
        jwt.verify (token, account_activate_api_key, function (err, decodedToken) {
            if (err) {
                return res.status (400).json ({error : 'Incorrect or expired link'})
            }

            const {name, email, password, desc, number} = decodedToken;
            const hash = bcrypt.hashSync(password);

            new doctor({
                name : name,
                number : number,
                email: email,
                desc : desc,
                password: hash,

            }).save((err,result)=>{
                if(err) throw err ;
                else res.status(200).json('Success!')
            })
        }) 
    }
    else {
        return res.json({error : "Something went wrong !"});
    }
}

const registerpeople = (req,res,bcrypt, nodemailer, public)=>{
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
    public.find({'email':email}, async (err,result)=>{
        if(err) throw err ;
        if(result.length){res.status(200).json('User with the same Email Already Exists');
    }
        else{
            // new public({
            //     name : name,
            //     number : number,
            //     email: email,
            //     password: hash
            // }).save((err,result)=>{
            //     if(err) throw err ;
            //     else res.status(200).json('Success!')
            // })

            const token = jwt.sign ({name, email, password, number}, account_activate_api_key, {expiresIn : '20m'});

            //reusable transporter objec using the default SMTP transport
            let testAccount = await nodemailer.createTestAccount ();
            let transporter = nodemailer.createTransport ({
                host: 'smtp.mail.yahoo.com',
              port: 465,
              service:'yahoo',
              secure: false,
              auth : {
                user : process.env.TRANSPORTER_USER_ACCOUNT,
                pass : process.env.TRANSPORTER_USER_ACCOUNT_PASSWORD
              },
              debug : false, 
              logger : true,
            })
            var mailOptions = {
                from : process.env.TRANSPORTER_USER_ACCOUNT,
                to:email,
                subject: "Test Mail from Caring Hopes !",
                text : "Welcome to Caring Hopes Teleconsultancy service !",
                html : `
                <h2>Please click on the given link to activate your account</h2>
                <p>${CLIENT_URL}/authentication/activate/${token}</p>
                `
              }
              let info = transporter.sendMail (mailOptions, (error, info) => {
                if(error) {
                  console.log (error);
                  res.json ({yo : 'error'});
                  res.sendStatus (500);
                }else {
                  console.log ('Message sent : ' + info.response);
                  res.sendStatus(200).json ({message : 'Mail sent successfully ! kindly activate your account'});
                };
                return res.end();
              });
        }
    })
}

//function to activate the email 
const emailActivatePublic = (req, res, bcrypt, public) => {
    const {token} = req.body;

    if (token) {
        jwt.verify (token, account_activate_api_key, function (err, decodedToken) {
            if (err) {
                return res.status (400).json ({error : 'Incorrect or expired link'})
            }

            const {name, email, password, desc, number} = decodedToken;
            const hash = bcrypt.hashSync(password);

            new public({
                name : name,
                number : number,
                email: email,
                password: hash,

            }).save((err,result)=>{
                if(err) throw err ;
                else res.status(200).json('Success!')
            })
        }) 
    }
    else {
        return res.json({error : "Something went wrong !"});
    }
}
module.exports = {
    registerdoctor : registerdoctor,
    registerpeople : registerpeople,
    emailActivateDoctor : emailActivateDoctor,
    emailActivatePublic : emailActivatePublic
}