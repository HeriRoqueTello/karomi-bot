const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const { token } = require('./config.json');
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;


// Create a new client instance
const client = new Client({ 
  intents: [Guilds, GuildMembers, GuildMessages],
  Partials: [User, Message, GuildMember, ThreadMember] 
});

const { loadEvents } = require("./Handlers/eventHandler");

client.events = new Collection();
client.commands = new Collection();

loadEvents(client);

// Log in to Discord with your client's token
client.login(token);

// .then(() => {
// 	console.log(`Bot ${client.user.tag} se ha iniciado`);
// 	client.user.setActivity(``)
// })
// .catch((err) => console.log(err));