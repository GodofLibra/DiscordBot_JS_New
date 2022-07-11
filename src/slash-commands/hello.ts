import {
  SlashCommandBuilder,
  memberNicknameMention,
} from '@discordjs/builders';
import { SlashCommand } from '../types';

export const HelloCommand: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName('hello')
    .setDescription('return a Greeting'),
  async run(interaction) {
    await interaction.reply({
      content: `Hello ${memberNicknameMention(interaction.user.id)}`,
    });
  },
};
