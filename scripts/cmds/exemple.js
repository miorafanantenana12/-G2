// Template for cmd that is 75% compatible to both goat and mirai
// NO NEED CONVERT UNLESS MISSING DEPENDENCY

async function reply(form, callback) {
    api.sendMessage(form, event.threadID, event.messageID, callback);
}
async function react(emoji) {
    api.setMessageReaction(emoji, event.messageID, () => {}, true);
}
const message = {
    reaction: react,
    reply,
}

module.exports = {
    config: {
        name: "example",
        aliases: ["alias1", "alias2"], // Goat 
        version: "1.0",
        hasPermission: 2, // Mirai
        role: 0, // Goat
        author: "Your name", // Goat
        credits: "Your name", // Mirai
        description: "Your description", // Mirai
        shortDescription: "Your description", // Goat
        longDescription: "Your description", // Goat
        hasPrefix: true, // Botpack
        category: "Your category", // Goat
        commandCategory: "Your category", // Mirai
        usages: "Your usages", // Mirai
        guide: "Your usages", // Goat
        cooldowns: 5, // Mirai
        countDown: 5, // Goat
    },
    onMAIN: async ({ api, event }) => {
        // This is your main function
        api.sendMessage('Hi', event.threadID, event.messageID);
    },
    onStart: async (context) => {
        await module.exports.onMAIN(context); // From goat
    },
    run: async (context) => {
        await module.exports.onMAIN(context); // From mirai
    },
    onChat: async (context) => { 
        // From goat
        // Code for noprefix
    }, 
    handleEvent: async (context) => {
        // From mirai
        await module.exports.onChat(context);
    },
};
