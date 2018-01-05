let {SlackBot, SlackEvents, UserEvents} = require('./slack.bot');
let zorkWrapper = require('./zork.wrapper');
let config = require('./config');

var zorkInstance = new zorkWrapper(config.zorkOptions);
var slackBot = new SlackBot(config.botOptions);
let logInfo = function(){
  if(!config.debug){return;}
  if(console){
    console.log( Array.prototype.slice.call(arguments) );
  }
};
var slackActions = {};

slackActions[SlackEvents.START] = (data) =>{
  console.log('Connected to Slack.');  
};

slackActions[SlackEvents.MESSAGE] = (data) =>{
  console.log(SlackEvents.MESSAGE+' >> ', data, "\n#############");  
  if(data.isCommand){
    var command = data.text.substring(1);
    zorkInstance.writeToProcess(command);
  }
};

slackActions[SlackEvents.OPEN] = (data) =>{
  console.log(SlackEvents.OPEN+'\n');  
};

slackActions[SlackEvents.CLOSE] = (data) =>{
  console.log(SlackEvents.CLOSE+'\n');  
};

slackActions[SlackEvents.ERROR] = (data) =>{
  console.log(SlackEvents.ERROR+'\n', data);  
};

var zorkActions = {};

zorkActions.gameOutput = (data)=>{
  console.log(data);
};

slackBot.start(slackActions);
zorkInstance.start(zorkActions);
