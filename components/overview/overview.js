import React,{useContext,useEffect,useState} from 'react';
import { View,TouchableOpacity,NativeModules,Text,SafeAreaView  } from 'react-native';
import styles from './style.scss';
import Header from '../header/header';
import { ListContext } from "../../contexts/ListContext";


export default function Overview(props){
  const [state,setState] = useContext(ListContext);

  return(
    <View>
    <Header theme={state.lists[0].theme}/>
    </View>
  )


}
