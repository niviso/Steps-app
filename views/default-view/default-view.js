import React,{useState} from 'react';
import Overview from '../../components/overview/overview';
import List from '../../components/list/list';

import { View,TouchableOpacity,NativeModules,Text  } from 'react-native';


export default function defaultView(props){
  return(
    <View>
      <Overview/>
    </View>
  )


}
