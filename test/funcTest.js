var Feedback = require('../models/models').Feedback;
var should = require('should'); 
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
//mockgoose(mongoose);
 var gen_token;
describe('Routing', function() {
  var url = 'http://localhost:3000';
  mongoose.connect('mongodb://localhost/epoiseDB');
  describe('Model Testing', function(){
	  it('find should return objects', function(done){
		  Feedback.find({},function(err,result){
			  should.not.exist(err);
			  done();
		  })
	  });
  });
  
  describe('Feedback', function() {
  
	it('Html page should be rendered when no parameters are sent with status code 200', function(done){
	
	request(url)
		.get('/feedback')
		.expect(200) //Status code
		.end(function(err,res) {
			console.log(res);
			if (err) {
				throw err;
			}
			done();
		});
	});
	
	it('Html should be rendered with status code 200 on sending parameters', function(done){
	
	request(url)
		.get('/feedback?orgName="Epoise"')
		.expect(200) //Status code
		.end(function(err,res) {
			if (err) {
				throw err;
			}
			
			done();
		});
	});
	
	it('Html should be rendered with status code 200 clicking any of page number', function(done){
	
	request(url)
		.get('/feedback?page=2')
		.expect(200) //Status code
		.end(function(err,res) {
			if (err) {
				throw err;
			}
			
			done();
		});
	});
	
	
  });    
  
  describe('Analytics', function() {
  
	it('On going to Analytics html should be rendered with status 200', function(done){
	request(url)
		.get('/analytics')
		.expect(200) //Status code
		.end(function(err,res) {
			if (err) {
				throw err;
			}
			done();
		});
	});
	
	it('On going to Analytics with parameters html should be rendered with status 200', function(done){
	request(url)
		.get('/analytics?orgName="Appple"')
		.expect(200) //Status code
		.end(function(err,res) {
			if (err) {
				throw err;
			}
			done();
		});
	});
	
  }); 
});