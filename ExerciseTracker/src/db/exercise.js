const mongoose = require('mongoose');
const shortid = require('shortid');

const ExerciseSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        maxlength: [20, 'description too long']
    },
    duration: {
        type: Number,
        required: true,
        min: [1, 'duration too short']
    },
    date: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: String,
        ref: 'Users',
        index: true
    },
    _id: {
		type: String,
		index: true,
		default: shortid.generate
	}
})

ExerciseSchema.pre('create', (next) => {
    mongoose.model('user').findById(this.userId, (err, user) => {
      if(err) return next(err)
      if(!user) {
        const err = new Error('unknown userId')
        err.status = 400
        return next(err)
      }
      this.username = user.username
      if(!this.date) {
        this.date = Date.now()
      }
      next();
    })
  })

  const exerciseModel = mongoose.model('exercise', ExerciseSchema);
  module.exports = exerciseModel;