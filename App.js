import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { PermissionsAndroid } from 'react-native';
import PushNotification from "react-native-push-notification";

//screens
import Drw from './src/routes/Drw';


export default function App() {

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Azkaar Reminder App wants Location Permission",
          message:
            "Location is needed to show you your Prayer time according to he location",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the Location");
      } else {
        console.log("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const createChannels = () => {
    PushNotification.createChannel(
      {
        channelId: 'Azan-Notification-Channel',
        vibrate: true,
        playSound: true,
        channelName: 'Namaz time'
      }
    )
  }

  React.useEffect(() => {
    requestLocationPermission();
    createChannels();
  }, [])

  return (
    <NavigationContainer>
      <Drw />
    </NavigationContainer>
  )
}
