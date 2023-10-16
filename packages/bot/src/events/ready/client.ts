import { DiscordClient } from '../../bot.js';
import { EventInterface } from '../../components/typings/index.js';
import { Events, ActivityType, PresenceStatusData } from 'discord.js';
import { logger } from '../../components/handlers/exports.js';
import moment from 'moment-timezone';

const event: EventInterface = {
    name: Events.ClientReady,
    options: { once: true, rest: false },
    execute: async (client: DiscordClient) => {
        const config = client.config;
        const avatars = new Map([
            ['halloween', config.avatars.jack_o_lantern],
            ['christmas', config.avatars.snowman],
            ['new_year', config.avatars.star2],
            ['valentines', config.avatars.gift_heart],
        ]);
        let clientAvatar: string | undefined = config.avatars.default;
        let guildAvatar: string | undefined = config.avatars.default;
        let presenceActivity: string = 'Saving Humanity! | /help';
        let presenceStatus: PresenceStatusData;

        const updateActivityAndAvatar = async () => {
            const now = moment.tz('Europe/Copenhagen');
            const currentMonth = now.month() + 1;
            const currentDay = now.date();

            if (currentMonth === 6 && currentDay === 7) {
                presenceActivity = 'Happy Birthday GVO! 🎉🎂';
                presenceStatus = 'idle';
            } else if (currentMonth === 10 && currentDay === 31) {
                clientAvatar = guildAvatar = avatars.get('halloween');
                presenceActivity = 'Spooky Halloween 🎃👻';
                presenceStatus = 'idle';
            } else if (currentMonth === 12 && currentDay >= 25 && currentDay <= 31) {
                clientAvatar = guildAvatar = avatars.get('christmas');
                presenceActivity = 'Merry Christmas 🎄❄️';
                presenceStatus = 'idle';
            } else if (currentMonth === 1 && currentDay === 1) {
                clientAvatar = guildAvatar = avatars.get('new_year');
                presenceActivity = 'Happy New Year ✨';
                presenceStatus = 'idle';
            } else if (currentMonth === 2 && currentDay === 14) {
                clientAvatar = guildAvatar = avatars.get('valentines');
                presenceActivity = 'Happy Valentines Day 🌺💝💖';
                presenceStatus = 'dnd';
            }

            try {
                await client.user?.setAvatar(clientAvatar!);
                await client.guilds.cache.get(client.config.guilds[0].id)?.setIcon(guildAvatar!);
                client.user?.setPresence({
                    activities: [{ type: ActivityType.Custom, name: presenceActivity }],
                    status: presenceStatus,
                });
            } catch (error) {}
        };

        const now = moment.tz('Europe/Copenhagen');
        const next12AM = now.add(1, 'days').startOf('day').add(12, 'hours');
        const delay = next12AM.diff(now);
        setTimeout(() => {
            updateActivityAndAvatar(); // Initial change
            setInterval(updateActivityAndAvatar, 24 * 60 * 60 * 1000);
        }, delay);
    },
};

export default event;
