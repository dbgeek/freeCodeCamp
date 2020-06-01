const mongoose = require('mongoose');
const shortid = require('shortid');


const IssueSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    createdBy: {
        type: String,
        required: true,
    },
    assignedTo: {
        type: String,
        default: ''
    },
    statusText: {
        type: String,
        default: ''
    },
    created_on: {
        type: Date,
        default: Date.now
    },
    updated_on: {
        type: Date,
        default: Date.now
    },
    open: {
        type: Boolean,
        default: true
    },
    _id: {
        type: String,
        //index: true,
        default: shortid.generate
    }
})
//created_on(date/time), updated_on(date/time), open
const issueModel = mongoose.model('issue', IssueSchema);
module.exports = issueModel;