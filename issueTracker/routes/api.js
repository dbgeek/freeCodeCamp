/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
const issueModel = require('../db/issue');

module.exports = function (app) {

  app.route('/api/issues/:project')

    .get(function (req, res) {
      var project = req.params.project;
      const { query } = req;
      const restToDB = {
        issue_title: 'title',
        issue_text: 'text', created_by: 'createdBy', assigned_to: 'assignedTo', status_text: 'statusText', open: 'open'
      }
      const dbToRest = {
        title: 'issue_title',
        test: 'issue_text',
        createdBy: 'created_by',
        assignedTo: 'assigned_to',
        statusText: 'status_text'
      }
      const keys = Object.keys(query);
      const filters = {};
      keys.forEach( el => {
        filters[restToDB[el]] = query[el];
      })
      issueModel.find(filters)
      .then( (docs) => {

        const result = docs.map( (el) => {
          return {
            _id: el._id,
            issue_title: el.title,
            issue_text: el.text,
            created_by: el.createdBy,
            assigned_to: el.assignedTo,
            status_text: el.statusText,
            open: el.open ,
            created_by: el.createdBy,
            created_on: el.created_on,
            updated_on: el.updated_on
          }
        })
        res.send(result);
      })
    })
    .post(async (req, res, next) => {
      var project = req.params.project;
      const {
        issue_title: title, issue_text: text, created_by: createdBy, assigned_to: assignedTo = '', status_text: statusText = '', open,
      } = req.body;
      try {
        const issue = { title, text, createdBy, assignedTo, statusText };
        const savedIssue = await issueModel.create(issue);
        const {
          title: issue_title,
          text: issue_text,
          createdBy: created_by,
          assignedTo: assigned_to,
          statusText: status_text,
          open: savedOpen,
          created_on,
          updated_on,
          _id: saveID,
        } = savedIssue;
        const response = {
          issue_title, issue_text, created_by, assigned_to, status_text, open: savedOpen, created_on, updated_on, _id: saveID
        };
        res.json(response);
      } catch (error) {
        res.send('missing inputs');
      }
    })

    .put(function (req, res) {
      var project = req.params.project;
      if (Object.keys(req.body).length === 0) {
        return res.send('no updated field sent');
      }
      const {
        issue_title: title, issue_text: text, created_by: createdBy, assigned_to: assignedTo, status_text: statusText, open, _id
      } = req.body;
      const updateIssue = {
        title, text, assignedTo, statusText, open, updated_on: new Date()
      }
      issueModel.updateOne({ _id: _id }, updateIssue, { omitUndefined: true })
        .then((updateResponse) => {
          updateResponse.nModified === 0 ? res.send(`'could not update ${_id}.`) : res.send('successfully updated');
        })
        .catch((err) => console.log(`error: ${err}`));
    })

    .delete(function (req, res) {
      var project = req.params.project;
      const { _id } = req.body;
      if (_id === undefined) {
        return res.send('_id error');
      }
      issueModel.deleteOne({
        _id: _id
      }).then(
        res.send(`deleted ${_id}`)
      )
    })

};
