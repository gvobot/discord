import { DiscordClient } from '../../main.js';
import { CommandInterface } from '../../types/interfaces.js';
import { ChatInputCommandInteraction, EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

const command: CommandInterface = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setNSFW(false)
        .setDescription('Get a help with anything about the bot')
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
        .setDMPermission(false),
    execute: async (interaction: ChatInputCommandInteraction, client: DiscordClient) => {
        let embed = new EmbedBuilder().setColor(client.config.colors.theme).setDescription([``].join('\n'));
        return interaction.reply({ embeds: [embed], ephemeral: true });
    },
};
export default command;
