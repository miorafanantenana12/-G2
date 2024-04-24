const axios = require('axios');

const prefixes = ['llama'];

module.exports = {
  config: {
    name: 'llama',
    aliases: [],
    version: '1.0',
    author: 'August Quinn/Jhon Talamera',
    role: 0,
    category: 'fun',
    shortDescription: {
      en: 'Summon the llama spirit for quirky responses.',
    },
    longDescription: {
      en: 'Invoke the llama spirit to provide quirky and humorous responses to your questions.',
    },
    guide: {
      en: '/llama [prompt]',
    },
  },
  onStart: async function () {
    console.log('Llama command is ready.');
  },
  onChat: async function ({ api, event, args, message }) {
    const [prefix, ...prompt] = args;

    if (prefix.toLowerCase() === 'llama') {
      try {
        if (prompt.length === 0) {
          return api.sendMessage('Please provide a prompt for the llama.', event.threadID, event.messageID);
        }

        const apiUrl = `https://69070.replit.app/meta?prompt=${encodeURIComponent(prompt.join(' '))}`;

        // Make a GET request to the API for llama-like responses
        const response = await axios.get(apiUrl);

        if (response.status !== 200 || !response.data || !response.data.response) {
          throw new Error('Failed to generate llama-like response.');
        }

        const llamaResponse = response.data.response;

        const responseMessage = `🦙 𝗟𝗟𝗔𝗠𝗔 𝗥𝗘𝗦𝗣𝗢𝗡𝗦𝗘:\\${llamaResponse}`;

        // Reply with the llama response
        await api.sendMessage(responseMessage, event.threadID, event.messageID);

        console.log('Llama-like response generated successfully.');
      } catch (error) {
        console.error(`Failed to generate llama-like response: ${error.message}`);
        api.sendMessage(
          `An error occurred: ${error.message}. Please check your input and try again.`,
          event.threadID
        );
      }
    }
  },
};
