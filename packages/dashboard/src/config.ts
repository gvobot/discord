import { ConfigInterface } from './components/typings/index.js';
import DBD from 'discord-dashboard';
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

export const config: ConfigInterface = {
    bot: {
        token: process.env.DISCORD_BOT_TOKEN as string,
        client: {
            id: process.env.DISCORD_BOT_ID as string,
            secret: process.env.DISCORD_BOT_SECRET as string,
        },
    },
    dbd: {
        license: `${process.env.DBD_LICENSE_KEY}`,
        port: 5050,
        redirectUri: 'http://localhost:5050/discord/callback',
        domain: 'http://localhost',
        ownerIDs: ['711712752246325343'],
        useThemeMaintenance: true,
        useTheme404: true,
        acceptPrivacyPolicy: true,
        useCategorySet: true,
        minimizedConsoleLogs: true,
        supportServer: {
            slash: '/support',
            inviteUrl: 'https://gvobot.app/discord',
        },
        guildAfterAuthorization: {
            use: true,
            guildId: '1126979648249659422',
        },
        invite: {
            scopes: ['bot', 'application.commands'],
            permissions: '10980017827063',
        },
        requiredPermissions: [
            DBD.DISCORD_FLAGS.Permissions.VIEW_AUDIT_LOG,
            DBD.DISCORD_FLAGS.Permissions.MANAGE_GUILD,
            DBD.DISCORD_FLAGS.Permissions.MANAGE_ROLES,
            DBD.DISCORD_FLAGS.Permissions.MANAGE_CHANNELS,
            DBD.DISCORD_FLAGS.Permissions.KICK_MEMBERS,
            DBD.DISCORD_FLAGS.Permissions.BAN_MEMBERS,
            DBD.DISCORD_FLAGS.Permissions.CREATE_INSTANT_INVITE,
            DBD.DISCORD_FLAGS.Permissions.CHANGE_NICKNAME,
            DBD.DISCORD_FLAGS.Permissions.MANAGE_NICKNAMES,
            DBD.DISCORD_FLAGS.Permissions.MANAGE_EMOJIS_AND_STICKERS,
            DBD.DISCORD_FLAGS.Permissions.MANAGE_WEBHOOKS,
            DBD.DISCORD_FLAGS.Permissions.MODERATE_MEMBERS,
            DBD.DISCORD_FLAGS.Permissions.VIEW_GUILD_INSIGHTS,
            DBD.DISCORD_FLAGS.Permissions.SEND_MESSAGES,
            DBD.DISCORD_FLAGS.Permissions.CREATE_PUBLIC_THREADS,
            DBD.DISCORD_FLAGS.Permissions.CREATE_PRIVATE_THREADS,
            DBD.DISCORD_FLAGS.Permissions.SEND_MESSAGES_IN_THREADS,
            DBD.DISCORD_FLAGS.Permissions.MANAGE_MESSAGES,
            DBD.DISCORD_FLAGS.Permissions.MANAGE_THREADS,
            DBD.DISCORD_FLAGS.Permissions.EMBED_LINKS,
            DBD.DISCORD_FLAGS.Permissions.ATTACH_FILES,
            DBD.DISCORD_FLAGS.Permissions.READ_MESSAGE_HISTORY,
            DBD.DISCORD_FLAGS.Permissions.MENTION_EVERYONE,
            DBD.DISCORD_FLAGS.Permissions.USE_EXTERNAL_EMOJIS,
            DBD.DISCORD_FLAGS.Permissions.USE_EXTERNAL_STICKERS,
            DBD.DISCORD_FLAGS.Permissions.ADD_REACTIONS,
            DBD.DISCORD_FLAGS.Permissions.START_EMBEDDED_ACTIVITIES,
        ],
        websiteName: 'Good Vibes Only',
        colorScheme: 'custom',
        themeColors: {
            primaryColor: 'string',
            secondaryColor: 'string',
        },
        supportMail: 'support@gvobot.app',
        errror: {
            error404: {
                title: 'Error 404',
                subtitle: 'Page Not Found',
                description:
                    'It seems you have stumbled into the abyss. Click the button below to return to the dashboard',
            },
            dbdError: {
                disableSecretMenu: false,
                secretMenuCombination: ['69', '82', '82', '79', '82'],
            },
        },
        sidebar: {
            gestures: {
                disabled: false,
                gestureTimer: 200,
                gestureSensitivity: 50,
            },
        },
        icons: {
            favIcon: 'https://github.com/gvobot.png',
            noGuildIcon: 'https://cdn3.iconfinder.com/data/icons/popular-services-brands-vol-2/512/discord-512.png',
            backgroundImage: 'https://github.com/gvobot.png',
            sidebar: {
                darkUrl: 'https://github.com/gvobot.png',
                lightUrl: 'https://github.com/gvobot.png',
                hideName: true,
                borderRadius: false,
                alignCenter: true,
            },
        },
        footer: {
            replaceDefault: true,
            text: 'By Sapphire Development',
        },
        index: {
            graph: {
                enabled: true,
                lineGraph: false,
                tag: 'Memory (MB)',
                max: 100,
            },
        },
        premium: {
            enabled: true,
            card: {
                bgImage: 'https://github.com/gvobot.png',
                button: {
                    url: 'https://gvobot.app/kofi',
                },
            },
        },
        sweetalert: {
            errors: { requirePremium: 'You need to be a premium member to do this.' },
            success: {
                login: 'Successfully logged in.',
            },
        },
        preloader: {
            spinner: true,
        },
        admin: {
            pterodactyl: {
                enabled: false, // SET TO FALSE PLEASE
            },
            logs: {
                enabled: true,
                key: process.env.DBD_SECRET_KEY,
            },
        },
    },
};
