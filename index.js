let {SlackBot, SlackEvents, UserEvents, MessageTypes} = require('./slack.bot');
let ZorkWrapper = require('./zork.wrapper');
let config = require('./config');
let Logger = require('./logger');

var logger = new Logger(config);
var zorkInstance = new ZorkWrapper(config.zorkOptions);
var slackBot = new SlackBot(config.botOptions);

//==================================================
// Setting up the actions for the zork wrapper
//==================================================
var zorkActions = {};
zorkActions.gameOutput = (data)=>{
  logger.info('Game output', data);
  slackBot.sendMessage(data);
};

zorkActions.gameError = (data)=>{
  logger.error(data);
}

zorkActions.onStart = (data) => {
  logger.info(`Game PID ${data}`);
};

//==================================================
// Setting up the actions for the slack bot
//==================================================
var slackActions = {};

slackActions[SlackEvents.START] = (data) =>{
  logger.info('Connected to Slack.');  
};

let handleSlackMessages = (data) => {
  if(data.type === MessageTypes.HELLO){
    logger.info('Starting Zork Game');
    zorkInstance.start(zorkActions);
  }

  if(data.type == MessageTypes.MESSAGE && data.isCommand)
  {
    var command = data.text.substring(1);
    zorkInstance.writeToProcess(command);
  }
};

slackActions[SlackEvents.MESSAGE] = (data) =>{
  logger.info(`${SlackEvents.MESSAGE} type: ${data.type}`);  
  handleSlackMessages(data);
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
// Starting everything up
//==================================================
slackBot.start(slackActions);
