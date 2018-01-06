let userEvents = require('./user.events');
let slackEvents = require('./slack.events');
let messageTypes = require('./message.types');

var slackBot = function(options){
  let botOptions = options;
  let SlackBot = require('slackbots');

  let triggerUserEvent = (name, data) => {
    let userEvent = this.userEvents[name];
    if(userEvent){
      userEvent(data)
    }
  };

  let isCommand = (data) => {
    if(!data.text){ return false; }
    let msgText = data.text;
    return typeof msgText === 'string' && 
      msgText.startsWith(options.commandIndicator);
  };

  this.sendMessage = (message) => {
    if(!this.bot){ return; }
    this.bot.postMessageToChannel(options.channel, message, {});
  };

  this.start = (userEvents)=>{
    this.userEvents = userEvents;
    // create a bot
    let bot = new SlackBot({
      token: botOptions.token,
      name: botOptions.whoAmI
    });
    
     bot.on(slackEvents.START, () => {
      triggerUserEvent(slackEvents.START, null);

       bot.on(slackEvents.MESSAGE, (data) => {
        data.isCommand = isCommand(data);
        triggerUserEvent(slackEvents.MESSAGE, data);
      });
    });

    this.bot = bot;
  }
};
  
module.exports = slackBot;
