import React,{useState} from 'react';
import { View,TouchableOpacity,NativeModules,Text  } from 'react-native';
import PushNotificationHelper from './helpers/pushNotificationHelper';
import { ListProvider } from "./contexts/ListContext";
import List from './components/list/list';
import styles from './style.scss';

export default function App() {
  const mode = 'normal';

  const [state,setState] = useState(0);



  setTimeout(x=>{
    PushNotificationHelper.registerForPushNotificationsAsync();
  },2000);



  return (
    <ListProvider>
    <View style={styles.container}>
    <List/>
    </View>
    </ListProvider>
  );
}
