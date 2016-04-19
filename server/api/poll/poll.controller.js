'use strict';

var _ = require('lodash');
var Poll = require('./poll.model');
require('mongoose-pagination');

function showPoll(id, res) {
  Poll.findById(id).populate('_branch').exec(function (err, poll) {
    if(err) { return handleError(res, err); }
    if(!poll) { return res.send(404); }
    return res.json(poll);
  });
}

// Get list of polls
exports.index = function(req, res) {
  Poll.find({deleted: false}).populate('_branch').paginate((req.query.page || 1), (req.query.perPage || 25), function (err, polls, total) {
    res.header('total_found', total);
    return res.json(polls);
  });
};

// Get list of polls available to a user
exports.user_polls = function(req, res) {
  // TODO: Add User Validation
  Poll.find({ deleted: false, $or: [{ national: true }, { _branch: req.query.branch } ] }).sort({closes: -1}).populate('_branch').paginate((req.query.page || 1), (req.query.perPage || 25), function (err, polls, total) {
    res.header('total_found', total);
    return res.json(polls);
  });
};

// Get polls with published results
exports.published_polls = function (req, res) {
  // TODO: Add User Validation
  Poll.find({ deleted: false, published: true, $or: [{ national: true }, { _branch: req.query.branch } ] }).sort({closes: -1}).populate('_branch').paginate((req.query.page || 1), (req.query.perPage || 25), function (err, polls, total) {
    res.header('total_found', total);
    return res.json(polls);
  });
};

// Get a single poll
exports.show = function(req, res) {
  return showPoll(req.params.id, res);
};

// Creates a new poll in the DB.
exports.create = function(req, res) {
  Poll.create(req.body, function(err, poll) {
    if(err) { return handleError(res, err); }
    return showPoll(poll._id, res);
  });
};

// Updates an existing poll in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  if (typeof req.body._branch != "string") { delete req.body._branch; }
  
  Poll.findById(req.params.id, function (err, poll) {
    if (err) { return handleError(res, err); }
    if(!poll) { return res.send(404); }
    var updated = _.merge(poll, req.body);
    updated.updatedBy = req.user;
    updated.updated = new Date();
    
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return showPoll(poll._id, res);
    });
  });
};

// Deletes a poll from the DB.
exports.destroy = function(req, res) {
  Poll.findById(req.params.id, function (err, poll) {
    if(err) { return handleError(res, err); }
    if(!poll) { return res.send(404); }
    poll.deleted = true;
    poll.updatedBy = req.user;
    poll.updated = new Date();
    
    poll.save(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}