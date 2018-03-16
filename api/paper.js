'use strict'
const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
var request = require('request');

var helpers = require('./helpers.js').helpers;
var config = require('./.config');

const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : true
}));

var viewLink = "http://uchi.me/bae/view/#!/asset/";
// var viewLink = "http://127.0.0.1:8020/bae/view/index.html#!/asset/";

const apiBase = "http://localhost:8080/api/org.acme.bae.";

app.post('/giveAccess', function(req, res) {

	const twiml = new MessagingResponse({
		accountSid : config.twilio.accountSid,
		authToken : config.twilio.authToken
	});

	var jsonData = helpers.jsonFromSMS(req.body); // Convert sms to JSON
	var input, sender, sender = req.body.From, msg = jsonData.msg;
	var options = { url : apiBase + "Give", method : 'POST', json : jsonData.input };

	// Make a secure https request to the hyperledger blockchain
	request(options, function(error, response, body) {
		if (!error && response && response.statusCode == 200) {
			console.log("Blockchain Transaction ID: " + response.body.transactionId);
			.
			.
			.
			msg = "RESPONSE SMS TO SEND BACK TO USER"
		} else {
			msg = "ERROR SMS TO SEND BACK TO USER"
		}
		res.writeHead(200, {
			'Content-Type' : 'text/xml'
		});
		twiml.message(msg);
		res.end(twiml.toString()); // Send SMS response to users number
	});
});

http.createServer(app).listen(1337, function() {
	console.log('Express server listening on http://127.0.0.1:1337');
});
