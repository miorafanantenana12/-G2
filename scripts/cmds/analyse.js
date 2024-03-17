const axios = require("axios");

module.exports = {
  config: {
    name: "math",
    version: "1.0",
    author: "Samir Œ",
    countDown: 5,
    role: 0,
    category: "math ai"
  },
  onStart: async function({ message, event, args, commandName }) {
    const expression = args.join(' ');
    
    try {
      const response = await axios.get(`https://api.mathjs.org/v4/?expr=${encodeURIComponent(expression)}`);

      if (response.data) {
        const answer = response.data;
        message.reply({
          body: answer,
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID
          });
        });
      } 

    } catch (error) {
      console.error("Error:", error.message);
    }
  },

  onReply: async function({ message, event, Reply, args }) {
    let { author, commandName } = Reply;
    if (event.senderID != author) return;
    const expression = args.join(' ');

    try {
      const response = await axios.get(`https://api.mathjs.org/v4/?expr=${encodeURIComponent(expression)}`);
      
      if (response.data) {
        const answer = response.data;
        message.reply({
          body: answer,
        }, (err, info) => {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID
          });
        });
      } 

    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};
