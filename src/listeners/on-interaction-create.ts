import { Client, CommandInteraction } from 'discord.js';
import { SlashCommands } from '../slash-commands';

export const onInteractionCreate = (client: Client) => {
  client.on('interactionCreate', async (Interaction) => {
    if (Interaction.isCommand()) {
        await handleSlashCommand(Interaction);
    }
  });

  const handleSlashCommand = async(interaction:CommandInteraction) => {
    const slashcommand = SlashCommands.find((slashCommand) => slashCommand.command.name === interaction.commandName);
    if(!slashcommand){
        await interaction.reply({content:'Command Not Found'});
        return;
    }
    await slashcommand.run(interaction);
  };
};