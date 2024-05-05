const axios = require('axios');


module.exports = {

config: {

  name: 'snowflake',

  version: '1.0.1',

  role: 0,

 aliases: ['snow'],

author: 'waitzkin | churchill',//convert kaizenji

  countDown: 5,

  longDescription: { en: "An AI command powered by Snowflakes AI"},

  guide: { en: "snowflakes [prompt]",

},

},


onStart: async function({ api, event, args }) {

  const input = args.join(' ');

  

  if (!input) {

    api.sendMessage(`❄️ | Snowflake Ai is here! Please provide some questions.`, event.threadID, event.messageID);

    return;

  }

  

  api.sendMessage(`❄️ | Snowflake is searching please wait...`, event.threadID, event.messageID);

  

  try {

    const { data }  = await axios.get(`https://hashier-api-snowflake.vercel.app/api/snowflake?ask=${encodeURIComponent(input)}`);

    if (data.response) {

      api.sendMessage(data.response + "\n\n❄️ | Snowflake", event.threadID, event.messageID);


    } else {

      api.sendMessage('No response found.', event.threadID, event.messageID);

    }

  } catch (error) {

    api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);

  }

}

};
