import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

// Register for redirect URI
WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }: any) => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: Constants.expoConfig?.extra?.googleClientId,
    androidClientId: Constants.expoConfig?.extra?.googleAndroidClientId,
    iosClientId: Constants.expoConfig?.extra?.googleIosClientId,
    redirectUri: Constants.expoConfig?.extra?.authRedirectUri,
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      handleSignIn(authentication?.accessToken);
    }
  }, [response]);

  const handleSignIn = async (accessToken: string | undefined) => {
    if (!accessToken) return;

    try {
      const userInfoResponse = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const userInfo = await userInfoResponse.json();
      await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
      navigation.replace("AddExpense");
    } catch (error) {
      console.log("Error fetching user info:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense Logger</Text>
      <TouchableOpacity
        style={styles.googleButton}
        onPress={() => promptAsync()}
        disabled={!request}
      >
        <Image
          source={{ uri: "https://www.google.com/favicon.ico" }}
          style={styles.googleIcon}
        />
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  buttonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default LoginScreen;
