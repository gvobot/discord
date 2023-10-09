import { SlashCommandBuilder, ClientEvents, PermissionFlagsBits, ColorResolvable } from 'discord.js';

export type GuildTypes = Array[{ name: string; category: string; id: string }];
export type ObjectNameIDArray = Array[{ name: string; id: string }];

export interface ConfigInterface {
    bot: {
        token: string;
        id: string;
        secret: string;
    };
    avatars: {
        blush: string;
        joy: string;
        heart_eyes: string;
        wink: string;
        sleepy: string;
        thinking: string;
        hugging: string;
        grinning: string;
        laughing: string;
        sunglasses: string;
        stuck_out_tongue: string;

        snowman: string;
        rabbit: string;
        jack_o_lantern: string;
        star2: string;
        gift_heart: string;
    };
    guilds: GuildTypes;
    colors: Object[ColorResolvable];
}

export interface EventInterface {
    name: keyof ClientEvents;
    options: { rest: boolean; once: boolean };
    execute: (...args: any[]) => any;
}

export interface CommandInterface {
    cooldown?: number;
    subCommand?: string;
    data: SlashCommandBuilder | any;
    execute: (...args: any[]) => any;
}

export interface SubCommandInterface {
    cooldown?: number;
    subCommand?: string;
    data: SlashCommandBuilder | any;
}

export interface SubCommand {
    subCommand: string;
    execute: (...args: any[]) => any;
}
