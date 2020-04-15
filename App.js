import React,{useEffect,useState} from 'react';
import { StyleSheet, Text,SafeAreaView,View,TouchableOpacity,NativeModules  } from 'react-native';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { Notifications } from 'expo';
import styles from './style.scss';
import PushNotificationHelper from './helpers/pushNotificationHelper';
import Example from './example';
import { ListProvider } from "./Contexts/ListContext";

export default function App() {
  const reset = () => {
      NativeModules.DevSettings.reload();
  }
  const [steps,setSteps] = useState([
    {
      id: 1,
      text:'Step 1',
      time: 0
    },
    {
      id: 2,
      text:'Step 2',
      time: 30
    }
    ,
    {
      id: 3,
      text:'Step 3',
      time: 30
    }
    ,
    {
      id: 4,
      text:'Step 4',
      time: 30
    }
  ]);

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
