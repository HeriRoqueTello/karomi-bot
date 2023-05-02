const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({
	intents: [3276799],
});

// Log in to Discord with your client's token
client
	.login(token)
	.then(() => {
		console.log(`Bot ${client.user.tag} se ha iniciado`);
		client.user.setActivity(`Test`);
	})
	.catch((err) => console.log(err));
