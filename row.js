import React,{useContext} from 'react';
import { View,TouchableHighlight,Text  } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { ListContext } from "./Contexts/ListContext";
import styles from './style.scss';
import moment from 'moment';
import Moment from 'react-moment';
import { SimpleAnimation } from 'react-native-simple-animations';


export default function Row(props) {
  const {data,sortHandlers,edit,lastAction} = props;
  console.log("LATEST ACTION",data.lastAction);

  const [state,setState] = useContext(ListContext);
  FilterState = (data) => {
      const result = state.lists[0].contents.filter(obj => obj !== data );
      result.lists[0].lastAction = 'delete';
      setState(result);
  }
    return (
      <View style={styles.boxWrapper}>
      <View style={styles.box}>
      {data.draggable && (
        <TouchableHighlight
          underlayColor={'#fff'}
          style={styles.dragHandler}
          {...edit ? sortHandlers : null}
        >
        <SimpleAnimation animateOnUpdate={lastAction == 'toggle' ? true : false} duration={250} distance={20} movementType="slide" aim={edit ? "in" : "out"} direction="right">
          <Text><FontAwesome  name="bars"  size={20} /></Text>
          </SimpleAnimation>
        </TouchableHighlight>
      )}
      <Text style={styles.text}>{data.text}</Text>
      {data.draggable && (
        <TouchableHighlight underlayColor={'#fff'} activeOpacity={1.0} onPress={(e) => console.log("click")} style={styles.dragHandler}>
        <SimpleAnimation animateOnUpdate={lastAction == 'toggle' ? true : false} duration={250} distance={20} movementType="slide" aim={edit ? "in" : "out"} direction="left">
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
