import { Client, GatewayIntentBits, Partials } from 'discord.js';
import { config } from './config.js';

import { logger } from './components/handlers/logger.js';

import DBD from 'discord-dashboard';
import SoftUI from 'dbd-soft-ui';
import KeyvMongo from '@keyv/mongo';
import os from 'os';

import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';

import { themeMaintenance } from './components/pages/themeMaintenance.js';
import { locales } from './components/locales/locales.js';
import { guildModule } from './components/modules/exports.js';

export class DiscordClient extends Client {
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
    }
    public async Dashboard() {
        await DBD.useLicense(config.dbd.license);
        DBD.Dashboard = DBD.UpdatedClass();

        const app = express();
        const store = MongoStore.create({
            mongoUrl: process.env.DATABASE_URL,
        });
        app.use(
            session({
                secret: process.env.DBD_SECRET_KEY,
                store: store,
            }),
        );

        // @ts-expect-error
        const Handler = new DBD.Handler({
            store: new KeyvMongo(process.env.DATABASE_URL),
        });

        const Dashboard = new DBD.Dashboard({
            sessionStorage: store,
            port: config.dbd.port,
            client: config.bot.client,
            redirectUri: config.dbd.redirectUri,
            domain: config.dbd.domain,
            ownerIDs: config.dbd.ownerIDs,
            useThemeMaintenance: config.dbd.useThemeMaintenance,
            underMaintenance: themeMaintenance,
            useTheme404: config.dbd.useTheme404,
            bot: this,
            acceptPrivacyPolicy: config.dbd.acceptPrivacyPolicy,
            useCategorySet: config.dbd.useCategorySet,
            minimizedConsoleLogs: config.dbd.minimizedConsoleLogs,
            supportServer: {
                slash: config.dbd.supportServer.slash,
                inviteUrl: config.dbd.supportServer.inviteUrl,
            },
            guildAfterAuthorization: {
                use: config.dbd.guildAfterAuthorization.use,
                guildId: config.dbd.guildAfterAuthorization.guildId,
            },
            invite: {
                clientId: config.bot.client.id,
                scopes: config.dbd.invite.scopes,
                permissions: config.dbd.invite.permissions,
            },
            requiredPermissions: config.dbd.requiredPermissions,
            theme: SoftUI({
                dbdriver: process.env.DATABASE_URL,
                storage: Handler,
                addons: [], // This is coming soon!
                locales: locales,
                customThemeOptions: {
                    index: async ({ req, res, config }) => {
                        let username = req.session?.user?.username || 'Guest';

                        const cards = [
                            {
                                title: '',
                                icon: 'single-02',
                                getValue: username,
                                progressBar: {
                                    enabled: false,
                                    getProgress: this.guilds.cache.size,
                                },
                            },
                            {
                                title: '',
                                icon: 'single-02',
                                getValue: os
                                    .cpus()[0]
                                    .model.replace('(R) Core(TM) ', ' ')
                                    .replace(' CPU ', '')
                                    .split('@')[0],
                                progressBar: {
                                    enabled: false,
                                    getProgress: 50,
                                },
                            },
                            {
                                title: '',
                                icon: 'single-02',
                                getValue: os.platform(),
                                progressBar: {
                                    enabled: false,
                                    getProgress: 50,
                                },
                            },
                            {
                                title: '',
                                icon: 'single-02',
                                getValue: `${this.guilds.cache.size} out of 75`,
                                progressBar: {
                                    enabled: true,
                                    getProgress: (this.guilds.cache.size / 75) * 100,
                                },
                            },
                        ];

                        const graph = {
                            values: [690, 524, 345, 645, 478, 592, 468, 783, 459, 230, 621, 345],
                            labels: ['1m', '2m', '3m', '4m', '5m', '6m', '7m', '8m', '9m', '10m'],
                        };

                        return {
                            cards,
                            graph,
                        };
                    },
                },
                websiteName: config.dbd.websiteName,
                colorScheme: config.dbd.colorScheme as 'custom',
                themeColors: {
                    primaryColor: config.dbd.themeColors.primaryColor,
                    secondaryColor: config.dbd.themeColors.secondaryColor,
                },
                supporteMail: config.dbd.supportMail,
                error: {
                    error404: {
                        title: config.dbd.errror.error404.title,
                        subtitle: config.dbd.errror.error404.subtitle,
                        description: config.dbd.errror.error404.description,
                    },
                    dbdError: {
                        disableSecretMenu: config.dbd.errror.dbdError.disableSecretMenu,
                        secretMenuCombination: config.dbd.errror.dbdError.secretMenuCombination,
                    },
                },
                sidebar: {
                    gestures: {
                        disabled: config.dbd.sidebar.gestures.disabled,
                        gestureTimer: config.dbd.sidebar.gestures.gestureTimer,
                        gestureSensitivity: config.dbd.sidebar.gestures.gestureSensitivity,
                    },
                },
                icons: {
                    favicon: config.dbd.icons.favIcon,
                    noGuildIcon: config.dbd.icons.noGuildIcon,
                    backgroundImage: config.dbd.icons.backgroundImage,
                    sidebar: {
                        darkUrl: config.dbd.icons.sidebar.darkUrl,
                        lightUrl: config.dbd.icons.sidebar.lightUrl,
                        hideName: config.dbd.icons.sidebar.hideName,
                        borderRadius: config.dbd.icons.sidebar.borderRadius,
                        alignCenter: config.dbd.icons.sidebar.alignCenter,
                    },
                },
                footer: {
                    replaceDefault: config.dbd.footer.replaceDefault,
                    text: config.dbd.footer.text,
                },
                index: {
                    graph: {
                        enabled: config.dbd.index.graph.enabled,
                        lineGraph: config.dbd.index.graph.lineGraph,
                        tag: config.dbd.index.graph.tag,
                        max: config.dbd.index.graph.max,
                    },
                },
                premium: {
                    enabled: config.dbd.premium.enabled,
                    card: {
                        title: '',
                        description: '',
                        bgImage: config.dbd.premium.card.bgImage,
                        button: {
                            text: '',
                            url: config.dbd.premium.card.button.url,
                        },
                    },
                },
                sweetalert: {
                    errors: { requirePremium: config.dbd.sweetalert.errors.requirePremium },
                    success: {
                        login: config.dbd.sweetalert.success.login,
                    },
                },
                preloader: {
                    image: '',
                    spinner: config.dbd.preloader.spinner,
                    text: '',
                },
                admin: {
                    pterodactyl: {
                        enabled: config.dbd.admin.pterodactyl.enabled,
                        apiKey: 'apiKey',
                        panelLink: 'https://panel.website.com',
                        serverUUIDs: [],
                    },
                    logs: {
                        enabled: config.dbd.admin.logs.enabled,
                        key: config.dbd.admin.logs.key,
                    },
                },
                commands: [
                    {
                        category: 'Moderation',
                        subTitle: 'A list of moderation commands',
                        categoryId: 'moderation',
                        image: '',
                        hideAlias: true,
                        hideDescription: false,
                        hideSidebarItem: false,
                        list: [
                            {
                                commandName: 'ban',
                                commandUsage: '/mod ban userid:STRING reason:STRING',
                                commandDescription: 'Ban a member from the discord server',
                                commandAlias: 'alias',
                            },
                            {
                                commandName: 'kick',
                                commandUsage: '/mod kick userid:STRING reason:STRING',
                                commandDescription: 'Kick a member from the discord server',
                                commandAlias: 'alias',
                            },
                        ],
                    },
                    {
                        category: 'Utility',
                        subTitle: 'A list of utility commands',
                        categoryId: 'utility',
                        image: '',
                        hideAlias: true,
                        hideDescription: false,
                        hideSidebarItem: false,
                        list: [
                            {
                                commandName: 'ping',
                                commandUsage: '/ping',
                                commandDescription: 'See if the bot is alive',
                                commandAlias: 'alias',
                            },
                        ],
                    },
                ],
            }),
            settings: [guildModule],
        });
        Dashboard.init();
    }
    public async loadClient() {
        await this.startClient();
    }
    public async startClient() {
        await this.Dashboard();
        this.login(config.bot.token).catch((error) => {
            logger.error(`Failed to log into the user client.`, error);
        });
    }
}

new DiscordClient().loadClient();
