import i18next from 'i18next';
import backend from 'i18next-node-fs-backend';
import { PrismaClient } from '@prisma/client';

// Define the languages supported
export const supportedLanguages = [
    'ar_SA', // Arabic
    'bg_BG', // Bulgarian
    'cs_CZ', // Czech
    'da_DK', // Danish
    'de_DE', // German
    'el_GR', // Greek
    'en_GB', // English (UK)
    'en_US', // English (US)
    'es_ES', // Spanish (Spain)
    'fi_FI', // Finnish
    'fr_FR', // French
    'hi_IN', // Hindi
    'hr_HR', // Croatian
    'hu_HU', // Hungarian
    'it_IT', // Italian
    'ja_JP', // Japanese
    'ko_KR', // Korean
    'lt_LT', // Lithuanian
    'nl_NL', // Dutch
    'no_NO', // Norwegian
    'pl_PL', // Polish
    'pt_BR', // Portuguese (Brazil)
    'pt_PT', // Portuguese (Portugal)
    'ro_RO', // Romanian
    'ru_RU', // Russian
    'sv_SE', // Swedish
    'th_TH', // Thai
    'tr_TR', // Turkish
    'uk_UA', // Ukrainian
    'vi_VN', // Vietnamese
    'zh_TW', // Chinese (Taiwan)
];

export const i18n = i18next.createInstance();

// Initialize i18next
export async function initializeI18n() {
    i18n.use(backend).init({
        lng: 'en_US',
        fallbackLng: 'en_US',
        preload: supportedLanguages,
        ns: ['common'],
        backend: {
            loadPath: '../../../locales/{{lng}}/{{ns}}.json',
        },
    });
}

export function isLanguageSupported(lng: string): boolean {
    return supportedLanguages.includes(`${lng}`);
}

export function changeLanguage(lng: string) {
    if (!isLanguageSupported(lng)) {
        throw new Error(`Language '${lng}' is not supported.`);
    }
    return i18n.changeLanguage(lng);
}

export function t(key: string, options: Record<string, unknown> = {}): string {
    const translation = i18n.t(key, options);
    const missingKeys = translation.match(/\{\w+\}/g);

    if (missingKeys && missingKeys.length > 0) {
        throw new Error(`Missing parameters in translation '${key}': ${missingKeys.join(', ')}`);
    }

    return translation;
}

// Prisma
const prisma = new PrismaClient();

export async function getGuildSettings(guildId: string) {
    try {
        return await prisma.guild.findUnique({
            where: { guildId: guildId },
        });
    } catch (err) {
        throw new Error('Failed to fetch guild settings.');
    }
}

// Localization
export async function loadLanguageForGuild(guildId: string): Promise<void> {
    const guildSettings = await getGuildSettings(guildId);
    const lng = guildSettings?.language ?? 'en_US';
    await changeLanguage(lng);
}
