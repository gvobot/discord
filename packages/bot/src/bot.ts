import { Client, Collection, GatewayIntentBits, Partials } from 'discord.js';
import { ClusterClient, getInfo } from 'discord-hybrid-sharding';
import { ConfigInterface, EventInterface, CommandInterface } from './components/typings/index.js';

import {
    logger,
    loadCommands,
    loadEvents,
    CustomError,
    CustomErrorCodes,
    logError,
} from './components/handlers/exports.js';

import { config } from './config.js';

export class DiscordClient extends Client {
    public commands: Collection<string, CommandInterface>;
    public subcommands: Collection<string, CommandInterface>;
    public cooldowns: Collection<string, Collection<string, number>>;
    public events: Collection<string, EventInterface>;
    public config: ConfigInterface;
    public cluster: ClusterClient<DiscordClient>;
    constructor() {
        super({
            shards: getInfo().SHARD_LIST,
            shardCount: getInfo().TOTAL_SHARDS,
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
        this.cluster = new ClusterClient(this);
    }
    public async loadClient() {
        if (this.cluster.maintenance)
            logger.info(`${this.user?.username} on maintenance mode with ${this.cluster.maintenance}`);

        this.cluster.on('ready', async () => {
            await loadCommands(this);
            await loadEvents(this);
        });
        
        await this.startClient();
    }
    public async startClient() {
        this.login(this.config.bot.token).catch((error) => {
            logError(new CustomError(CustomErrorCodes.LoginClientFailed, 'Failed to log into the user client.'), error);
        });
    }
}

new DiscordClient().loadClient();
