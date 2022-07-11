import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageActionRow, MessageButton } from 'discord.js';
import { SlashCommand } from '../types';
const GOOGLE_URL = 'https://google.com';
export const GoogleCommand: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName('google')
    .setDescription('Gives a link to Google'),
  async run(interaction) {
    const LinkButton = new MessageActionRow().addComponents(
      new MessageButton()
        .setURL(GOOGLE_URL)
        .setStyle('LINK')
        .setLabel('Visit for Fun')
    );
    await interaction.reply({
      components: [LinkButton],
    });
  },
};
