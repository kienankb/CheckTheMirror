# CheckTheMirror
Have Alexa tell you how you've been doing based on the positivity/negativity of your recent tweets.

My favorite comment on the nature of mirrors and humans is that we don't just look at ourselves in them to ensure we look presentable; in some sense, we look at ourselves in mirrors just to make sure we're still there.  Unfortunately, I don't remember who voiced that idea, but I'm happy to try and keep it alive.  CheckTheMirror is an Alexa Voice Skill that performs a sentiment analysis on your most recent tweets and lets you know how you're doing--be thee positive as of late or negative.

So next time you're in a rush, throwing on your tie or combing snarls out of your hair, when you stop to look at yourself in the mirror for that brief but telling moment--that moment where, if but for the only time that day, you're sure that you *exist*--say aloud, "Alexa, ask the mirror how I've been lately" and listen for some insight into your recent Twitter history that you may not have even consciously recognized.

## Installation/Setup
You'll need to set up a Twitter application to give the voice skill access to your tweets.  Once completed, clone the repository and run `npm install`; this will download and install the `twitter` and `sentiment-analysis` dependencies.  Create an AWS Lambda function and Alexa Voice Skill, and fill in the AWS app ID and Twitter keys in `index.js`.  Zip together `index.js`, `AlexaSkill.js`, and `node_modules` so that all three are in the root of the zip, then upload it as the code to the AWS Lambda function.

I realize these installation directions are somewhat vague, but this is a project for HackRPI Fall 2015, so I'm not going for any completeness awards.

And let's face it, art is supposed to be vague, right?  I say "art" because god knows this project has little to no practical value.
