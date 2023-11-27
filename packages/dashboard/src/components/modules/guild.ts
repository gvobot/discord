import DBD from 'discord-dashboard';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const languages = {
    'Arabic, Eygpt (العربية، مصر)': 'ar-EG',
    'Bulgarian (български)': 'bg',
    'ChineseCN (简体中文)': 'zh-CN',
    'ChineseTW (繁體中文)': 'zh-TW',
    'Croatian (Hrvatski)': 'hr',
    'Czech (čeština)': 'cs',
    'Danish (Dansk)': 'da',
    'Dutch (Nederlands)': 'nl',
    'English (United Kingdom)': 'en-GB',
    'English (United States)': 'en-US',
    'Finnish (Suomi)': 'fi',
    'French (Français)': 'fr',
    'German (Deutsch)': 'de',
    'Greek (Ελληνικά)': 'el',
    'Hindi (हिन्दी)': 'hi',
    'Hungarian (Magyar)': 'hu',
    'Indonesian (Bahasa Indonesia)': 'id',
    'Italian (Italiano)': 'it',
    'Japanese (日本語)': 'ja',
    'Korean (한국어)': 'ko',
    'Lithuanian (Lietuvių)': 'lt',
    'Norwegian (Norsk)': 'no',
    'Polish (Polski)': 'pl',
    'PortugueseBR (Português)': 'pt-BR',
    'Romanian (Română)': 'ro',
    'Russian (Русский)': 'ru',
    'SpanishES (Español)': 'es-ES',
    'Swedish (Svenska)': 'sv-SE',
    'Thai (ไทย)': 'th',
    'Turkish (Türkçe)': 'tr',
    'Ukrainian (Українська)': 'uk',
    'Vietnamese (Tiếng Việt)': 'vi',
};

export const guildModule = {
    toggleable: false,
    refreshOnSave: true,
    categoryId: 'guild',
    categoryName: 'Guild',
    categoryImageURL: '', // You can provide an image URL here if needed
    categoryDescription: 'Update, change, or create anything on your server!',
    getActualSet: async ({ guild }) => {
        try {
            const data = await prisma.guild.findUnique({ where: { guildId: guild.id } });
            if (data) {
                return [
                    {
                        optionId: 'lang',
                        data: data.language,
                    },
                ];
            } else {
                return [
                    {
                        optionId: 'lang',
                        data: 'en-US',
                    },
                ];
            }
        } catch (error) {
            console.error('Error fetching data from the database:', error);
            throw error;
        }
    },
    setNew: async ({ guild, data }) => {
        try {
            if (data && data.length > 0) {
                const langOption = data.find((option) => option.optionId === 'lang');
                if (langOption) {
                    await prisma.guild.upsert({
                        where: { guildId: guild.id },
                        update: { language: langOption.data },
                        create: {
                            guildId: guild.id,
                            language: langOption.data,
                            themeColor: '#2b2d31',
                            isMembership: false,
                            featured: false,
                            duckCoins: 0,
                        },
                    });
                }
            }
        } catch (error) {
            console.error('Error updating data in the database:', error);
            throw error;
        }
    },
    categoryOptionsList: [
        {
            optionId: 'lang',
            optionName: 'Language',
            optionDescription: 'Choose the language for the bot on your server!',
            optionType: DBD.formTypes.select(languages, false),
        },
    ],
};
