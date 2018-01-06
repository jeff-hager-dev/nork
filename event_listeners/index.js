
module.exports = function(zorkInterface, botInterface, logger){
    return {
        slackListeners: require('./slack.listeners')(zorkInterface, logger),
        zorkListeners: require('./zork.listeners')(botInterface, logger)
    }
};
