import React,{useState} from 'react';
import { View,TouchableOpacity,NativeModules,Text  } from 'react-native';
import PushNotificationHelper from './helpers/pushNotificationHelper';
import { ListProvider } from "./Contexts/ListContext";
import StepList from './StepList';
import styles from './style.scss';

const theme = {
  primary: 'green',
  contrast: 'white',
  secondary: 'green'
}
export default function App() {

  const [state,setState] = useState(0);
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

    <StepList theme={theme}/>
    <TouchableOpacity style={styles.reset} onPress={() => reset()}><Text>Reset</Text></TouchableOpacity>
    </View>
    </ListProvider>
  );
}
