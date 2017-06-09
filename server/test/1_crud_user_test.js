var chai = require('chai')
var should = chai.should();
var chaiHttp = require('chai-http');
const bCrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

chai.use(chaiHttp);
let server = 'localhost:3000'
let id = ''
Uname = "ridho0"
Pass = "1234"
// router.post('/signup', userController.signUp)
// router.post('/signin', userController.signIn)

describe('POST /signup', function() {
  it('should return object user when given value name, username, password, email, phone', function(done) {
    chai.request(server)
      .post('/signup')
      .send({ name: 'ridho', username: Uname, password: Pass, email: 'ridho230994@gmail.com', phone:'+6282257028810' })
      .end(function(err, res){
        // console.log(bCrypt.compareSync('ini adalah password', res.body.password));
        // bCrypt.compareSync('1234', res.body.password); // true
        // console.log(res.body);
        res.body.should.be.an('object');
        res.body.username.should.equal('ridho0')
        res.body.phone.should.be.a('string');
        res.body.email.should.equal('ridho230994@gmail.com')
        id = res.body._id
        done()
      })
  });
  it('should not return array user when given value name, username, password, email, phone', function(done) {
    chai.request(server)
      .post('/signup')
      .send({ name: 'ridho', username: Uname, password: Pass, email: 'ridho230994@gmail.com', phone:'+6282257028810' })
      .end(function(err, res){
        // console.log(bCrypt.compareSync('ini adalah password', res.body.password));
        // bCrypt.compareSync('1234', res.body.password); // true
        // console.log(res.body);
        res.body.should.not.be.an('array');
        res.body.username.should.not.equal('name')
        res.body.phone.should.not.be.an('number');
        id = res.body._id
        done()
      })
  });
  it('should return error message when given wrong value of name, username, password, email, phone', function(done) {
    chai.request(server)
      .post('/signup')
      .send({ name: 123, username: Uname, password: Pass, email: 'gmail.com', phone:'+6282257028810' })
      .end(function(err, res){
        // console.log(bCrypt.compareSync('ini adalah password', res.body.password));
        // bCrypt.compareSync('1234', res.body.password); // true
        // console.log(res.body);
        // res.body.should.not.be.an('array');
        // res.body.username.should.not.equal(Uname)
        // res.body.phone.should.not.be.an('number');
        id = res.body._id
        done()
      })
  });
});

describe('POST /signin', function() {
  it('should return object of success message and token when given value username and password', function(done) {
    chai.request(server)
    .post('/signin')
    .send({ username: 'ridho0', password: '1234' })
    .end(function(err, res){
      // console.log(res.body);
      res.should.have.status(200);
      res.body.should.be.an('object');
      res.body.message.should.equal('SignIn success')
      res.body.token.should.be.a('string')
      done()
    })
  });
  it('should not return array of success message and token when given value username and password', function(done) {
    chai.request(server)
    .post('/signin')
    .send({ username: 'ridho0', password: '1234' })
    .end(function(err, res){
      // console.log(res.body);
      res.should.have.status(200);
      res.body.should.not.be.an('array');
      res.body.message.should.not.equal('SignIn fail')
      res.body.token.should.not.be.an('number')
      done()
    })
  });
  it('should not return error message when given wrong value username and password', function(done) {
    chai.request(server)
    .post('/signin')
    .send({ username: 'ridho0', password: '1234' })
    .end(function(err, res){
      // console.log(res.body);
      res.should.have.status(200);
      res.body.should.not.be.an('array');
      res.body.message.should.not.equal('SignIn fail')
      res.body.token.should.not.be.an('number')
      done()
    })
  });
});

// router.post('/signinfb', userController.signInFB)
// describe('POST /signinfb', function() {
//   it('should return user token when given value username and password', function(done) {
//     chai.request(server)
//     .post('/signin')
//     .send({ username: 'ridho0', password: '1234' })
//     .end(function(err, res){
//       console.log(res.body);
//       res.should.have.status(200);
//       res.body.should.be.a('array');
//
//       done()
//     })
//   });
// });


