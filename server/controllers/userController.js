const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bCrypt = require('bcrypt')
const saltRounds = 10
let methods = {}
const nodemailer = require('nodemailer')
var CronJob = require('cron').CronJob,
    kue = require('kue'),
    queue = kue.createQueue()
const serverSMS = require('../helpers/serverSMS')

const transporter = nodemailer.createTransport({
  service: 'gmail.com',
  auth: {
    user: process.env.USERNAME,
    pass: process.env.PASSWORD
  }
})

methods.signUp = (req, res) => {
  let pwd = req.body.password
  let newUser = new User({
    name: req.body.name,
    username: req.body.username,
    password: bCrypt.hashSync(pwd, saltRounds),
    email: req.body.email,
    phone: req.body.phone
  })
  newUser.save((err, data) => {
    if (err) res.json({err})
    console.log('SignUp success');
    serverSMS.sendSMS(data)
    console.log(data);;
    res.send(data)
  })
  // console.log(process.env.USERNAME);
  // console.log(process.env.PASSWORD);
  //
  // User.findOne({
  //   username: req.body.username
  // },function(err,result){
  //   if(result){
  //     res.send(`Username already in use!`)
  //   }
  //   else{
  //     let hash = bCrypt.hashSync(req.body.password,saltRounds)
  //     User.create({
  //       name: req.body.name,
  //       username: req.body.username,
  //       password: bCrypt.hashSync(pwd, saltRounds),
  //       email: req.body.email,
  //       phone: req.body.phone
  //     },function(err,result){
  //       console.log('result: ', result.email);
  //       new CronJob('07 * * * * *', function() {
  //           var job = queue.create('email',{
  //             from:`Welcome ${result.username} <arahitolubis@gmail.com>`,
  //             to: `${result.email}`,
  //             subject: `Welcome ${result.username}`,
  //             text: 'WELCOME TO OUR WEBSITE!!',
  //             html: `Welcome ${result.username} to LelangCorp\nBest regards: Hacktiv8`
  //           }).save(function(err){
  //             if(!err)
  //             console.log((job.data));
  //           })
  //
  //           queue.process('email', function(job, done){
  //             console.log('ini job data');
  //             console.log(job.data);
  //             transporter.sendMail(job.data, (error, info) => {
  //                 if (error) {
  //                     return console.log(error);
  //                 }
  //                 else{
  //                   console.log(`✔ Email Sent to ${job.data.to}`)
  //                 }
  //             });
  //             done()
  //           });
  //           this.stop()
  //       }, null,
  //         true, /* Start the job right now */
  //         'Asia/Jakarta' /* Time zone of this job. */
  //       );
  //       res.send(result)
  //     })
  //   }
  // })
} //signup

methods.signIn = (req, res) => {
  let pwd = req.body.password
  User.findOne({
    username: req.body.username
  })
  .then(record => {
    console.log('Record data user login');
    console.log(record);
    if (bCrypt.compareSync(pwd, record.password)) {
      let token = jwt.sign({
        id: record._id,
        username: record.username,
        email: record.email,
        role: record.role
      }, process.env.SECRET_KEY, { expiresIn: '1d'})
      console.log('token login: '+token);
      res.json({
        message: 'SignIn success',
        id: record._id,
        username: record.username,
        role: record.role,
        token
      })
    } else {
      res.json({
        message: "Your password don't match"
      })
    }
  })
} //signin biasa

//INSERT FB
methods.signInFB = function(req, res){
  let id = req.body.uuid;
  let name = req.body.name;
  let email = req.body.email;
  User.findOne({'uuid': id}, function(err, user) {
    if(err) {
      res.send(err);
    }
    console.log('ppppppp',user);
    if(user !== null) {
      res.send(user);
    } else {
      let newUser = new User({
        uuid: id,
        username: name,
        name: name,
        email: email
      });
      newUser.save(function(err) {
        if(err) {
          res.send(err);
        } else {
          res.send(newUser);
        }
      });
    }
  });
} //signinFB

methods.getAllUsers = (req, res) => {
  User.find({}, (err, records) => {
    if (err) res.json({err})
    console.log('Data all user success');
    console.log(records);
    res.json(records)
  })
} // getAllUser

methods.getUserById = (req, res) => {
  User.findById(req.params.id, (err, record) => {
    if (err) res.json({err})
    console.log('Detail User success');
    console.log(record);
    res.json(record)
  })
} //getUserById

methods.editUser = (req, res) => {
  let pwdUser = req.body.password
    User.findById(req.params.id)
    .exec((error, response) => {
      if (error) res.json({error})
      console.log(response._id);
      console.log('Masuk gakkk: '+ req.body.name);
      console.log('pwd hash di editUser:  '+bCrypt.hashSync(pwdUser, saltRounds));
      User.findByIdAndUpdate({
        "_id": response._id
      }, {
        $set: {
          "name": req.body.name || response.name,
          "username": req.body.username || response.username,
          "password": bCrypt.hashSync(pwdUser, saltRounds) || response.password,
          "email": req.body.email || response.email
        }
      }, {
        new: true
      })
      .exec((err, result) => {
        if (err) res.json({err})
        res.json(result)
        console.log('edit user success');
      })
    })
} //editUser

methods.deleteUserById = (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, record) => {
      if (err) res.json({err})
      console.log('Delete user success');
      console.log(record);
      res.json(record)
    })
} //deleteUser

module.exports = methods