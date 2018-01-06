let { SlackEvents, UserEvents, MessageTypes } = require('../slack_wrapper');

module.exports = function(zorkInterface, logger){

  var eventListeners = {};

  eventListeners[SlackEvents.START] = (data) =>{
    logger.info('Connected to Slack.');  
  };

  let handleSlackMessages = (data) => {
    if(data.type === MessageTypes.HELLO){
      logger.info('Connected to slack');
    }

    if(data.type == MessageTypes.MESSAGE && data.isCommand)
    {
      var command = data.text.substring(1);
      zorkInterface.writeToProcess(command);
    }
  };

  eventListeners[SlackEvents.MESSAGE] = (data) =>{
    logger.info(`${SlackEvents.MESSAGE} type: ${data.type}`);  
    handleSlackMessages(data);
  };

  eventListeners[SlackEvents.OPEN] = (data) =>{
    logger.info(SlackEvents.OPEN+'\n');  
  };

  eventListeners[SlackEvents.CLOSE] = (data) =>{
    logger.info(SlackEvents.CLOSE+'\n');  
  };

  eventListeners[SlackEvents.ERROR] = (data) =>{
    logger.info(SlackEvents.ERROR+'\n', data);  
  };
  return eventListeners;
}