// router.get('/allusers', userController.getAllUsers)
describe('GET /allusers', function() {
  it('should return array of users', function(done) {
    chai.request(server)
      .get('/allusers')
      .end(function(err, res){
        // console.log(res.body);
        res.should.have.status(200);
        res.body.should.be.an('array');

        done()
      })
  });
  it('should not return object of users', function(done) {
    chai.request(server)
      .get('/allusers')
      .end(function(err, res){
        // console.log(res.body);
        res.should.have.status(200);
        res.body.should.not.be.an('object');
        res.body.should.not.be.an('string');

        done()
      })
  });
  it('should return error message', function(done) {
    chai.request(server)
      .get('/allusers')
      .end(function(err, res){
        // console.log(res.body);
        res.should.have.status(200);
        res.body.should.not.be.an('object');
        res.body.should.not.be.an('string');

        done()
      })
  });
});



// router.get('/detailuser/:id', userController.getUserById)
describe(`GET /detailuser/:id`, function() {
  it('should return json user', function(done) {
    chai.request(server)
    .get(`/detailuser/${id}`)
    .end(function(err, res){
      // console.log(res.body);
      res.should.have.status(200);
      res.body.should.be.an('object');
      res.body.username.should.equal(Uname)
      bCrypt.compareSync(Pass, res.body.password);
      // res.body.password.should.equal('ini adalah password')
      id = res.body._id
      done()
    })
  });
  it('should not return array or string of user', function(done) {
    chai.request(server)
    .get(`/detailuser/${id}`)
    .end(function(err, res){
      // console.log(res.body);
      res.should.have.status(200);
      res.body.should.not.be.an('array');
      res.body.should.not.be.an('string');
      res.body.username.should.not.equal('name')
      bCrypt.compareSync(Pass, res.body.password);
      // res.body.password.should.equal('ini adalah password')
      id = res.body._id
      done()
    })
  });
  it('should return error message', function(done) {
    chai.request(server)
    .get(`/detailuser/${id}`)
    .end(function(err, res){
      // console.log(res.body);
      res.should.have.status(200);
      res.body.should.not.be.an('array');
      res.body.should.not.be.an('string');
      res.body.username.should.not.equal('name')
      bCrypt.compareSync(Pass, res.body.password);
      // res.body.password.should.equal('ini adalah password')
      id = res.body._id
      done()
    })
  });
});

// router.put('/edituser/:id', userController.editUser)  // password harus disertakan
describe(`PUT /edituser/:id`, function() {
  it('should return object of updated user', function(done) {
    chai.request(server)
      .put(`/edituser/${id}`)
      .send({ name: 'pratama', username: 'ganti', password: Pass })
      .end(function (err, res) {
        // console.log(res.body);
        // res.body.msg.should.equal('success update')
        res.should.have.status(200);
        res.body.name.should.equal('pratama')
        res.body.username.should.equal('ganti')
        // res.body.password.should.equal('ini adalah password yg sudah di update')
        done()
      });
  });
  it('should not return array or string of updated user', function(done) {
    chai.request(server)
      .put(`/edituser/${id}`)
      .send({ name: 'pratama', username: 'ganti', password: Pass })
      .end(function (err, res) {
        // console.log(res.body);
        res.should.have.status(200);
        res.body.should.not.be.an('array');
        res.body.should.not.be.an('string');
        res.body.name.should.not.equal('ratama')
        res.body.username.should.not.equal('anti')
        // res.body.password.should.equal('ini adalah password yg sudah di update')
        done()
      });
  });
  it('should return error message', function(done) {
    chai.request(server)
      .put(`/edituser/${id}`)
      .send({ name: 'pratama', username: 'ganti', password: Pass })
      .end(function (err, res) {
        // console.log(res.body);
        res.should.have.status(200);
        res.body.should.not.be.an('array');
        res.body.should.not.be.an('string');
        res.body.name.should.not.equal('ratama')
        res.body.username.should.not.equal('anti')
        // res.body.password.should.equal('ini adalah password yg sudah di update')
        done()
      });
  });
});

// router.delete('/deleteuser/:id', userController.deleteUserById)
describe('DELETE /deleteuser/:id', function() {
  it('should return json of deleted user', function(done) {
    chai.request(server)
      .delete(`/deleteuser/${id}`)
      .end(function (err, res) {
        // console.log(res.body);
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body._id.should.equal(id)
        done()
      });
  });
  it('should not return array or string of deleted user', function(done) {
    chai.request(server)
      .delete(`/deleteuser/${id}`)
      .end(function (err, res) {
        // console.log(typeof res.body);
        res.should.have.status(200);
        // res.body.should.not.be.an('array');
        done()
      });
  });
  it('should return error message', function(done) {
    chai.request(server)
      .delete(`/deleteuser/${id}`)
      .end(function (err, res) {
        // console.log(typeof res.body);
        res.should.have.status(200);
        done()
      });
  });
});
