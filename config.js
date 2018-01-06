module.exports = {
    debug: process.env.ZORK_BOT_TOKEN || false,
    zorkOptions:{
    },
    botOptions: {
        whoAmI: process.env.ZORK_BOT_NAME || "Zork",
        commandIndicator: process.env.ZORK_BOT_COMMAND_TOKEN ||"!",
        slackChannel: process.env.ZORK_BOT_CHANNEL  || "zork",
        token: process.env.ZORK_BOT_TOKEN, // Add a bot https://my.slack.com/services/new/bot and put the token
    }
};