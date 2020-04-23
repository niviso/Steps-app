import React,{useEffect,useState,useContext} from 'react';
let { View, Text, TouchableHighlight } = require('react-native')
import styles from './style.scss';

import { FontAwesome } from '@expo/vector-icons';
import moment from 'moment';
import Moment from 'react-moment';
import { ListContext } from "./Contexts/ListContext";

export default function Row(props) {
  const [state,setState] = useContext(ListContext);
  FilterState = (text) => {
    let newData = JSON.parse(JSON.stringify(state));
    const result = newData.filter(row => row.text !== text);

    setState(result);
  }


    return (
      <View style={styles.boxWrapper}>
      <View style={styles.box}>
      {props.data.draggable && (
        <TouchableHighlight
          underlayColor={'none'}
          style={styles.dragHandler}
          {...props.sortHandlers}
        >
          <Text><FontAwesome  name="bars"  size={20} /></Text>
        </TouchableHighlight>
      )}
      <Text style={styles.text}>{props.data.text}</Text>
      {props.data.draggable && (
        <TouchableHighlight underlayColor="inherit" activeOpacity={1.0}        onPress={() => FilterState(props.data.text)} style={styles.dragHandler}>
          <Text><FontAwesome  name="trash"  size={20} /></Text>
        </TouchableHighlight>
      )}
    </View>


    <View  style={[{...styles.time},
        !props.data.timestamp && {display: 'none'}]}><Text><Moment element={Text} fromNow>
        {moment().format('YYYY-MM-DD') + "T" + props.data.timestamp}
    </Moment></Text></View></View>
    )
}
