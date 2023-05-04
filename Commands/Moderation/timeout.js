const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
   .setName("timeout")
   .setDescription("Timeout a usuario del servidor.")
   .addUserOption((option) => option.setName(`target`).setDescription(`User timeout`).setRequired(true))
   .addIntegerOption((option) => option.setName(`tiempo`).setDescription(`Tiempo del timeout en minutos`).setRequired(true))
   .addStringOption((option) => option.setName(`razon`).setDescription(`Razon del timeout`))
   .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  /**
   * 
   * @param { ChatInputCommandInteraction } interaction 
   */

  async execute(interaction, client) {
    const user = interaction.options.getUser(`target`);
    const time = interaction.options.getInteger(`tiempo`);
    const { guild } = interaction;

    let razon = interaction.options.getString(`razon`);
    const member = await interaction.guild.members.fetch(user.id).catch(console.error);

    if (!razon) razon = "La razon es anonima";
    if (user.id === interaction.user.id) return interaction.reply({ content: `No puedes dar timeout a ti mismo`, ephemeral: true});
    if (user.id === client.user.id) return interaction.reply({ content: `No puedes dar timeout a ${client.user.tag}`, ephemeral: true });
    if (member.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({ content: `No puedes hacer timeout a alguien con permisos igual o superior al tuyo`, ephemeral: true});
    if (!member.kickable) return interaction.reply({ content: `No puedo dar timeout a usuarios con mas poder que el mio`, ephemeral: true});
    if (time > 10000) return interaction.reply({ content: `El tiempo no debe exceder los 10000 minutos`, ephemeral: true});

    const embed = new EmbedBuilder()
      .setAuthor({ name: `${guild.name}`, iconURL: `${guild.iconURL({dynamic: true}) || "https://media.discordapp.net/attachments/1061470285456478229/1103485521319174264/iconalt.png?width=410&height=616"}` })
      .setTitle(`${user.tag} tiene timeout en el servidor`)
      .setColor(`#ff0000`)
      .setTimestamp()
      .setThumbnail(`${user.displayAvatarURL({dynamic: true})}`)
      .addFields({ name: `Razon`, value: `${razon}`, inline: true }, { name: `Tiempo`, value: `${time}`, inline: true});

      await member.timeout(time * 60 * 1000, razon).catch(console.error);

      interaction.reply({ embeds: [embed] });
  },
};