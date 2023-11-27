import wiston, { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf } = format;

const loggerLevels = {
    levels: {
        info: 0,
        error: 1,
        success: 2,
        warning: 3,
    },
    colors: {
        info: 'blue',
        error: 'red',
        success: 'green',
        warning: 'yellow',
    },
};

export const logger = createLogger({
    levels: loggerLevels.levels,
    format: combine(
        timestamp(),
        timestamp(),
        printf(({ level, message, timestamp }) => {
            return `${timestamp} [${level}]: ${message}`;
        }),
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: '../../logs/dashboard/info.log', level: 'info' }),
        new transports.File({ filename: '../../logs/dashboard/error.log', level: 'error' }),
        new transports.File({ filename: '../../logs/dashboard/success.log', level: 'success' }),
        new transports.File({ filename: '../../logs/dashboard/warning.log', level: 'warning' }),
        new transports.File({ filename: '../../logs/dashboard/bot.log' }),
    ],
    exceptionHandlers: [new transports.Console(), new transports.File({ filename: '../../logs/bot/exceptions.log' })],
});

wiston.addColors(loggerLevels.colors);
