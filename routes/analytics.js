var express = require('express');
var router = express.Router();
var Feedback = require('../models/models').Feedback;
var async = require('async');
router.get('/', function(req, res) {
	//var orgName = req.query.orgName;
	//var intName = req.query.intName;
	console.log('feedback');
	var pageno = 1;
	var org = 'TCS';
	if(req.query.orgName){
		org = req.query.orgName;
	}
	if(req.query.page){
		pageno = parseInt(req.query.page);
	}
	
	Feedback.aggregate( {$match : {orgName : org}},
						{$group : {_id : {orgName : '$orgName'},
						easyForMe : {$avg : '$easyForMe'},
						flexibility : {$avg : '$flexibility'},
						overallExperience : {$avg : '$overallExperience'}}}, function(err,result){
							if(err){
								console.log(err);
							}
							if(result){
								Feedback.aggregate({$group : {_id : {orgName : '$orgName'}}},function(err,doc){
									if(err){
										console.log(err);
									}
									if(doc){
										res.render('analytics', {result : result, totalPages : result.length/10, populate : doc, orgPage : org});
									}
								});
								
							}
	})
});


module.exports = router;
