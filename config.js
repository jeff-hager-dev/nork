module.exports = {
    debug: process.env.ZORK_BOT_DEBUG || false,
    zorkOptions:{
    },
    botOptions: {
        whoAmI: process.env.ZORK_BOT_NAME || "Zork",
        commandIndicator: process.env.ZORK_BOT_COMMAND_TOKEN ||"!",
        channel: process.env.ZORK_BOT_CHANNEL  || "zork",
        token: process.env.ZORK_BOT_TOKEN, // Add a bot https://my.slack.com/services/new/bot and put the token
    }
};
