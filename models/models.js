var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var feedbackSchema = new Schema({
		time:Date,
        orgName:String,
        interviewName:String,
        candidateName:String,
        easyForMe:Number,
        flexibility:Number,
        overallExperience:Number,
        feedbackDescription:String
});

var feedback = mongoose.model('feedback', feedbackSchema);
module.exports = {
  Feedback : feedback
};
