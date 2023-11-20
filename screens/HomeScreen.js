import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import {
  GlobeAsiaAustraliaIcon,
  PlusCircleIcon,
} from "react-native-heroicons/solid";
import * as Progress from "react-native-progress";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchWeatherForecast } from "../api/weather";
import {
  airQualityText,
  createAlert,
  locations,
  weatherImages,
} from "../constants";
import { page, theme } from "../theme";
import { db, onValue, ref } from "../utils/firebase";

const locationIcon = require("../assets/icons/location.png");
export default function HomeScreen() {
  const [location, setLocation] = useState(locations[0]);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState({});
  const [env, setEnv] = useState({
    gas: 0,
    humidity: 0,
    temp: 0,
  });
  const { current } = weather;
  const token = "ExponentPushToken[r1r10oHPyGjCsuqxJ8b6CP]";
  useEffect(() => {
    fetchMyWeatherData();
  }, [location.name]);
  useEffect(() => {
    // console.log(location.name);
    fetchData();
  }, [db, location.name]);

  const fetchData = () => {
    const data = ref(db);
    if (location.name == "Ha Noi") {
      onValue(data, (snapshot) => {
        setEnv({
          gas: snapshot.val().gas,
          humidity: snapshot.val().humidity,
          temp: snapshot.val().temp,
        });
      });
    }
  };
  const fetchMyWeatherData = async () => {
    let cityName = location.name;
    // let myCity = await getData("city");
    fetchWeatherForecast({
      cityName,
      days: "7",
    }).then((data) => {
      // console.log("got data: ", data);
      if (location.name != "Ha Noi") {
        setEnv({
          gas: location.gas,
          humidity: data.current.humidity,
          temp: data.current.temp_c,
        });
      }
      setWeather(data);
      setLoading(false);
    });
  };

  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />
      <Image
        blurRadius={70}
        source={require("../assets/images/bg.png")}
        className="absolute w-full h-full"
      />
      {loading ? (
        <View className="flex-1 flex-row justify-center items-center">
          <Progress.CircleSnail thickness={10} size={140} color="#0bb3b2" />
        </View>
      ) : (
        <SafeAreaView className="flex flex-1">
          {/* search section */}

          {/* forecast section */}
          <View className="mx-4 flex justify-around flex-1 mb-2">
            {/* location */}
            <Text className="text-white text-center text-2xl font-bold">
              {location.name},
              <Text className="text-lg font-semibold text-gray-300">
                {location.country}
              </Text>
            </Text>
            {/* weather icon */}
            <View className="flex-row justify-center">
              <Image
                // source={{uri: 'https:'+current?.condition?.icon}}
                source={weatherImages[current?.condition?.text || "other"]}
                className="w-52 h-52"
              />
            </View>
            {/* degree celcius */}
            <View className="space-y-2">
              <Text className="text-center font-bold text-white text-6xl ml-5">
                {env?.temp}&#176;
              </Text>
              {/*<Text className="text-center text-white text-xl tracking-widest">
                {current?.condition?.text}
              </Text>*/}
            </View>

            {/* other stats */}
            <View className="flex-row justify-between mx-4">
              <View className="flex-row space-x-2 items-center">
                <Image
                  source={require("../assets/icons/wind.png")}
                  className="w-6 h-6"
                />
                <Text className="text-white font-semibold text-base">
                  {env?.gas} (AQI)
                </Text>
              </View>
              <View className="flex-row space-x-2 items-center">
                <Image
                  source={require("../assets/icons/drop.png")}
                  className="w-6 h-6"
                />
                <Text className="text-white font-semibold text-base">
                  {env?.humidity}%
                </Text>
              </View>
            </View>
            <View style={page.container}>
              <View className="max-w-full h-5 flex-row relative">
                <View
                  className="absolute h-6 w-2 bg-white z-50 -translate-y-0.5"
                  style={{
                    left: `${(env.gas / 2000) * 100}%`,
                  }}
                ></View>
                <LinearGradient
                  start={{ x: -1, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={["#22c55e", "#22c55e", "#facc15"]}
                  className="h-5"
                  style={{ width: "30%" }}
                ></LinearGradient>
                <LinearGradient
                  start={{ x: -1, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={["#facc15", "#facc15", "#ef4444"]}
                  className="h-5"
                  style={{ width: "20%" }}
                ></LinearGradient>
                <LinearGradient
                  start={{ x: -1, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={["#ef4444", "#ef4444", "#ef4444", "#6b21a8"]}
                  className="h-5"
                  style={{ width: "30%" }}
                ></LinearGradient>
                <LinearGradient
                  start={{ x: -1, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={["#6b21a8", "#6b21a8", "#6b21a8", "#411463"]}
                  className="h-5"
                  style={{ width: "20%" }}
                ></LinearGradient>
              </View>
              <Text
                style={{
                  color: airQualityText(env.gas).color,
                }}
                className={"text-white text-xl font-semibold"}
              >
                {airQualityText(env.gas).text} air quality
              </Text>
            </View>
          </View>
          {/* other zone */}
          <View className="mb-2 space-y-3">
            <View className="flex-row items-center mx-5 space-x-2">
              <GlobeAsiaAustraliaIcon size="22" color="white" />
              <Text className="text-white text-base">Your zone</Text>
            </View>
            <ScrollView
              horizontal
              contentContainerStyle={{ paddingHorizontal: 15 }}
              showsHorizontalScrollIndicator={false}
            >
              {locations.map((item, index) => {
                // const date = new Date(item.date);
                // const options = { weekday: "long" };
                // let dayName = date.toLocaleDateString("en-US", options);
                // dayName = dayName.split(",")[0];

                return (
                  <Pressable
                    key={index}
                    className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                    style={{
                      backgroundColor:
                        item.name == location.name
                          ? theme.bgWhite(0.4)
                          : theme.bgWhite(0.15),
                    }}
                    onPress={() => {
                      setLocation(item);
                    }}
                  >
                    <Image
                      // source={{uri: 'https:'+item?.day?.condition?.icon}}
                      source={locationIcon}
                      className="w-11 h-11"
                    />
                    <Text className="text-white">{item.name}</Text>
                    <Text className="text-white text-xl font-semibold">
                      {item.temp}&#176;
                    </Text>
                  </Pressable>
                );
              })}
              <Pressable
                className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                style={{ backgroundColor: theme.bgWhite(0.15) }}
                onPress={createAlert}
              >
                <PlusCircleIcon size="44" color="white" />
              </Pressable>
            </ScrollView>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
}
