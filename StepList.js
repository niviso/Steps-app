import SortableListView from 'react-native-sortable-listview'
import React,{useEffect,useState,useContext} from 'react';
import { View,TouchableOpacity,NativeModules,Text  } from 'react-native';
import styles from './style.scss';
import { FontAwesome } from '@expo/vector-icons';
import moment from 'moment';
import Moment from 'react-moment';
import Row from './row';
import { ListContext } from "./Contexts/ListContext";

function StepList(props){
  const {theme} = props;
  const [state,setState] = useContext(ListContext);
  let order = Object.keys(state) //Array of keys

    return (
      <View style={styles.container}>
        <View style={{backgroundColor: theme.primary,...styles.heading}} ><Text style={{color: theme.contrast,...styles.headingText}}>Surdegsbröd</Text></View>
      <SortableListView
        style={styles.maxWidth}
        data={state}
        order={order}
        limitScrolling={false}
        disableSorting={false}
        onRowMoved={e => {
          order.splice(e.to, 0, order.splice(e.from, 1)[0])

        }}
        renderRow={row => <Row data={row} />}
      />
      </View>
    )
}

export default StepList
