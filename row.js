import React,{useContext} from 'react';
import { View,TouchableHighlight,Text  } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { ListContext } from "./Contexts/ListContext";
import styles from './style.scss';
import moment from 'moment';
import Moment from 'react-moment';


export default function Row(props) {
  const [state,setState] = useContext(ListContext);
  FilterState = (data) => {
    let newData = JSON.parse(JSON.stringify(state));
    let result = {}
    try{
      for(let step in newData){
        if(step != data){
          result = {...result,newData[step]}
        }
      }
      setState(result);
    } catch (e) {console.log(e);}
  }

    return (
      <View style={styles.boxWrapper}>
      <View style={styles.box}>
      {props.data.draggable && (
        <TouchableHighlight
          underlayColor={'#fff'}
          style={styles.dragHandler}
          {...props.sortHandlers}
        >
          <Text><FontAwesome  name="bars"  size={20} /></Text>
        </TouchableHighlight>
      )}
      <Text style={styles.text}>{props.data.text}</Text>
      {props.data.draggable && (
        <TouchableHighlight underlayColor={'#fff'} activeOpacity={1.0}        onPress={() => FilterState(props.data)} style={styles.dragHandler}>
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
