
module.exports = function(slackInterface, logger){
  let eventListeners = {};
  
  eventListeners.gameOutput = (data) =>{
    logger.info('Game output', data);
    slackInterface.sendMessage(data);
  };

  eventListeners.gameError = (data)=>{
    logger.error(data);
  }

  eventListeners.onStart = (data) => {
    logger.info(`Game PID ${data}`);
  };

  return eventListeners;
};
