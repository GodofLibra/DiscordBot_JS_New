import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';
import { SlashCommand } from '../types';
const now = new Date();
export const UserInfoCommand: SlashCommand = {
  command: new SlashCommandBuilder()
    .addUserOption((option) =>
      option
        .setName('user')
        .setDescription('The Command Gives User Info')
        .setRequired(true)
    )
    .setName('User_Info')
    .setDescription('Gives User Info for Specified User'),

  async run(interaction) {
    const user = interaction.options.getUser('user', true);
    const avatar = user.displayAvatarURL();
    const embed = new MessageEmbed()
      .setColor('BLURPLE')
      .setTitle(user.tag)
      .setThumbnail(avatar)
      .addField('Registered at', user.createdAt.toDateString(), true)
      .setTimestamp(now);
    embed.setFooter({ text: `ID ${user.id}` });

    await interaction.reply({
      embeds: [embed],
    });
  },
};
