module.exports = {
    debug: false,
    zorkOptions:{
    },
    botOptions: {
        whoAmI: "Zork",
        commandIndicator: "!",
        slackChannel: "zork",
        slackUrl: "https://hagerdev.slack.com",
        token: process.env.ZORK_BOT_TOKEN, // Add a bot https://my.slack.com/services/new/bot and put the token
    }
};