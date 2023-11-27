export interface ConfigInterface {
    bot: {
        token: string;
        client: {
            id: string;
            secret: string;
        };
    };
    dbd: {
        license: string;
        port: number;
        redirectUri: string;
        domain: string;
        ownerIDs: string[];
        useThemeMaintenance: boolean;
        useTheme404: boolean;
        acceptPrivacyPolicy: boolean;
        useCategorySet: boolean;
        minimizedConsoleLogs: boolean;
        supportServer: {
            slash: string;
            inviteUrl: string;
        };
        guildAfterAuthorization: {
            use: boolean;
            guildId: string;
        };
        invite: {
            scopes: string[];
            permissions: string;
        };
        requiredPermissions: any[]
        websiteName: string;
        colorScheme: string;
        themeColors: {
            primaryColor: string;
            secondaryColor: string;
        };
        supportMail: string;
        errror: {
            error404: {
                title: string;
                subtitle: string;
                description: string;
            };
            dbdError: {
                disableSecretMenu: boolean;
                secretMenuCombination: string[];
            };
        };
        sidebar: {
            gestures: {
                disabled: boolean;
                gestureTimer: number;
                gestureSensitivity: number;
            };
        };
        icons: {
            favIcon: string;
            noGuildIcon: string;
            backgroundImage: string;
            sidebar: {
                darkUrl: string;
                lightUrl: string;
                hideName: boolean;
                borderRadius: boolean;
                alignCenter: boolean;
            };
        };
        footer: {
            replaceDefault: boolean;
            text: string;
        };
        index: {
            graph: {
                enabled: boolean;
                lineGraph: boolean;
                tag: string;
                max: number;
            };
        };
        premium: {
            enabled: boolean;
            card: {
                bgImage: string;
                button: {
                    url: string;
                };
            };
        };
        sweetalert: {
            errors: { requirePremium: string };
            success: {
                login: string;
            };
        };
        preloader: {
            spinner: boolean;
        };
        admin: {
            pterodactyl: {
                enabled: boolean; // SET TO FALSE PLEASE
            };
            logs: {
                enabled: boolean;
                key: process.env.DBD_SECRET_KEY;
            };
        };
    };
}
