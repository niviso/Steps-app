import React,{useContext,useState} from 'react';
import { View,TouchableHighlight,TouchableOpacity,Text  } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { ListContext } from "../../contexts/ListContext";
import styles from '../../style.scss';
import moment from 'moment';
import Moment from 'react-moment';
import { SimpleAnimation } from 'react-native-simple-animations';

export default function Row(props) {
  const {data,sortHandlers,edit,lastAction,editFunc} = props;
  const [state,setState] = useContext(ListContext);
  const active = state.lists[0].activeItemId === data.id;
  FilterState = (data) => {
      if(!edit){
        return;
      }
      var result = JSON.parse(JSON.stringify(state));
      result.lists[0].contents = result.lists[0].contents.filter(obj => obj.id !== data.id );
      result.lists[0].lastAction = 'delete';
      setState(result);
  }

  CompleteItem = (id) => {
    if(edit){
      return;
    }
      var result = JSON.parse(JSON.stringify(state));
      for(let i=0;i!=result.lists[0].contents.length;i++){
        if(result.lists[0].contents[i].id == id){
          result.lists[0].contents[i].complete = true;
          if(result.lists[0].contents[i+1] && result.lists[0].activeItemId == id){
            result.lists[0].activeItemId = result.lists[0].contents[i+1].id;
          }
          break;
        }
      }
      result.lists[0].lastAction = 'complete';
      setState(result);
  }

    return (
      <View style={styles.boxWrapper}>
      <View style={{opacity: data.complete ? 0.3 : 1,...styles.box}}>
      {data.draggable && (
        <TouchableHighlight
          underlayColor={'#fff'}
          style={styles.dragHandler}
          {...edit ? sortHandlers : null}
        >
        <SimpleAnimation friction={4} animateOnUpdate={lastAction == 'toggle' ? true : false} duration={500} distance={10} staticType="zoom" movementType="spring" aim={edit ? "in" : "out"} direction="right">
          <Text><FontAwesome  name="bars"  size={20} /></Text>
          </SimpleAnimation>
        </TouchableHighlight>
      )}

      <TouchableOpacity style={styles.TextBox} onPress={() => edit ? editFunc(data.id) : CompleteItem(data.id)}>
      {edit && <Text style={{fontSize: 8, textDecorationLine: 'underline',marginBottom: 2}}>Click to edit text</Text> }
      <Text style={{...styles.text,textDecorationLine:  data.complete ? 'line-through' : 'none'}}>{data.id + ": " + data.text}</Text>
      </TouchableOpacity>
      {data.draggable && (
        <TouchableHighlight underlayColor={'#fff'} activeOpacity={1.0} onPress={(e) => FilterState(data)} style={styles.dragHandler}>
        <SimpleAnimation friction={4} animateOnUpdate={lastAction == 'toggle' ? true : false} duration={500} distance={10} staticType="zoom" movementType="spring" aim={edit ? "in" : "out"} direction="left">
          {edit &&(
          <Text><FontAwesome  name="trash"  size={20} /></Text>
          )}
          </SimpleAnimation>

        </TouchableHighlight>

      )}
    </View>

    {active && !data.complete && (
    <View  style={[{...styles.time},
        !data.timestamp && {display: 'none'}]}><Text><Moment element={Text} fromNow>
        {moment().format('YYYY-MM-DD') + "T" + data.timestamp}
    </Moment></Text></View>
  )}
    </View>
    )
}
