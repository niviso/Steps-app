import SortableListView from 'react-native-sortable-listview'
import React,{useEffect,useState,useContext} from 'react';
let { View, Text, TouchableHighlight } = require('react-native')
import styles from './style.scss';
import { FontAwesome } from '@expo/vector-icons';

import { ListContext } from "./Contexts/ListContext";
let exampleData = {
  hello: { text: 'world' },
  how: { text: 'are you' },
  test: { text: 123 },
  this: { text: 'is' },
  a: { text: 'a' },
  real: { text: 'real' },
  drag: { text: 'drag and drop' },
  bb: { text: 'bb' },
  cc: { text: 'cc' },
  dd: { text: 'dd' },
  ee: { text: 'ee' },
  ff: { text: 'ff' },
  gg: { text: 'gg' },
  hh: { text: 'hh' },
  ii: { text: 'ii' },
  jj: { text: 'jj' },
  kk: { text: 'kk' },
}


function RowComponent(props) {
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
      <Text><FontAwesome  name="bars"  size={20} />
</Text>
      </TouchableHighlight>
    )}
      <Text style={styles.text}>{props.data.text}</Text>
      {props.data.draggable && (

      <TouchableHighlight
      underlayColor="inherit"
activeOpacity={1.0}        onPress={() => FilterState(props.data.text)}
        style={styles.dragHandler}
      >
      <Text><FontAwesome  name="trash"  size={20} /></Text>
      </TouchableHighlight>
    )}
    </View>


      <View style={styles.time}><Text style={styles.text}>{props.time && props.time.toString()}min</Text></View></View>
    )

}

function Example(props){
  const [state,setState] = useContext(ListContext);
  let order = Object.keys(state) //Array of keys

    return (
      <SortableListView
        style={styles.maxWidth}
        data={state}
        order={order}
        limitScrolling={false}
        disableSorting={false}
        onRowMoved={e => {
          order.splice(e.to, 0, order.splice(e.from, 1)[0])

        }}
        renderRow={row => <RowComponent data={row} />}
      />
    )
}

export default Example
