var chai = require('chai')
var should = chai.should();
var chaiHttp = require('chai-http');
const bCrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

chai.use(chaiHttp);
let server = 'localhost:3000'
// let server = require('../server.js')
let id = ''

let name = 'name', category = 'category', price = 'price', description = 'description', color = 'color', size = 'size', image_url = 'image_url'
// router.get('/bukalapak/:keyword', itemController.getItemBukalapak);
describe('GET /bukalapak', function() {
  it('should return array of items', function(done) {
    chai.request(server)
      .get('/bukalapak')
      .end(function(err, res){
        // console.log(res.body);
        res.should.have.status(200);
        res.body.should.be.an('array');

        done()
      })
  });
  it('should not return object or string of items', function(done) {
    chai.request(server)
      .get('/bukalapak')
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
      .get('/bukalapak')
      .end(function(err, res){
        // console.log(res.body);
        res.should.have.status(200);

        done()
      })
  });
});

// router.post('/createitem', helpers.checkRole, itemController.createItem)
describe('POST /createitem', function() {
  it('should return object item when given value name, itemname, password, email, phone', function(done) {
    chai.request(server)
      .post('/createitem')
      .send({ name: name, category: category, price: price, description: description, color: color, size: size, image_url: image_url })
      .end(function(err, res){
        // console.log(res.body);
        res.should.have.status(200);
        res.body.should.be.an('object');
        // res.body.name.should.equal(name)
        // res.body.image_url.should.be.a('string');
        // res.body.category.should.equal(category)
        id = res.body._id
        done()
      })
  });
  it('should not return array or string item when given value name, itemname, password, email, phone', function(done) {
    chai.request(server)
      .post('/createitem')
      .send({ name: name, category: category, price: price, description: description, color: color, size: size, image_url: image_url })
      .end(function(err, res){
        // console.log(res.body);
        res.should.have.status(200);
        res.body.should.not.be.an('array');
        res.body.should.not.be.an('string');
        // res.body.name.should.equal(name)
        // res.body.image_url.should.be.a('string');
        // res.body.category.should.equal(category)
        id = res.body._id
        done()
      })
  });
  it('should return error message when given wrong value name, itemname, password, email, phone', function(done) {
    chai.request(server)
      .post('/createitem')
      .send({ name: name, category: category, price: price, description: description, color: color, size: size, image_url: image_url })
      .end(function(err, res){
        // console.log(res.body);
        res.should.have.status(200);
        done()
      })
  });
});

// router.get('/allitem', itemController.getAllItem)
describe('GET /allitem', function() {
  it('should return array of items', function(done) {
    chai.request(server)
      .get('/allitem')
      .end(function(err, res){
        // console.log(res.body);
        res.should.have.status(200);
        res.body.should.be.an('array');

        done()
      })
  });
  it('should not return object or string of items', function(done) {
    chai.request(server)
      .get('/allitem')
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
      .get('/allitem')
      .end(function(err, res){
        // console.log(res.body);
        res.should.have.status(200);

        done()
      })
  });
});

// router.get('/detailitem/:id', itemController.getItemById)
describe(`GET /detailitem/:id`, function() {
  it('should return json of item', function(done) {
    chai.request(server)
    .get(`/detailitem/${id}`)
    .end(function(err, res){
      // console.log(res.body);
      // id = res.body._id
      // res.body.name.should.equal(name)
      res.should.have.status(200);
      res.body.should.be.an('object');
      done()
    })
  });
  it('should not return array or string of item', function(done) {
    chai.request(server)
    .get(`/detailitem/${id}`)
    .end(function(err, res){
      res.should.have.status(200);
      res.body.should.not.be.an('array');
      res.body.should.not.be.an('string');
      done()
    })
  });
  it('should return error message', function(done) {
    chai.request(server)
    .get(`/detailitem/${id}`)
    .end(function(err, res){
      res.should.have.status(200);
      done()
    })
  });
});

// router.put('/edititem/:id', helpers.checkRole, itemController.editItemById)
describe(`PUT /edititem/:id`, function() {
  it('should return updated object', function(done) {
    chai.request(server)
      .put(`/edititem/${id}`)
      .send({ name: 'ganti', category: 'ganti', price: '10.000' })
      .end(function (err, res) {
        // console.log(res.body);
        // res.body.name.should.equal('ganti')
        // res.body.category.should.equal('ganti')
        res.should.have.status(200);
        res.body.should.be.an('object');
        done()
      });
  });
  it('should not return an array or string', function(done) {
    chai.request(server)
      .put(`/edititem/${id}`)
      .send({ name: 'ganti', category: 'ganti', price: '10.000' })
      .end(function (err, res) {
        // console.log(res.body);
        // res.body.name.should.equal('ganti')
        // res.body.category.should.equal('ganti')
        res.should.have.status(200);
        res.body.should.not.be.an('array');
        res.body.should.not.be.an('string');
        done()
      });
  });
  it('should return error messsage', function(done) {
    chai.request(server)
      .put(`/edititem/${id}`)
      .send({ name: 'ganti', category: 'ganti', price: '10.000' })
      .end(function (err, res) {
        res.should.have.status(200);
        done()
      });
  });
});

// router.delete('/deleteitem/:id', helpers.checkRole, itemController.deleteItemById)
describe('DELETE /deleteitem/:id', function() {
  it('should return json of deleted item', function(done) {
    chai.request(server)
      .delete(`/deleteitem/${id}`)
      .end(function (err, res) {
        // console.log(res.body);
        // res.body._id.should.equal(id)
        res.should.have.status(200);
        res.body.should.be.an('object');
        done()
      });
  });
  it('should not return json of deleted item', function(done) {
    chai.request(server)
      .delete(`/deleteitem/${id}`)
      .end(function (err, res) {
        // console.log(res.body);
        // res.body._id.should.equal(id)
        res.should.have.status(200);
        // res.body.should.be.an('object');
        done()
      });
  });
  it('should return error message', function(done) {
    chai.request(server)
      .delete(`/deleteitem/${id}`)
      .end(function (err, res) {
        // console.log(res.body);
        // res.body._id.should.equal(id)
        res.should.have.status(200);
        // res.body.should.be.an('object');
        done()
      });
  });
});
