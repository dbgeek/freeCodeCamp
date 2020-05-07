'use strict';

var express = require('express');
var cors = require('cors');
const multer = require('multer');

let upload = multer({ dest: 'uploads/' })

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next) => {
  const { size, filename, mimetype } = req.file;

  res.json({
    name: filename,
    type: mimetype,
    size: size
  })
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
