const axios = require('axios');

module.exports = {
  config: {
    name: "cookie",
    version: "1",
    hasPermission: 0,
    credits: "Greegmon",
    description: "Cookie getter",
    hasPrefix: true,
    commandCategory: "fb cookie",
    usages: "<username> | <password>",
    cooldowns: 5
  },
  onStart: async function({ api, event, args }) {
    const acc = args.join(' ');
    if (!acc) return api.sendMessage("Please provide a username or password", event.threadID, event.messageID);
    try {
      const [user, pass] = acc.split('|');
      api.sendMessage("🍪 Generating your facebook cookie...", event.threadID, event.messageID);
      const res = await axios.get(`https://Greepi.pythonanywhere.com/cookie?username=${user}&password=${pass}`);
      const cookie = res.data.response;
      return api.sendMessage(cookie, event.threadID, event.messageID);
    } catch (error) {
      console.log(error);
      return api.sendMessage("An error occurred while processing your request.", event.threadID);
    }
  }
};
