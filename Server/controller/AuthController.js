const User = require("../models/User") ;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var generator = require('generate-password');
var nodemailer = require('nodemailer');


const signup = (req, res) => {
    // Save User to Database
   new User({
    username: req.body.username,
    mail:req.body.mail,
    mdp: bcrypt.hashSync(req.body.mdp, 8),
    isactive:false,
    validation:0,
    role:{roleId:req.body.roleId,intitule:req.body.intitule}})
    .save().then(function(item){
         res.send({message:'Attendre activation de votre compte',error:false});
       
    })
        .catch(function (err) {
            res.send({message:err.message,error:true});
        });

};

const signin = (req, res) => {
    console.log(req.body.mail,req.body.mdp);
    User.findOne({mail:req.body.mail})
        .then((user) => {
            console.log(user);
            if (!user) {
               return res.send({message:"utilisateur introuvable"});
            }

            if (!user.isactive) {
                return res.send({message:"le compte n'est pas encore activé"});
             }
         
            var passwordIsValid = bcrypt.compareSync(
                req.body.mdp,
                user.mdp
            );
            console.log(passwordIsValid);
            if (!passwordIsValid) {
                return res.send({
                    accessToken: null,
                    message: "Mot de passe eronné!"
                });
            }
            var token = jwt.sign({ id: user.id },'secret', {
                expiresIn: 86400 // 24 hours
            });

           
            res.send({
                id: user.id,
                username: user.username,
                mail: user.mail,
                roleId: user.role.roleId,
                accessToken: token
            });

        })
        .catch(err => {
            res.send({ message: err.message });
        });
};


const envoyecode = (req, res) => {
    var email='noumsfinoana@gmail.com';
    var mdp= 'yfuixbmjtxhuorxv';

    console.log(req.body.mail);
    console.log(email);
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user:email , pass:mdp }
    });
    let code = generator.generate({ length: 5, numbers: true });

    var mailOptions = {
        from: "Garage Laurence",
        to: req.body.mail,
        subject: 'Verification email',
        text: 'Vous etes authorise a utiliser le plateforme Suivi de projet; Votre mot de passe est: ZJbcsuygSUHXAIUSsiduc; Veuillez le changer apres activation,Cordialement, l equipe DSI',
        html: `<!doctype html>
                <html>
                <head></head>
                <body>
                 
                    <h1>GARAGE</h1>
        
                    <p>Votre code de validation:${code} </p>
                    <p>Cordialement, GARAGE</p>
                </body>
                </html>`
    };

    transporter.sendMail(mailOptions)
    .then(info => {
        User.updateOne({ mail: req.body.mail },{$set:{validation:code}})
            .then(rep => {
                console.log('success send mail:' + info);
                res.send('activation reussis');
            })
            .catch(err => {
                res.send('Erreur activation user:' + err);
            })
    })
    .catch(err => {
        res.send('Erreur mail Sender:' + err);
        console.log('Erreur mail Sender: ' + err);
    })

}

const activation = (req, res) => {
    console.log(req.body.code);
        User.findOne( { email: req.body.mail,validation:req.body.code })
            .then(rep => {
               if(!rep)
               {
                return  res.send({message:'code invalide' });
               }
               res.send(rep);
            })
            .catch(err => {
                res.send('Erreur activation user:' + err);
            })

}


module.exports = {
   signup,
   signin,
   envoyecode,
   activation
}