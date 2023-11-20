export const apiKey = "d76b3ae360ff4efab4480226233110";
import { Alert } from "react-native";

export const weatherImages = {
  "Partly cloudy": require("../assets/images/partlycloudy.png"),
  "Moderate rain": require("../assets/images/moderaterain.png"),
  "Patchy rain possible": require("../assets/images/moderaterain.png"),
  Sunny: require("../assets/images/sun.png"),
  Clear: require("../assets/images/sun.png"),
  Overcast: require("../assets/images/cloud.png"),
  Cloudy: require("../assets/images/cloud.png"),
  "Light rain": require("../assets/images/moderaterain.png"),
  "Moderate rain at times": require("../assets/images/moderaterain.png"),
  "Heavy rain": require("../assets/images/heavyrain.png"),
  "Heavy rain at times": require("../assets/images/heavyrain.png"),
  "Moderate or heavy freezing rain": require("../assets/images/heavyrain.png"),
  "Moderate or heavy rain shower": require("../assets/images/heavyrain.png"),
  "Moderate or heavy rain with thunder": require("../assets/images/heavyrain.png"),
  Mist: require("../assets/images/mist.png"),
  other: require("../assets/images/moderaterain.png"),
};

export const airQualityText = (value) => {
  if (value < 600) return { text: "Good", color: "#4ade80" };
  if (value < 900) return { text: "Normal", color: "#facc15" };
  if (value < 1500) return { text: "Bad", color: "#f87171" };
  return { text: "Dangerous", color: "#c084fc" };
};

export const locations = [
  {
    name: "Ha Noi",
    country: "Vietnam",
    temp: 30.2,
  },
  {
    name: "Ho Chi Minh",
    country: "Vietnam",
    temp: 32.2,
    gas: 1021,
    humidity: 78,
  },
  {
    name: "Hue",
    country: "Vietnam",
    temp: 29.5,
    gas: 896,
    humidity: 66,
  },
  {
    name: "London",
    country: "England",
    temp: 29.5,
    gas: 569,
    humidity: 66,
  },
];
export const createAlert = () =>
  Alert.alert("Warning", "Couldn't find any other location!", [
    { text: "OK", onPress: () => console.log("OK Pressed") },
  ]);
