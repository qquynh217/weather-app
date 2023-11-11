import * as Notifications from "expo-notifications";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { CalendarDaysIcon } from "react-native-heroicons/solid";
import * as Progress from "react-native-progress";
import { SafeAreaView } from "react-native-safe-area-context";
import { generateText, sendPushNotification } from "../api/notification";
import { fetchWeatherForecast } from "../api/weather";
import { weatherImages } from "../constants";
import { theme } from "../theme";
import { db, onValue, ref } from "../utils/firebase";

export default function HomeScreen() {
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
  }, []);
  useEffect(() => {
    fetchData();
  }, [db]);
  if (new Date().getHours() == 10 && new Date().getMinutes() == 10) {
    console.log("condition", current?.condition?.text);
    sendPushNotification(
      token,
      "Environment Monitor",
      generateText(env.temp, env.gas, current?.condition?.text)
    );
  }
  const fetchData = () => {
    const data = ref(db);
    onValue(data, (snapshot) => {
      setEnv({
        gas: snapshot.val().gas,
        humidity: snapshot.val().humidity,
        temp: snapshot.val().temp,
      });
    });
  };
  const fetchMyWeatherData = async () => {
    // let myCity = await getData("city");
    let cityName = "Ha Noi";
    fetchWeatherForecast({
      cityName,
      days: "7",
    }).then((data) => {
      // console.log('got data: ',data.forecast.forecastday);
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
              Ha Noi,
              <Text className="text-lg font-semibold text-gray-300">
                Vietnam
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
              <Text className="text-center text-white text-xl tracking-widest">
                {current?.condition?.text}
              </Text>
            </View>

            {/* other stats */}
            <View className="flex-row justify-between mx-4">
              <View className="flex-row space-x-2 items-center">
                <Image
                  source={require("../assets/icons/wind.png")}
                  className="w-6 h-6"
                />
                <Text className="text-white font-semibold text-base">
                  {env?.gas} gas
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
              <View className="flex-row space-x-2 items-center">
                <Image
                  source={require("../assets/icons/sun.png")}
                  className="w-6 h-6"
                />
                <Text className="text-white font-semibold text-base">
                  {weather?.forecast?.forecastday[0]?.astro?.sunrise}
                </Text>
              </View>
            </View>
          </View>

          {/* forecast for next days */}
          <View className="mb-2 space-y-3">
            <View className="flex-row items-center mx-5 space-x-2">
              <CalendarDaysIcon size="22" color="white" />
              <Text className="text-white text-base">Daily forecast</Text>
            </View>
            <ScrollView
              horizontal
              contentContainerStyle={{ paddingHorizontal: 15 }}
              showsHorizontalScrollIndicator={false}
            >
              {weather?.forecast?.forecastday?.map((item, index) => {
                const date = new Date(item.date);
                const options = { weekday: "long" };
                let dayName = date.toLocaleDateString("en-US", options);
                dayName = dayName.split(",")[0];

                return (
                  <View
                    key={index}
                    className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                    style={{ backgroundColor: theme.bgWhite(0.15) }}
                  >
                    <Image
                      // source={{uri: 'https:'+item?.day?.condition?.icon}}
                      source={
                        weatherImages[item?.day?.condition?.text || "other"]
                      }
                      className="w-11 h-11"
                    />
                    <Text className="text-white">{dayName}</Text>
                    <Text className="text-white text-xl font-semibold">
                      {item?.day?.avgtemp_c}&#176;
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
}
