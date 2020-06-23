/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
const bookModel = require('../db/book');

module.exports = function (app) {

  app.route('/api/books')
    .get((req, res) => {
      bookModel.find((err, docs) => {
        const result = docs.map((el) => {
          return {
            _id: el._id,
            title: el.title,
            commentcount: el.comments.length
          }
        });
        res.json(result);
      });
    })

    .post((req, res) => {
      var title = req.body.title;
      if (title) {
        bookModel.create({
          title: title
        })
          .then((storedBook) => {
            res.json({
              title: storedBook.title,
              _id: storedBook._id,
              comments: storedBook.comments
            })
          })
          .catch(err => res.send(err))
      }
      else {
        res.send('missing title');
      }
    })

    .delete((req, res) => {
      bookModel.remove({})
        .then(res.send('complete delete successful'))
    });

  app.route('/api/books/:id')
    .get((req, res) => {
      var bookid = req.params.id;
      bookModel.findById(bookid, (err, doc) => {
        if (err) {
          return res.send('no book exists');
        }
        return res.json({
          _id: doc._id,
          title: doc.title,
          comments: doc.comments
        });
      });
    })

    .post((req, res) => {
      var bookid = req.params.id;
      var comment = req.body.comment;
      bookModel.findByIdAndUpdate(bookid, { $push: { comments: comment } })
        .then((storedBook) => {
          return res.json({
            _id: storedBook._id,
            title: storedBook.title,
            comments: storedBook.comments
          });
        })
        .catch((err) => console.log(err));
    })

    .delete((req, res) => {
      var bookid = req.params.id;
      bookModel.deleteOne({ _id: bookid })
        .then(() => res.send('delete successful'))
        .catch(() => res.send('delete failed'))
    });

};
