import React,{useEffect,useState} from 'react';
import { View,TouchableOpacity,NativeModules,Text  } from 'react-native';
import styles from './style.scss';
import PushNotificationHelper from './helpers/pushNotificationHelper';
import Example from './example';
import { ListProvider } from "./Contexts/ListContext";

export default function App() {
  const reset = () => {
      NativeModules.DevSettings.reload();
  }


  setTimeout(x=>{
    PushNotificationHelper.registerForPushNotificationsAsync();

  },2000);
  setTimeout(x=>{

    //PushNotificationHelper.sendPushNotification("Wow","amazing");
    console.log("push");
  },5000);



  return (
    <ListProvider>
    <View style={styles.container}>
    <Example/>
    <TouchableOpacity style={styles.reset} onPress={() => reset()}><Text>Reset</Text></TouchableOpacity>
    </View>
    </ListProvider>
  );
}
