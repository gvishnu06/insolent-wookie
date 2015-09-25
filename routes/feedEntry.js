var Feedback = require('../models/models').Feedback; 
var express = require('express');
var router = express.Router();
router.get('/', function(req, res) {

var orgArray = ['Infosys', 'Samsung', 'Nokia', 'Apple', 'HCL', 'TCS', 'Wipro','a','b','c','d','e','f','g','h','i','j'];
var interviewName = 'Interview';
var range = ['1','2','3','4','5'];

for( i = 1 ; i < 100 ; i++ ){
	var temp = '' + (i%17);
	feedbackEntry = new Feedback({
				time:Date.now(),
				orgName:orgArray[i%14],
				interviewName:interviewName +temp,
				candidateName:'Candidate '+i,
				easyForMe:parseInt(temp),
				flexibility:parseInt(temp),
				overallExperience:parseInt(temp),
				feedbackDescription:"desc"
	});
	feedbackEntry.save(function (err) {
				if (err){ 
					console.log(err);
				}
	});
}
});

module.exports = router;