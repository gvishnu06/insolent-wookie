var express = require('express');
var router = express.Router();
var Feedback = require('../models/models').Feedback;
var async = require('async');
router.get('/', function(req, res) {
	var orgName= "";
	var interName="";
	var query = {};
	if(req.query.orgName){
		query.orgName = req.query.orgName;
		orgName= req.query.orgName;
	}
	if(req.query.interviewName){
		query.interviewName = req.query.interviewName;
		interName = req.query.intName;
	}
	console.log(query);
	var pageno = 1;
	if(req.query.page){
		pageno = parseInt(req.query.page);
	}
	
	Feedback.aggregate({$match : query},{$group : {_id : {orgName : '$orgName', interviewName : '$interviewName'},
						easyForMe : {$avg : '$easyForMe'},
						flexibility : {$avg : '$flexibility'},
						overallExperience : {$avg : '$overallExperience'}}}, function(err,result){
							if(err){
								console.log(err);
							}
							if(result){
								console.log(result);
								Feedback.aggregate({$group : {_id : {orgName : '$orgName'}, intName : {$addToSet : '$interviewName'}}},function(err,doc){
									if(err){
										console.log(err);
									}
									if(doc){
										//console.log(doc + "333333333333333  "+ result.length/10);
										res.render('feedback', {populate_json : JSON.stringify(doc),result : result.slice((pageno-1)*10,(pageno-1)*10+10), orgName:orgName,interName:interName, totalPages : result.length/10, populate : doc});
									}
								});
								
							}
	})
});


module.exports = router;
