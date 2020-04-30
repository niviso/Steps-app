import React,{useContext} from 'react';
import { View,TouchableHighlight,TouchableOpacity,Text  } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { ListContext } from "./Contexts/ListContext";
import styles from './style.scss';
import moment from 'moment';
import Moment from 'react-moment';
import { SimpleAnimation } from 'react-native-simple-animations';


export default function Row(props) {
  const {data,sortHandlers,edit,lastAction} = props;

  const [state,setState] = useContext(ListContext);
  FilterState = (data) => {
      if(!edit){
        return;
      }
      var result = JSON.parse(JSON.stringify(state));
      result.lists[0].contents = result.lists[0].contents.filter(obj => obj.id !== data.id );
      result.lists[0].lastAction = 'delete';
      setState(result);
  }

  IsComplete = (id) => {
    if(edit){
      return;
    }
      var result = JSON.parse(JSON.stringify(state));
      for(let i=0;i!=result.lists[0].contents.length;i++){
        if(result.lists[0].contents[i].id == id){
          result.lists[0].contents[i].complete = !result.lists[0].contents[i].complete;
        }
      }
      result.lists[0].lastAction = 'complete';
      setState(result);
  }

    return (
      <View style={{...styles.boxWrapper,opacity: data.complete ? 0.3 : 1}}>
      <View style={styles.box}>
      {data.draggable && (
        <TouchableHighlight
          underlayColor={'#fff'}
          style={styles.dragHandler}
          {...edit ? sortHandlers : null}
        >
        <SimpleAnimation friction={4} animateOnUpdate={lastAction == 'toggle' ? true : false} duration={500} distance={40} staticType="zoom" movementType="spring" aim={edit ? "in" : "out"} direction="right">
          <Text><FontAwesome  name="bars"  size={20} /></Text>
          </SimpleAnimation>
        </TouchableHighlight>
      )}

      <TouchableOpacity style={styles.TextBox} onPress={() => IsComplete(data.id)}>
      <Text style={{...styles.text,textDecorationLine:  data.complete ? 'line-through' : 'none'}}>{data.text}</Text>
      </TouchableOpacity>
      {data.draggable && (
        <TouchableHighlight underlayColor={'#fff'} activeOpacity={1.0} onPress={(e) => FilterState(data)} style={styles.dragHandler}>
        <SimpleAnimation friction={4} animateOnUpdate={lastAction == 'toggle' ? true : false} duration={500} distance={40} staticType="zoom" movementType="spring" aim={edit ? "in" : "out"} direction="left">
          {edit &&(
          <Text><FontAwesome  name="trash"  size={20} /></Text>
          )}
          </SimpleAnimation>

        </TouchableHighlight>

      )}
    </View>


    <View  style={[{...styles.time},
        !data.timestamp && {display: 'none'}]}><Text><Moment element={Text} fromNow>
        {moment().format('YYYY-MM-DD') + "T" + data.timestamp}
    </Moment></Text></View></View>
    )
}
