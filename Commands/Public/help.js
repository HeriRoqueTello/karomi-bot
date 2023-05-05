const 
  { ChatInputCommandInteraction, 
    SlashCommandBuilder, 
    ActionRowBuilder, 
    ButtonBuilder, 
    ButtonStyle, 
    EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
   .setName("help")
   .setDescription("Informacion de Karomi!"),

  /**
   * 
   * @param { ChatInputCommandInteraction } interaction 
   */

  async execute(interaction) {
    const { guild } = interaction;
    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`menu`)
        .setLabel(`Menu`)
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId(`utility`)
        .setLabel(`Utilidad`)
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId(`mod`)
        .setLabel(`Moderacion`)
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId(`music`)
        .setLabel(`Musica`)
        .setStyle(ButtonStyle.Danger),
      new ButtonBuilder()
        .setLabel(`Karomi Link`)
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=1100191367206019102&permissions=8&scope=bot`)
        .setStyle(ButtonStyle.Link),
    );

    const embedMenu = new EmbedBuilder()
      .setTitle(`Menu`)
      .setColor(`#5865F2`)
      .setFields(
        {
          name: `:round_pushpin: | Utilidad:`,
          value: `Comandos de utilidad.`
        }, 
        {
          name: `:shield: | Moderacion:`,
          value: `Comandos de moderacion.`
        },
        {
          name: `:notes: | Musica(disabled):`,
          value: `Comandos de musica.`
        },
        {
          name: `:purple_heart: | Karomi:`,
          value: `Link para invitar a Karomi en otro servidor.`
        },
      )
      .setFooter({ text: `${guild.name}`, iconURL: `${guild.iconURL({dynamic: true}) || "https://media.discordapp.net/attachments/1061470285456478229/1103485521319174264/iconalt.png?width=410&height=616"}` });
    const embedUtility = new EmbedBuilder()
      .setTitle(`:round_pushpin: | Utilidad`)
      .setColor(`#248046`)
      .setFields(
        {
          name: `/user`,
          value: `Informacion de un usuario en el servidor`
        },
        {
          name: `/server`,
          value: `Informacion del servidor`
        },
      )
      .setFooter({ text: 'Para todos los usuarios', iconURL: `${guild.iconURL({dynamic: true}) || "https://media.discordapp.net/attachments/1061470285456478229/1103485521319174264/iconalt.png?width=410&height=616"}` });
    const embedMod = new EmbedBuilder()
      .setTitle(`:shield: | Moderacion`)
      .setColor(`#248046`)
      .setFields(
        {
          name: `/ban`,
          value: `Ban a usuario del servidor`
        },
        {
          name: `/kick`,
          value: `Kick a usuario del servidor`
        },
        {
          name: `/timeout`,
          value: `Timeout a usuario del servidor`
        },
      )
      .setFooter({ text: 'Solo para el staff', iconURL: `${guild.iconURL({dynamic: true}) || "https://media.discordapp.net/attachments/1061470285456478229/1103485521319174264/iconalt.png?width=410&height=616"}` });
    const embedMusic = new EmbedBuilder()
      .setTitle(`:notes: | Musica(disabled)`)
      .setColor(`#da373c`)
      .setFields({
        name: `/play`,
        value: `Ingresar el url o nombre de la cancion para reproducirlo`
      })
      .setFooter({ text: 'Para todos los usuarios', iconURL: `${guild.iconURL({dynamic: true}) || "https://media.discordapp.net/attachments/1061470285456478229/1103485521319174264/iconalt.png?width=410&height=616"}` });

    await interaction.reply({ embeds: [embedMenu] , components: [button] });

    const collector = interaction.channel.createMessageComponentCollector();

    collector.on(`collect`, async (i) => {

      if (i.customId == `menu`) {
        if (i.user.id !== interaction.user.id) {
          return await i.reply({ content: `Solo la persona que ejecute el comando puede utilizar los botones`, ephemeral: true});
        }
        await i.update({embeds: [embedMenu], components: [button]})
      }
      if (i.customId == `utility`) {
        if (i.user.id !== interaction.user.id) {
          return await i.reply({ content: `Solo la persona que ejecute el comando puede utilizar los botones`, ephemeral: true});
        }
        await i.update({embeds: [embedUtility], components: [button]})
      }
      if (i.customId == `mod`) {
        if (i.user.id !== interaction.user.id) {
          return await i.reply({ content: `Solo la persona que ejecute el comando puede utilizar los botones`, ephemeral: true});
        }
        await i.update({embeds: [embedMod], components: [button]})
      }
      if (i.customId == `music`) {
        if (i.user.id !== interaction.user.id) {
          return await i.reply({ content: `Solo la persona que ejecute el comando puede utilizar los botones`, ephemeral: true});
        }
        await i.update({embeds: [embedMusic], components: [button]})
      }
      
    });
  },
};