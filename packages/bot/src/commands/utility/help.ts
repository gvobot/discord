import { DiscordClient } from '../../main.js';
import { CommandInterface } from '../../types/interfaces.js';
import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ChatInputCommandInteraction,
    //EmbedBuilder,
    PermissionFlagsBits,
    SlashCommandBuilder,
} from 'discord.js';

const command: CommandInterface = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setNSFW(false)
        .setDescription('Get a help with anything about the bot')
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
        .setDMPermission(false),
    execute: async (interaction: ChatInputCommandInteraction, client: DiscordClient) => {
        return interaction.reply({
            //embeds: [new EmbedBuilder().setColor(client.config.colors.theme).setDescription(`In development!`)],
            components: [
                new ActionRowBuilder<ButtonBuilder>().addComponents(
                    new ButtonBuilder()
                        .setCustomId('status')
                        .setDisabled(true)
                        .setLabel('Status: Development')
                        .setStyle(ButtonStyle.Danger),
                    new ButtonBuilder()
                        .setDisabled(false)
                        .setLabel('Support Server')
                        .setStyle(ButtonStyle.Link)
                        .setURL('https://discord.gg/h2Pq2Fzw4k'),
                ),
            ],
            ephemeral: true,
        });
    },
};
export default command;
