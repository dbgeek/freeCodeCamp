const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    title: {
        type: String,
        index: true,
        require: true,
    },
    comments: [
        {
            type: String
        }
    ]
});

const bookModule = mongoose.model('book', BookSchema);
module.exports = bookModule;
