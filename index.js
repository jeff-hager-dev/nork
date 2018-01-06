let { SlackBot } = require('./slack_wrapper');
let ZorkWrapper = require('./zork_wrapper');
let config = require('./config');
let Logger = require('./logger');
let EventListners = require('./event_listeners');

let logger = new Logger(config);
let zorkInterface = new ZorkWrapper(config.zorkOptions);
let slackInterface = new SlackBot(config.botOptions);
let eventListners = EventListners(zorkInterface, slackInterface, logger);

slackInterface.start(eventListners.slackListeners, ()=>{
  logger.info('testing');
  zorkInterface.start(eventListners.zorkListeners);
});
