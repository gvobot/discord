import { DiscordClient } from '../../main.js';
import { CommandInterface } from 'types/interfaces.js';
import { ChatInputCommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

const command: CommandInterface = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setNSFW(false)
        .setDescription('Pong!')
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
        .setDMPermission(false),
    execute: async (interaction: ChatInputCommandInteraction, client: DiscordClient) => {
        return interaction.reply('Pong 🏓');
    },
};
export default command;
