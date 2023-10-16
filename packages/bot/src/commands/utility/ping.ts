import { DiscordClient } from '../../bot.js';
import { CommandInterface } from '../../components/typings/index.js';
import { ChatInputCommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

const command: CommandInterface = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setNSFW(false)
        .setDescription('Check if the bot is alive')
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
        .setDMPermission(false),
    execute: async (interaction: ChatInputCommandInteraction, client: DiscordClient) => {
        return interaction.reply({ content: 'Pong! 🏓', ephemeral: true });
    },
};
export default command;
