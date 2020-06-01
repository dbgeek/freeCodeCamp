const mongoose = require('mongoose');
const shortid = require('shortid');


const IssueSchema = new mongoose.Schema({
    issue_title: {
        type: String,
        required: true,
    },
    project: {
        type: String,
        required: true,
    },
    issue_text: {
        type: String,
        required: true,
    },
    created_by: {
        type: String,
        required: true,
    },
    assigned_to: {
        type: String,
        default: ''
    },
    status_text: {
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
        default: shortid.generate
    }
})

const issueModel = mongoose.model('issue', IssueSchema);
module.exports = issueModel;