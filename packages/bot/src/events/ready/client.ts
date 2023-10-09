import { DiscordClient } from '../../main.js';
import { EventInterface } from '../../types/interfaces.js';
import { Events, ActivityType, PresenceStatusData } from 'discord.js';
import { logger } from '../../components/logger/index.js';
import cron from 'node-cron';

const event: EventInterface = {
    name: Events.ClientReady,
    options: { once: true, rest: false },
    execute: async (client: DiscordClient) => {
        const today = new Date();
        const month = today.getMonth() + 1;
        const day = today.getDate();

        const config = client.config;

        const avatars = new Map([
            ['halloween', config.avatars.jack_o_lantern],
            ['christmas', config.avatars.snowman],
            ['new_year', config.avatars.star2],
            ['easter', config.avatars.rabbit],
            ['valentines', config.avatars.gift_heart],
        ]);

        let clientAvatar: string | undefined;
        let guildAvatar: string | undefined;
        let presenceActivity: string;
        let presenceStatus: PresenceStatusData;

        switch (true) {
            case month === 11 && day === 13:
                presenceActivity = 'Happy Birthday Ducko! 🎉🦆';
                presenceStatus = 'idle';
                break;
            case month === 6 && day === 7:
                presenceActivity = 'Happy Birthday GVO! 🎉🎂';
                presenceStatus = 'idle';
                break;
            case month === 10 && day == 31:
                clientAvatar = guildAvatar = avatars.get('halloween');
                presenceActivity = 'Happy Halloween! 🎃👻';
                presenceStatus = 'idle';
                break;
            case month === 12 && day >= 25 && day <= 31:
                clientAvatar = guildAvatar = avatars.get('christmas');
                presenceActivity = 'Merry Christmas! 🎄🎅';
                presenceStatus = 'dnd';
                break;
            case month === 1 && day === 1:
                clientAvatar = guildAvatar = avatars.get('new_year');
                presenceActivity = 'Happy New Year! 🎉🥳';
                presenceStatus = 'dnd';
                break;
            case month === 4 && day >= 1 && day <= 30:
                clientAvatar = guildAvatar = avatars.get('easter');
                presenceActivity = 'Happy Easter! 🐰🥚';
                presenceStatus = 'online';
                break;
            case month === 2 && day === 14:
                clientAvatar = guildAvatar = avatars.get('valentines');
                presenceActivity = "Happy Valentine's Day! 💖❤️";
                presenceStatus = 'dnd';
                break;

            default:
                const randomAvatars = [
                    config.avatars.blush,
                    config.avatars.grinning,
                    config.avatars.heart_eyes,
                    config.avatars.hugging,
                    config.avatars.joy,
                    config.avatars.laughing,
                    config.avatars.stuck_out_tongue,
                    config.avatars.sunglasses,
                    config.avatars.thinking,
                    config.avatars.wink,
                ];
                const randomActivities = ['Good Vibes Only!', 'Positive Vibes Only!', 'Chill Vibes Only!'];
                const randomAvatarIndex = Math.floor(Math.random() * randomAvatars.length);
                const randomActivityIndex = Math.floor(Math.random() * randomActivities.length);
                clientAvatar = guildAvatar = randomAvatars[randomAvatarIndex];
                presenceActivity = randomActivities[randomActivityIndex];
                presenceStatus = 'online';
                break;
        }

        const updateAvatar = async () => {
            if (clientAvatar && guildAvatar) {
                await client.user?.setAvatar(clientAvatar);
                await client.guilds.cache.get(config.guilds[0].id)?.setIcon(guildAvatar);
            }
        };

        const updatePresence = async () => {
            client.user?.setPresence({
                activities: [{ type: ActivityType.Custom, name: presenceActivity }],
                status: presenceStatus,
            });
        };

        cron.schedule('0 0 * * *', updateAvatar);
        cron.schedule('*/2 * * * *', updatePresence);

        logger.info(`Logged in as ${client.user?.username}`);
    },
};

export default event;
