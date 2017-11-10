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

const base = "http://localhost:8080/api/org.acme.bae.";

app.post('/submit', function(req, res) {

	const twiml = new MessagingResponse({
		accountSid : config.twilio.accountSid,
		authToken : config.twilio.authToken
	});

	var action = {};
	var input;
	var sender;
	var msg;

	if (req.body.Body != undefined) {
		var sender = req.body.From;
		var jsonResp = helpers.jsonFromSMS(req.body);
		action = {
			type : "sms",
			inputs : jsonResp.input
		};
		// input = jsonResp.input;
		msg = jsonResp.msg;
	} else {
		action = {
			type : "web",
			inputs : req.body
		};
		var sender = req.body.owner;
	}

	var options = {
		url : base + "Give",
		method : 'POST',
		json : action.inputs
	};

	// Start the request
	request(options, function(error, response, body) {
		if (!error && response && response.statusCode == 200) {
			console.log("\n\nTRANSACTION on: " + new Date());
			console.log("*******************************************************************************************************");
			console.log("*   Blockchain Transaction ID: " + response.body.transactionId);
			console.log("*   Transaction/Contract Executed: " + response.body["$class"]);
			console.log("*   Sender: " + action.inputs.owner);
			console.log("*   Preview: " + viewLink + response.body.transactionId + "/" + response.body.receiver + "/" + response.body.owner);
			if (action.type == "sms") {
				console.log("*   Sent From: " + action.inputs.lastDevice)
				msg = msg ? msg : "REQUEST STATUS:\n" + response.body.receiver + " was given access to " + response.body.description + "\n\nASSET ID:\n" + response.body.transactionId;
				res.writeHead(200, {
					'Content-Type' : 'text/xml'
				});
				twiml.message(msg);
				res.end(twiml.toString());
			} else {
				res.json({
					"status" : response.statusCode,
					"data" : response.body
				});
			}
		} else {
			res.json({
				"status" : response ? response.statusCode : response,
				"data" : response ? response.body : response
			});
		}
		console.log("*******************************************************************************************************\n");
	});
});

http.createServer(app).listen(1337, function() {
	console.log('Express server listening on http://127.0.0.1:1337');
});
