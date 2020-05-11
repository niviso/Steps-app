import React,{useContext,useEffect,useState} from 'react';
import SortableListView from 'react-native-sortable-listview'
import { View,Text,SafeAreaView } from 'react-native';
import styles from './style.scss';

export default function Header(props){
  const {theme} = props;

  return(
    <SafeAreaView style={{backgroundColor: theme.primary,...styles.heading}} >
      <Text style={{color: theme.contrast,...styles.headingText}}>Surdegsbröd</Text>
    </SafeAreaView>

  )
}
