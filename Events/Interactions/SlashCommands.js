const { ChatInputCommandInteraction } = require('discord.js');

module.exports = {
  name: "interactionCreate",
  /**
   * 
   * @param {ChatInputCommandInteraction} interaction 
   */
  execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command)
      return interaction.reply({
        content: "This command is outdated",
        ephemeral: true,
      });

    if (command.developer && interaction.user.id !== "181543464830369792")
      return interaction.reply({
        content: "Este comando es solo para el desarrollador.",
        ephemeral: true,
      });

    command.execute(interaction, client);
  },
};