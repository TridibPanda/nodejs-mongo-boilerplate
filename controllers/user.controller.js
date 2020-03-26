const User = require('../models/user.model');
const multer = require('multer');
const upload = multer();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');



//Users
exports.find = async function (req, res) {
    User.find({},function(err,users){
        if(err){
            res.send('somthing went really wrong!');
        }
        res.json(users);
    })
};

//User findbyId
exports.findbyId = async  function(req,res){
    const id = {_id:req.params.id};
    User.find(id,function(err,users){
        if(err){
            res.send('somthing went really wrong!');
        }
        res.json(users);
    })

}

// Inserting a user data into database during signup
exports.createUser = async function (req, res) {

    //Cheacking if the email is already in the database
    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');

    //Cheacking if the mobile number is already in the database
    const mobileExist = await User.findOne({mobile:req.body.mobile});
    if(mobileExist) return res.status(400).send('Mobile number already exists');

    //Hash passwords
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(req.body.password,salt);


    let user = new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        img:req.body.img,
        dob:req.body.dob,
        email:req.body.email,
        mobile:req.body.mobile,
        password:hashPassword
    });

    try{
        // save the user in the database
        const saveUser = await user.save();

         //send email using nodemailer
        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'nits.tridib@gmail.com',//enter your email(testing purpose)
          pass: 'email password' //enter your email password(testing purpose) && https://myaccount.google.com/lesssecureapps(Gmail Permission)
                                //Less secure app access => On
        }
      });

      var mailOptions = {
        from: 'nits.tridib@gmail.com',// enter auth user email
        to: user.email,
        subject: "Tridib",
        html: "Tridib Panda"
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        }
        else {
          console.log('Email sent ' + info.responses);
        }
      });

        res.send({
            Email:user.email,
            Mobile:user.mobile,
            img:user.img,
            message: "User created successfully."
        });
    }
    catch(err){
        res.status(400).send(err);
    }
};


//Update a user from the database
exports.update = async function(req,res){
    const id = {_id:req.params.id};

     //Cheacking if the user is already in the database
    //const emailExist = await User.findOne({email:req.body.email});
    //if(emailExist) return res.status(400).send('Email already exists');

    //Hash passwords
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(req.body.password,salt);


    let user = ({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        dob:req.body.dob,
        email:req.body.email,
        mobile:req.body.mobile,
        password:hashPassword
    });

     try{
        await User.updateOne(id, user);
        res.send({
            Email:user.email,
            Mobile:user.mobile,
            message: "User updated successfully."
        });
    }
    catch(err){
        res.status(400).send(err);
    }

};

//Deletes a user from the database
exports.remove = async function(req,res){
    const id = {_id:req.params.id};
    User.findByIdAndRemove(id,function(err,user){
        if(err) return res.send('There was a problem deleting the user');
        res.send("User:"+ user.email + "  was deleted");
    })
}

//login through email 
exports.logIn = async function(req,res){

     //Cheacking if the email exists
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Email or password is wrong');
    //Cheacking password
    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) return res.status(400).send('Invalid password');
    var token = jwt.sign({ id:user._id }, 'privateKey');
    res.header('token',token).send({'token':token});

};
// login through mobile number 
exports.loginMobile = async function(req, res){
    //Cheacking if the email exists
    const user = await User.findOne({mobile:req.body.mobile});
    if(!user) return res.status(400).send('mobile number or password is wrong');
    //Cheacking password
    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) return res.status(400).send('Invalid password');
    var token = jwt.sign({id : user._id},'privateKey');
    res.header('token',token).send({'token':token});
}
