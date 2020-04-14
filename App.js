import React,{useEffect,useState} from 'react';
import { StyleSheet, Text,SafeAreaView,View,TouchableOpacity  } from 'react-native';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { Notifications } from 'expo';
import styles from './style.scss';
import PushNotificationHelper from './helpers/pushNotificationHelper';
export default function App() {
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

  deleteStep = (id) => {
    const newSteps = steps.filter((step) => {
      return step.id != id
    });
    setSteps(newSteps);
    console.log("delete");
  }
  generateBox = (step) => {
    return (
      <TouchableOpacity onPress={()=> deleteStep(step.id)}  onLongPress={()=> deleteStep(step.id)} style={{...styles.box,backgroundColor: step.id % 2 ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.3)'}}>

    <View key={step.id}>
    <Text style={styles.text}>{step.text}</Text>
    </View>
    </TouchableOpacity>

  )
  }

  const listItems = steps.map((step,index) =>
    generateBox(step)
  );
  return (
    <SafeAreaView style={styles.container}>
    <View style={{...styles.headingbox}}>
    <Text style={styles.heading}>Make a sourdought</Text>
    </View>

    {listItems}
    </SafeAreaView>
  );
}
