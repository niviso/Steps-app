import React,{useState} from 'react';
import PushNotificationHelper from './helpers/pushNotificationHelper';
import { ListProvider } from "./contexts/ListContext";
import List from './components/list/list';
import DefaultView from './views/default-view/default-view';
export default function App() {

  setTimeout(x=>{
    PushNotificationHelper.registerForPushNotificationsAsync();
  },2000);

  return (
    <ListProvider>
      <DefaultView/>
    </ListProvider>
  );
}
