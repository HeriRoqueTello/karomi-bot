const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
   .setName("ban")
   .setDescription("Banear usuario del servidor.")
   .addUserOption((option) => option.setName(`target`).setDescription(`User ban`).setRequired(true))
   .addStringOption((option) => option.setName(`razon`).setDescription(`Razon del ban`))
   .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  /**
   * 
   * @param { ChatInputCommandInteraction } interaction 
   */

  async execute(interaction, client) {
    const user = interaction.options.getUser(`target`);
    const { guild } = interaction;

    let razon = interaction.options.getString(`razon`);
    const member = await interaction.guild.members.fetch(user.id).catch(console.error);

    if (!razon) razon = "La razon es anonima";
    if (user.id === interaction.user.id) return interaction.reply({ content: `No puedes hacerte ban a ti mismo`, ephemeral: true});
    if (user.id === client.user.id) return interaction.reply({ content: `No puedes hacerle ban a ${client.user.tag}`, ephemeral: true });
    if (member.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({ content: `No puedes dar ban a alguien con permisos igual o superior al tuyo`, ephemeral: true});
    if(!member.kickable) return interaction.reply({ content: `No puedo dar dan a usuarios con mas poder que el mio`, ephemeral: true});

    const embed = new EmbedBuilder()
      .setAuthor({ name: `${guild.name}`, iconURL: `${guild.iconURL({dynamic: true}) || "https://media.discordapp.net/attachments/1061470285456478229/1103485521319174264/iconalt.png?width=410&height=616"}` })
      .setTitle(`${user.tag} ha sido agregado a la lista negra del servidor`)
      .setColor(`#ff0000`)
      .setTimestamp()
      .setThumbnail(`${user.displayAvatarURL({dynamic: true})}`)
      .addFields({ name: `Razon`, value: `${razon}` }, { name: `Staff`, value: `${interaction.user.tag}`});

      await member.ban({ deleteMessageSeconds: 0, reason: razon}).catch(console.error);

      interaction.reply({ embeds: [embed] });
  },
};