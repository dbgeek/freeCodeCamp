/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');
const bookModel = require('../db/book');

chai.use(chaiHttp);
let testBookID;
before(async () => {
  const book = await bookModel.create({
    title: "Test1 Book"
  });
  testBookID = book._id;
});

after(async () => {
  await bookModel.deleteOne({
    _id: testBookID
  });
});

suite('Functional Tests', () => {

  /*
  * ----[EXAMPLE TEST]----
  */
  test('#example Test GET /api/books', (done) => {
    chai.request(server)
      .get('/api/books')
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });
  });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', () => {
    let id;

    suite('POST /api/books with title => create book object/expect book object', () =>  {

      test('Test POST /api/books with title', (done) =>  {
        chai.request(server)
          .post('/api/books')
          .send({ title: 'MYTO-MANEN' })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.body.title, 'MYTO-MANEN');
            assert.property(res.body, '_id');
            id = res.body._id;
            done();
          });
      });

      test('Test POST /api/books with no title given', (done) =>  {
        chai.request(server)
          .post('/api/books')
          .send({})
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'missing title');
            done();
          });
      });

    });

    suite('GET /api/books => array of books', () => {

      test('Test GET /api/books', (done) =>  {
        chai.request(server)
          .get('/api/books')
          .send({})
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.property(res.body[0], '_id');
            assert.property(res.body[0], 'title');
            assert.property(res.body[0], 'commentcount');
            done();
          });
      });

    });

    suite('GET /api/books/[id] => book object with [id]', () => {

      test('Test GET /api/books/[id] with id not in db', (done) =>  {
        chai.request(server)
          .get('/api/books/0987654321')
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, 'no book exists');
            done();
          });
      });

      test('Test GET /api/books/[id] with valid id in db', (done) =>  {
        chai.request(server)
          .get('/api/books/' + id)
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.propertyVal(res.body, '_id', id);
            assert.property(res.body, 'title');
            assert.property(res.body, 'comments');
            assert.isArray(res.body.comments);
            done();
          });

      });

      suite('POST /api/books/[id] => add comment/expect book object with id', () => {
        //
        test('Test POST /api/books/[id] with comment', (done) =>  {
          chai.request(server)
            .post(`/api/books/${id}`)
            .send({
              comment: 'test book comment'
            })
            .end((err, res) => {
              assert.equal(res.status, 200);
              assert.equal(res.body._id, id);
              assert.property(res.body, '_id');
              assert.property(res.body, 'title');
              assert.property(res.body, 'comments');
              assert.isArray(res.body.comments);
              done();
            })
        });

      });

      suite('Delete /api/books/[id] => removes that book id from collection', () => {
        //
        test('Test delete /api/books/[id]', (done) =>  {
          chai.request(server)
            .delete(`/api/books/${id}`)
            .end((err, res) => {
              assert.equal(res.status, 200);
              assert.equal(res.text, 'delete successful');
              done();
            })
        });

      });

    });

  });
});
