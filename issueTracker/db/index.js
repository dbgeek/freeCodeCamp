const mongoose = require('mongoose');
const config = require('../config');

const uri = config.MONGO_URI;

mongoose.connect(uri, {
	user: config.MONGO_USER,
	pass: config.MONGO_PASS,
	dbName: config.MONGO_DBNAME,
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
	serverSelectionTimeoutMS: 5000
}).then( () => {
    console.log('Connection to the mongodb is successful!')
  })
  .catch( (err) => console.error(err));

const { connection: db } = mongoose;

db.on('connected', () => {
	console.log('Database connected');
});

db.on('disconnected', () => {
	console.log('Database disconnected');
});

db.on('error', err => {
	console.error(err);
});

module.exports = db;