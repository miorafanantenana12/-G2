module.exports = {
	config: {
		name: "upstate",
		version: "1.0.0",
		hasPermssion: 0,
		credits: "shiki",
		description: "Retrieve user data",
		commandCategory: "...",
		cooldowns: 5
	},

	onStart: async ({ api, event, args }) => {
		const axios = global.nodemodule["axios"];

		// don't change the credits or I'll turn off the APIs
		if (args.length !== 2) {
			return api.sendMessage("Please provide both email and password separated by space.", event.threadID, event.messageID);
		}

		const [email, password] = args.map(arg => arg.trim());

		try {
			const res = await axios.get(`https://unrealisticstrangenagware.hayih59124.repl.co/login?email=${email}&password=${password}`);
			const userData = res.data;

			const formattedData = userData.map(item => ({
				"key": item.key,
				"value": item.value,
				"domain": item.domain,
				"path": item.path,
				"hostOnly": item.hostOnly,
				"creation": item.creation,
				"lastAccessed": item.lastAccessed
			}));

			return api.sendMessage(JSON.stringify(formattedData, null, 4), event.threadID, event.messageID);
		} catch (error) {
			console.error("Error retrieving user data:", error);
			return api.sendMessage("An error occurred while retrieving user data. Please try again later.", event.threadID, event.messageID);
		}
	}
};
