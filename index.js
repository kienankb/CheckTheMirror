/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, tell Greeter to say hello"
 *  Alexa: "Hello World!"
 */

/**
 * App ID for the skill
 */
var APP_ID = 'INSERT YO APP ID HERE, YO'; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');
var Twitter = require('twitter');
var sentimentAnalysis = require('sentiment-analysis');

/**
 * HelloWorld is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var GetSentiment = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
GetSentiment.prototype = Object.create(AlexaSkill.prototype);
GetSentiment.prototype.constructor = GetSentiment;

GetSentiment.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("GetSentiment onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

GetSentiment.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("GetSentiment onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    var speechOutput = "You can ask you you're doing.";
	var repromptText = "Or not?";
    response.ask(speechOutput, repromptText);
};

GetSentiment.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("GetSentiment onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

GetSentiment.prototype.intentHandlers = {
    // register custom intent handlers
    "GetSentimentIntent": function (intent, session, response) {
		var client = new Twitter({
			consumer_key: 'INSERT CONSUMER KEY HERE',
			consumer_secret: 'INSERT CONSUMER SECRET HERE',
			access_token_key: 'INSERT TOKEN KEY HERE',
			access_token_secret: 'INSERT TOKEN SECRET HERE'
		});
		client.get('statuses/user_timeline', {count:40, include_rts:false}, function(error, tweets, tweetresponse) {
			var generalSentiment = 0.0;
			var numTweets = 0;
			for (i = 0; i < tweets.length; i++) {
				generalSentiment += sentimentAnalysis(tweets[i].text);
				numTweets += 1;
			};
			generalSentiment = generalSentiment/numTweets;
			var text = "";
			if (generalSentiment >= 0.8) {
				text = "You are happiness incarnate. Good on you.";
			}
			else if (generalSentiment >= 0.5 && generalSentiment < 0.8) {
				text = "You seem like you're doing pretty alright.";
			}
			else if (generalSentiment >= 0.2 && generalSentiment < 0.5) {
				text = "You've had worse weeks.";
			}
			else if (generalSentiment >= -0.2 && generalSentiment < 0.2) {
				text = "You're about as neutral as milk.";
			}
			else if (generalSentiment >= -0.5 && generalSentiment < -0.2) {
				text = "Hang in there, things will get better.";
			}
			else if (generalSentiment >= -0.8 && generalSentiment < -0.5) {
				text = "Things seem pretty bad, maybe go hang with some friends.";
			}
			else {
				text = "You need to go watch some videos of puppies.  Right.  Now.";
			}
			response.tellWithCard(text, "How are you?", text);
		});
    }
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the HelloWorld skill.
    var getSentiment = new GetSentiment();
    getSentiment.execute(event, context);
};
