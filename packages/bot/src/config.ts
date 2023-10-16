import { ColorResolvable } from 'discord.js';
import { ConfigInterface } from './components/typings/index.js';
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

export const config: ConfigInterface = {
    bot: {
        token: process.env.DISCORD_BOT_TOKEN as string,
        id: process.env.DISCORD_BOT_ID as string,
        secret: process.env.DISCORD_BOT_SECRET as string,
    },
    avatars: {
        default: 'https://github.com/gvobot/branding/blob/main/avatars/crystal_ball_blush.png?raw=true',

        // Event Avatars
        snowman: 'https://github.com/gvobot/branding/blob/main/avatars/crystal_ball_snowman.png?raw=true',
        rabbit: 'https://github.com/gvobot/branding/blob/main/avatars/crystal_ball_rabbit.png?raw=true',
        jack_o_lantern: 'https://github.com/gvobot/branding/blob/main/avatars/crystal_ball_jack_o_lantern.png?raw=true',
        star2: 'https://github.com/gvobot/branding/blob/main/avatars/crystal_ball_star2.png?raw=true',
        gift_heart: 'https://github.com/gvobot/branding/blob/main/avatars/crystal_ball_gift_heart.png?raw=true',
    },
    webhooks: [
        {
            name: 'Guild Blacklisted',
            url: process.env.GUILD_BLACKLISTED,
        },
        {
            name: 'Guild Unblacklisted',
            url: process.env.GUILD_UNBLACKLISTED,
        },
        // {
        //     name: 'Guild Added Premium',
        //     url: process.env.GUILD_ADDED_PREMIUM,
        // },
        // {
        //     name: 'Guild Removed Premium',
        //     url: process.env.GUILD_REMOVED_PREMIUM,
        // },
    ],
    guilds: [
        { name: 'Good Vibes Only™ Support', category: 'support', id: '1126979648249659422' },
        { name: 'Good Vibes Only™ Emojis', category: 'emoji', id: '1159511150464082010' },
    ],
    colors: {
        theme: '#ab8aee' as ColorResolvable,
        green: '#00E09E' as ColorResolvable,
        red: '#FF434E' as ColorResolvable,
    },
};
