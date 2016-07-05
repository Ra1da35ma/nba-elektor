'use strict';

var express = require('express');
var controller = require('./votersReg.controller');
var router = express.Router();
var sessionSec = require('../../components/tools/sessionSec');


router.get('/getUpdate', controller.getUpdatedBranches);
router.get('/getCount', controller.getCount);
router.get('/me', controller.getMe);
// router.get('/send',controller.send);
router.post('/getConfirmed',controller.getConfirmed);
router.post('/', controller.index);
router.post('/details', controller.details);
router.post('/search', controller.searchDetails);
router.post('/save', controller.update);

//APIs after this line will require  session to work
router.use(sessionSec);

router.post('/create', controller.create);
router.post('/branchMembers', controller.branchMembers);
router.post('/checkVotersName', controller.checkVotersName);
router.post('/removeVoters', controller.removeVoters);


module.exports = router;
