import { StyleSheet } from "react-native";
export const theme = {
  bgWhite: (opacity) => `rgba(255,255,255, ${opacity})`,
  linear: () => "linear-gradient(to right,green, yellow)",
};
export const page = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 15,
  },
  text: {
    fontWeight: "600",
  },
  bar: {
    width: "100%",
    height: 20,
    display: "flex",
    flexDirection: "row",
  },
  green: {
    width: "30%",
    height: 20,
    background: "linear-gradient(to right,green, yellow);",
  },
  yellow: {
    width: "15%",
    height: 20,
    background: "linear-gradient(to right, yellow,red);",
  },
  red: {
    width: "30%",
    height: 20,
    background: "linear-gradient(to right,red, purple);",
  },
  purple: {
    width: "25%",
    height: 20,
    background: "linear-gradient(to right,purple,purple);",
  },
});
