import React,{useContext} from 'react';
import SortableListView from 'react-native-sortable-listview'
import { View,Text,TouchableHighlight } from 'react-native';
import styles from './style.scss';
import Row from './row';
import { ListContext } from "./Contexts/ListContext";

function StepList(props){
  const [state,setState] = useContext(ListContext);
  let order = Object.keys(state.lists[0].contents); //Array of keys
  ToggleEdit = () => {
    var tmp = JSON.parse(JSON.stringify(state));
    tmp.lists[0].edit = !tmp.lists[0].edit;
    setState(tmp);
  }
  UpdateState = (newData) => {
    console.log(newData);
    var tmp = JSON.parse(JSON.stringify(state));
    tmp.lists[0].contents = newData;
    setState(tmp);
  }
  ArrayMove = (arr, old_index, new_index) => {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
  }
    return (
      <View style={styles.container}>
        <View style={{backgroundColor: state.lists[0].theme.primary,...styles.heading}} ><Text style={{color: state.lists[0].theme.contrast,...styles.headingText}}>Surdegsbröd</Text></View>
      <SortableListView
        style={styles.maxWidth}
        data={state.lists[0].contents}
        order={order}
        limitScrolling={false}
        disableSorting={false}
        onRowMoved={e => {
          var newOrder = ArrayMove(state.lists[0].contents,e.from,e.to);
          UpdateState(newOrder);
        }}
        renderRow={row => <Row edit={state.lists[0].edit} data={row} />}
      />
      <TouchableHighlight onPress={() => ToggleEdit()} style={styles.controlls}>

      <Text>Toggle edit</Text>
      </TouchableHighlight>
      </View>
    )
}

export default StepList
