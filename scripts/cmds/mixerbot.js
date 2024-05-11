const axios = require("axios");

module.exports = {
  config: {
    name: "box",
    version: "9.0.1",
    description: "chat with blackbox api",
    hasPermssion: 0,
    commandCategory: "chatgpt",
    usages: "box <ask>",
    cooldowns: 0,
  },
  onStart: async function ({ api, event, args }) {
    try {
      const ask = args.join(" ");
      if (!ask) {
        return api.sendMessage(`/box <ask>`, event.threadID, event.messageID);
      }

      const response = await axios.get(`https://boxgptapi.replit.app/api/chatgpt?msg=${encodeURIComponent(ask)}`);
      const t = response.data.message;
      api.sendMessage(t, event.threadID, event.messageID);
    } catch (error) {
      api.sendMessage(`Error fetching blackbox API`, event.threadID, event.messageID);
      console.log(error);
    }
  }
};
