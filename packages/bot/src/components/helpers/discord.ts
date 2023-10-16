import { DiscordClient } from '../../bot.js';
import {} from 'discord.js';

export async function getUsersCount(client: DiscordClient) {
    try {
        const results = await client.cluster.broadcastEval('this.users.cache.size');
        return results.reduce((prev, val) => prev + val, 0);
    } catch (err) {
        console.error(err);
        return 0;
    }
}

export async function getChannelsCount(client: DiscordClient) {
    try {
        const results = await client.cluster.broadcastEval('this.channels.cache.size');
        return results.reduce((prev, val) => prev + val, 0);
    } catch (err) {
        console.error(err);
        return 0;
    }
}

export async function getGuildsCount(client: DiscordClient) {
    try {
        const results = await client.cluster.broadcastEval('this.guilds.cache.size');
        return results.reduce((prev, val) => prev + val, 0);
    } catch (err) {
        console.error(err);
        return 0;
    }
}
