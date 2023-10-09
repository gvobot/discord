import { createLogger, format, transports } from 'winston';
import dotenv from 'dotenv';
dotenv.config({ path: '../../../.env' });

export const logger = createLogger({
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}] ${message}`;
        }),
    ),
    transports: [new transports.Console(), new transports.File({ filename: '../../bot.log' })],
});

export function checkEnvVariable(variableName: string): boolean {
    if (!process.env[variableName]) {
        logger.error(`Missing environment variable "${variableName}"`);
        return false;
    }
    return true;
}

export function checkEnvUrlVariable(variableName: string): boolean {
    if (!process.env[variableName]) {
        logger.error(`Missing environment variable "${variableName}"`);
        return false;
    }
    const url = process.env[variableName];
    try {
        new URL(String(url));
        return true;
    } catch (error) {
        logger.error(`Invalid URL for "${variableName}": "${url}"`);
        return false;
    }
}
