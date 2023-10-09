import { Client, Collection, GatewayIntentBits, Partials } from 'discord.js';
import { ConfigInterface, EventInterface, CommandInterface } from './types/interfaces.js';
import { config } from './config.js';

import { logger, checkEnvVariable, checkEnvUrlVariable } from './components/logger/index.js';

import { loadCommands } from './handlers/commands.js';
import { loadEvents } from './handlers/events.js';
import { loadErrorLoggers } from './handlers/errors.js';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class DiscordClient extends Client {
    public commands: Collection<string, CommandInterface>;
    public subcommands: Collection<string, CommandInterface>;
    public cooldowns: Collection<string, Collection<string, number>>;
    public events: Collection<string, EventInterface>;
    public config: ConfigInterface;
    public db: typeof prisma;
    constructor() {
        super({
            intents: [
                GatewayIntentBits.AutoModerationConfiguration,
                GatewayIntentBits.AutoModerationExecution,
                GatewayIntentBits.DirectMessageReactions,
                GatewayIntentBits.DirectMessageTyping,
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.GuildEmojisAndStickers,
                GatewayIntentBits.GuildIntegrations,
                GatewayIntentBits.GuildInvites,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.GuildMessageTyping,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildModeration,
                GatewayIntentBits.GuildPresences,
                GatewayIntentBits.GuildScheduledEvents,
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.GuildWebhooks,
                GatewayIntentBits.Guilds,
                GatewayIntentBits.MessageContent,
            ],
            partials: [
                Partials.Channel,
                Partials.GuildMember,
                Partials.GuildScheduledEvent,
                Partials.Message,
                Partials.Reaction,
                Partials.ThreadMember,
                Partials.User,
            ],
        });
        this.commands = new Collection();
        this.subcommands = new Collection();
        this.cooldowns = new Collection();
        this.events = new Collection();
        this.config = config;
        this.db = prisma;
    }
    public async checkClient() {
        let error: boolean = false;
        if (!checkEnvVariable('DISCORD_BOT_TOKEN')) error = true;
        if (!checkEnvVariable('DISCORD_BOT_ID')) error = true;
        if (!checkEnvVariable('DISCORD_BOT_SECRET')) error = true;
        if (!checkEnvVariable('DATABASE_URL')) error = true;

        if (!error) this.loadClient();
    }
    public async loadClient() {
        try {
            await loadCommands(this);
            await loadEvents(this);
            loadErrorLoggers();

            this.login(this.config.bot.token).catch(() => {
                logger.error("You provided a invalid token! Please change your token in '.env'");
            });
        } catch (error) {
            logger.error(error);
        }
    }
}

new DiscordClient().checkClient();
