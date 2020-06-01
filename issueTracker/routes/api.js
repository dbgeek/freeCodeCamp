/*
*
*
*       Complete the API routing below
*
*
*/
'use strict';

const expect = require('chai').expect;
const issueModel = require('../db/issue');

module.exports = function (app) {

  app.route('/api/issues/:project')

    .get(function (req, res) {
      const project = req.params.project;
      const { query } = req;

      const keys = Object.keys(query);
      const filters = {
        project: project
      };
      keys.forEach(el => {
        filters[el] = query[el];
      })
      issueModel.find(filters)
        .then((docs) => {

          const result = docs.map((el) => {
            return {
              _id: el._id,
              issue_title: el.issue_title,
              issue_text: el.issue_text,
              created_by: el.created_by,
              assigned_to: el.assigned_to,
              status_text: el.status_text,
              open: el.open,
              created_by: el.created_by,
              created_on: el.created_on,
              updated_on: el.updated_on,
              project: el.project
            }
          })
          res.send(result);
        })
    })

    .post(async (req, res, next) => {
      const project = req.params.project;
      const {
        issue_title, issue_text, created_by, assigned_to = '', status_text = '', open,
      } = req.body;
      try {
        const issue = {project: project, issue_title, issue_text, created_by, assigned_to, status_text };
        const savedIssue = await issueModel.create(issue);
        const response = {
          project: project,
          issue_title: savedIssue.issue_title,
          issue_text: savedIssue.issue_text,
          created_by: savedIssue.created_by,
          assigned_to: savedIssue.assigned_to,
          status_text: savedIssue.status_text,
          open: savedIssue.open,
          created_on: savedIssue.created_by,
          updated_on: savedIssue.updated_on,
          _id: savedIssue._id
        };
        res.json(response);
      } catch (error) {
        res.send('missing inputs');
      }
    })

    .put(function (req, res) {
      const project = req.params.project;
      if (Object.keys(req.body).length === 0) {
        return res.send('no updated field sent');
      }
      const {
        issue_title, issue_text, assigned_to, status_text, open, _id
      } = req.body;
      const updateIssue = {
        issue_title, issue_text, assigned_to, status_text, open, updated_on: new Date()
      }
      issueModel.updateOne({ _id: _id, project: project, }, updateIssue, { omitUndefined: true })
        .then((updateResponse) => {
          updateResponse.nModified === 0 ? res.send(`'could not update ${_id}.`) : res.send('successfully updated');
        })
        .catch((err) => console.log(`error: ${err}`));
    })

    .delete(function (req, res) {
      const project = req.params.project;
      const { _id} = req.body;
      if (_id === undefined) {
        return res.send('_id error');
      }
      issueModel.deleteOne({
        _id: _id,
        project: project
      }).then(
        res.send(`deleted ${_id}`)
      )
    })
};
