import { AnySelectMenuInteraction, ButtonInteraction, ChatInputCommandInteraction } from 'discord.js';
import { logger } from './logger.js';

class CustomError extends Error {
    code: string;

    constructor(code: string, message: string) {
        super(message);
        this.code = code;
    }
}

const CustomErrorCodes = {
    LoginClientFailed: 'Login_CLIENT_FAILED',
    FailedToProcessCommand: 'Failed_To_Process_Command',
    EmojiUploadFailed: 'EMOJI_UPLOAD_FAILED',
};

function logError(customError: CustomError, error?) {
    logger.error(`Error Code: ${customError.code} - ${customError.message}`);
    logger.error(error);
}

function respondToError(
    interaction: ChatInputCommandInteraction | AnySelectMenuInteraction | ButtonInteraction,
    error: CustomError,
) {
    return interaction.reply(error.message);
}

export { CustomError, CustomErrorCodes, logError, respondToError };
