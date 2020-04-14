import React,{useEffect,useState} from 'react';
import { StyleSheet, Text,SafeAreaView,View  } from 'react-native';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { Notifications } from 'expo';
import styles from './style.scss';
import PushNotificationHelper from './helpers/pushNotificationHelper';
export default function App() {
  const [expoPushToken,setExpoPushToken] = useState(null);
  setTimeout(x=>{
    PushNotificationHelper.registerForPushNotificationsAsync();

  },2000);
  setTimeout(x=>{

    //PushNotificationHelper.sendPushNotification("Wow","amazing");
    console.log("push");
  },5000);
  return (
    <SafeAreaView style={styles.container}>
    <View style={{...styles.headingbox}}>
    <Text style={styles.heading}>Make a sourdought</Text>
    </View>
      <View style={{...styles.active,...styles.box}}>
      <Text style={styles.text}>Step 1</Text>
      </View>
      <View style={styles.box2}>
      <Text style={styles.text}>Step 2</Text>
      </View>
      <View style={styles.box}>
      <Text style={styles.text}>Step </Text>
      </View>
    </SafeAreaView>
  );
}
