export default {
    expo: {
        name: "expense-logger-app",
        slug: "expense-logger-app",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/icon.png",
        userInterfaceStyle: "light",
        newArchEnabled: true,
        scheme: "expenselogger",
        splash: {
            image: "./assets/splash-icon.png",
            resizeMode: "contain",
            backgroundColor: "#ffffff"
        },
        ios: {
            supportsTablet: true,
            bundleIdentifier: "com.expenselogger.app"
        },
        android: {
            adaptiveIcon: {
                foregroundImage: "./assets/adaptive-icon.png",
                backgroundColor: "#ffffff"
            },
            package: "com.expenselogger.app"
        },
        web: {
            favicon: "./assets/favicon.png"
        },
        extra: {
            googleClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
            googleAndroidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
            googleIosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
            authRedirectUri: process.env.EXPO_PUBLIC_AUTH_REDIRECT_URI,
        },
    },
};
