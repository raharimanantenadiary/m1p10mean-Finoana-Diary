const User = require("../models/User") ;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var generator = require('generate-password');
var nodemailer = require('nodemailer');


const signup = (req, res) => {
    // Save User to Database
    User.create({
        username: req.body.username,
        mail: req.body.email,
        mdp: bcrypt.hashSync(req.body.mdp, 8)
    }).then(function(item){
         res.send({message:'Attendre activation de votre compte',error:false});
        // res.send({message:'Attendre activation de votre compte'})
    })
        .catch(function (err) {
            res.send({message:'Format de l`email incorrecte',error:true});
        });

};

const signin = (req, res) => {
    console.log(req.body.username, req.body.password, req.body.email);
    User.findOne({
        where: {
            mail: req.body.email
        }
    })
        .then(user => {
            console.log(user);
            if (!user) {
                return res.send({ message: "Utlisateur introuvable" });
            }
            console.log(req.body.password);
            console.log(user.password);
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            console.log(passwordIsValid);
            if (!passwordIsValid) {
                return res.send({
                    accessToken: null,
                    message: "Mot de passe eronné!"
                });
            }
            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

           
            res.send({
                id: user.id,
                username: user.username,
                mail: user.mail,
                roleId: user.roleId,
                accessToken: token
            });

        })
        .catch(err => {
            res.send({ message: err.message });
        });
};


const activation = (req, res) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: config.email, pass: config.password }
    });
    let generatePassword = generator.generate({ length: 20, numbers: true });

    var mailOptions = {
        from: config.email,
        to: req.body.email,
        subject: 'Activation de votre compte',
        text: 'Vous etes authorise a utiliser le plateforme Suivi de projet; Votre mot de passe est: ZJbcsuygSUHXAIUSsiduc; Veuillez le changer apres activation,Cordialement, l equipe DSI',
        html: `<!doctype html>
                <html>
                <head></head>
                <body>
                 <img src="https://scontent.ftnr2-2.fna.fbcdn.net/v/t39.30808-6/273191828_307451018091211_7562487185427167423_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHqfXpm-heTtAQ4Kz38VE8GalDUGreXOrtqUNQat5c6u4llM8DE9y_8D-awL9RAvEscO6xI2uW_1mHQwBhK4tG2&_nc_ohc=83-T4_RSDZcAX97pvCR&_nc_oc=AQmz8vqJJLTVSpsHIsoo1PD87DmwO2qZFzReGsgKESTuRAj71kQFLf6bIBLQY6IH2Yo&_nc_ht=scontent.ftnr2-2.fna&oh=00_AT-KfjAXDplIuFXwBiDl1rrwPrsklFCDY82Z9HBJa9WGNQ&oe=635ACEF1" width="200" height="200"/>
                    <h1>Ministere de l'eau et de l'assainissement</h1>
                    <h2>Vous etes authorise a utiliser le plateforme Suivi de projet</h2>
                    <p>Votre mot de passe est: ${generatePassword}</p>
                    <p>Veuillez le changer apres activation,</p>
                    <p>Cordialement, l'equipe DSI</p>
                </body>
                </html>`
    };

    transporter.sendMail(mailOptions)
    .then(info => {
        UserModel.update({ isAvtive: true, password: bcrypt.hashSync(generatePassword, 8) }, { where: { email: req.body.email } })
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


module.exports = {
   signup,
   signin,
   activation
}