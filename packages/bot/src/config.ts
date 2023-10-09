import { ConfigInterface } from 'types/interfaces.js';
import { ColorResolvable } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

export const config: ConfigInterface = {
    bot: {
        token: process.env.DISCORD_BOT_TOKEN as string,
        id: process.env.DISCORD_BOT_ID as string,
        secret: process.env.DISCORD_BOT_SECRET as string,
    },
    avatars: {
        others: {
            blush: 'https://github.com/gvobot/avatars/blob/main/others/crystal_ball_blush.png?raw=true',
            joy: 'https://github.com/gvobot/avatars/blob/main/others/crystal_ball_joy.png?raw=true',
            heart_eyes: 'https://github.com/gvobot/avatars/blob/main/others/crystal_ball_heart_eyes.png?raw=true',
            wink: 'https://github.com/gvobot/avatars/blob/main/others/crystal_ball_wink.png?raw=true',
            sleepy: 'https://github.com/gvobot/avatars/blob/main/others/crystal_ball_sleepy.png?raw=true',
            thinking: 'https://github.com/gvobot/avatars/blob/main/others/crystal_ball_thinking.png?raw=true',
            hugging: 'https://github.com/gvobot/avatars/blob/main/others/crystal_ball_hugging.png?raw=true',
            grinning: 'https://github.com/gvobot/avatars/blob/main/others/crystal_ball_grinning.png?raw=true',
            laughing: 'https://github.com/gvobot/avatars/blob/main/others/crystal_ball_laughing.png?raw=true',
            sunglasses: 'https://github.com/gvobot/avatars/blob/main/others/crystal_ball_sunglasses.png?raw=true',
            stuck_out_tongue: 'https://github.com/gvobot/avatars/blob/main/others/crystal_ball_stuck_out_tongue.png?raw=true',
        },
        events: {
            christmas: 'https://github.com/gvobot/avatars/blob/main/events/christmas/crystal_ball_snowman.png?raw=true',
            easter: 'https://github.com/gvobot/avatars/blob/main/events/easter/crystal_ball_rabbit.png?raw=true',
            halloween: 'https://github.com/gvobot/avatars/blob/main/events/halloween/crystal_ball_jack_o_lantern.png?raw=true',
            new_year: 'https://github.com/gvobot/avatars/blob/main/events/new-year/crystal_ball_star2.png?raw=true',
            valentines: 'https://github.com/gvobot/avatars/blob/main/events/valentines-day/crystal_ball_gift_heart.png?raw=true',
        },
    },
    guilds: [
        { name: 'Good Vibes Only™ Support', category: 'support', id: '1126979648249659422' },
        { name: 'Good Vibes Only™ Emojis', category: 'emoji', id: '1159511150464082010' },
    ],
    colors: {
        theme: '#fee300' as ColorResolvable,
        green: '#00E09E' as ColorResolvable,
        red: '#FF434E' as ColorResolvable,
    },
};
