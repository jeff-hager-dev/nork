let {SlackBot, SlackEvents, UserEvents} = require('./slack.bot');
let ZorkWrapper = require('./zork.wrapper');
let config = require('./config');
let Logger = require('./logger');

var logger = new Logger(config);
var zorkInstance = new ZorkWrapper(config.zorkOptions);
var slackBot = new SlackBot(config.botOptions);

//==================================================
// Setting up the actions for the slack bot
//==================================================
var slackActions = {};

slackActions[SlackEvents.START] = (data) =>{
  logger.info('Connected to Slack.');  
};

slackActions[SlackEvents.MESSAGE] = (data) =>{
  logger.info(SlackEvents.MESSAGE+' >> ', data, "\n#############");  
  if(data.isCommand){
    var command = data.text.substring(1);
    zorkInstance.writeToProcess(command);
  }
};

slackActions[SlackEvents.OPEN] = (data) =>{
  logger.info(SlackEvents.OPEN+'\n');  
};

slackActions[SlackEvents.CLOSE] = (data) =>{
  logger.info(SlackEvents.CLOSE+'\n');  
};

slackActions[SlackEvents.ERROR] = (data) =>{
  logger.info(SlackEvents.ERROR+'\n', data);  
};

//==================================================
// Setting up the actions for the zork wrapper
//==================================================
var zorkActions = {};
zorkActions.gameOutput = (data)=>{
  logger.info(data);
};

zorkActions.gameError = (data)=>{
  logger.error(data);
}

zorkActions.onStart = (data) => {
  logger.info(`Game PID ${data}`);
};

//==================================================
// Starting everything up
//==================================================
slackBot.start(slackActions);
zorkInstance.start(zorkActions);
