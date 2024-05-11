const axios = require('axios');

module.exports = {
  config: {
    name: 'cookies',
    version: '1.1.0',
    hasPermssion: 0,
    credits: 'Greegmon',
    description: 'Facebook cookie getter',
    usePrefix: false,
    allowPrefix: true,
    commandCategory: 'others',
    usages: '[username] | [password]',
    cooldowns: 5,
  },
  onStart: async function ({ api, event, args, box }) {
    const input = args.join(' ');
    const [u, p] = input.split('|').map(part => part.trim());

    if (!box) {
      return api.sendMessage(`Unsupported.`, event.threadID);
    }

    try {
      if (!input) {
        box.reply('Please provide a username & password');
        box.react('❓');
      } else {
        box.reply(`Fetching cookie...`);
        box.react('🕙');
        const res = await axios.get(`https://Greepi.onrender.com/cookie?username=${u}&password=${p}`);
        const cookie = res.data.response;
        box.react('🍪');
        return api.sendMessage(`🍪 COOKIE: ${cookie}`, event.threadID, event.messageID)
      }
    } catch (error) {
      box.reply('⚠️ Something went wrong: ' + error);
      box.react('⚠️');
    }
  }
};
