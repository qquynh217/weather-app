import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import AppNavigation from "./navigation/appNavigation";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { useEffect } from "react";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
async function getNotificationToken() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
  const { status } = await Notifications.getPermissionsAsync();
  if (status != "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status != "granted") {
      alert("failed to get notification token");
      return;
    }
  }
  const tokenData = await Notifications.getExpoPushTokenAsync();
  const token = tokenData.data;
  console.log({ token });
  return token;
}

export default function App() {
  // useEffect(()=>{
  //   getNotificationToken()
  // },[])
  return <AppNavigation />;
}
