module.exports = {
    config: {
        name: "changepseudo",
        version: "1.0.0",
        credits: "Bruno",
        hasPermssion: 1,
        description: "Change the bot's nickname in a Facebook group",
        usage: "changepseudo [newNickname]",
        commandCategory: "system",
        cooldowns: 0
    },

    onStart: async ({ api, event, Threads, args }) => {
        const newNickname = args.join(" ");
        if (!newNickname) {
            return api.sendMessage("⚠️ Please provide a new nickname for the bot.", event.threadID);
        }
        
        try {
            await api.changeNickname(newNickname, event.threadID, global.config.userID);
            return api.sendMessage(`✅ Successfully changed the bot's nickname to "${newNickname}"!`, event.threadID);
        } catch (error) {
            return api.sendMessage("❌ Failed to change the bot's nickname. Please try again later.", event.threadID);
        }
    }
