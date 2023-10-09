import { logger } from '../components/logger/index.js';

export async function loadErrorLoggers() {
    // error handling for unhandled rejections
    process.on('unhandledRejection', (reason, promise) => {
        logger.error(' [Error_Handling] :: Unhandled Rejection');
        logger.error('Reason:');
        logger.error(reason);
        logger.error('Promise:');
        logger.error(promise);
    });

    // error handling for uncaught exceptions
    process.on('uncaughtException', (err, origin) => {
        logger.error(' [Error_Handling] :: Uncaught Exception');
        logger.error('Error:');
        logger.error(err);
        logger.error('Origin:');
        logger.error(origin);
        process.exit(1);
    });

    // error handling for uncaught exceptions with monitoring
    process.on('uncaughtExceptionMonitor', (err, origin) => {
        logger.error(' [Error_Handling] :: Uncaught Exception (MONITOR)');
        logger.error('Error:');
        logger.error(err);
        logger.error('Origin:');
        logger.error(origin);
        process.exit(1);
    });

    // error handling for multiple resolves (you can implement appropriate handling here)
    process.on('multipleResolves', (type, promise, reason) => {
    });
}
