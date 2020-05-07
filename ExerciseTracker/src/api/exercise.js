const userModel = require('../db/user')
const exerciseModel = require('../db/exercise')

const router = require('express').Router()

router.post('/new-user', async (req, res, next) => {
    try {
        const savedUser = await userModel.create(req.body);
        res.json({
            username: savedUser.username,
            _id: savedUser._id
        })
    } catch (error) {
        next(error);
    }

})

router.post('/add', async (req, res, next) => {
    const { userId, description, duration, date } = req.body;
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return next({
                status: 400,
                message: 'unknown user _id'
            })
        }
        const exercise = {
            userId: userId,
            duration: duration,
            description: description,
            date, date
        }
        const savedExercise = await exerciseModel.create(exercise);
        savedExercise.date = (new Date(savedExercise.date)).toDateString();
        res.json({
            username: user.username,
            duration: savedExercise.duration,
            description: savedExercise.description,
            date: new Date(savedExercise.date).toDateString()
        });
    } catch (error) {
        next(error);
    }
})

router.get('/users', async (req, res, next) => {
    const users = await userModel.find({}, {
        __v: 0
    });
    res.json(users);
})

router.get('/log', async (req, res, next) => {
    const { userId, from, to, limit } = req.query;
    const fromDate = new Date(from);
    const toDate = new Date(to);
    console.log("userId: ", userId, " from: ", from, " to: ", to, " limit:", limit);
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return next({
                status: 400,
                message: 'unknown user _id'
            })
        }
        await exerciseModel.find({
            userId: userId,
            date: {
                $lt: toDate != 'Invalid Date' ? toDate.getTime() : Date.now(),
                $gt: fromDate != 'Invalid Date' ? fromDate.getTime() : 0
            }
        }, {
            __v: 0,
            _id: 0
        })
            .sort('-date')
            .limit(parseInt(limit))
            .exec((err, exercises) => {
                if (err) return next(err);
                const outObj = {
                    _id: userId,
                    username: user.username,
                    from: fromDate != 'Invalid Date' ? fromDate.toDateString() : undefined,
                    to: toDate != 'Invalid Date' ? toDate.toDateString() : undefined,
                    count: exercises.length,
                    log: exercises.map(e => ({
                        description: e.description,
                        duration: e.duration,
                        date: e.date.toDateString()
                    }))
                }
                res.json(outObj);
            });
    } catch (error) {
        next(error);
    }
})

module.exports = router