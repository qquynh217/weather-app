import axios from "axios";

const EXPO_SERVER_URL = 'https://api.expo.dev/v2/push/send'

export const sendPushNotification = async(token,title,body)=>{
    const message = {
        to: token,
        sound: 'default',
        title,
        body
    }
    await axios.post(EXPO_SERVER_URL,message)
}
export const generateText = (temp,gas,condition)=>{
    if(condition?.toLowerCase().includes("rain")){
        if(temp < 20){
            if(gas > 700){
                return 'It\'s going to rain and cold width bad air condition, you should wear a raincoat!'
            }
            return 'It\'s going to rain and cold, you should wear a raincoat and warm clothes!'
        } else {
            return 'It\'s going to rain, you should wear a raincoat!'
        }
    }
    return 'It seems the weather is very nice today. Let\'s go out and play'
}