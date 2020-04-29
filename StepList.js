import React,{useContext,useEffect} from 'react';
import SortableListView from 'react-native-sortable-listview'
import { View,Text,TouchableHighlight } from 'react-native';
import styles from './style.scss';
import Row from './row';
import { ListContext } from "./Contexts/ListContext";
import ArrayHelper from './helpers/arrayHelper';
function StepList(props){
  const [state,setState] = useContext(ListContext);
  var order = Object.keys(state.lists[0].contents); //Array of keys
  ToggleEdit = () => {
    var tmp = JSON.parse(JSON.stringify(state));
    tmp.lists[0].edit = !tmp.lists[0].edit;
    tmp.lists[0].lastAction = 'toggle';
    setState(tmp);
  }
  UpdateState = (newData) => {
    var tmp = JSON.parse(JSON.stringify(state));
    tmp.lists[0].contents = newData;
    tmp.lists[0].lastAction = 'order';
    setState(tmp);
  }

  UpdateContents = (from,to) => {
    var newOrder = ArrayHelper.MoveIndex(state.lists[0].contents,from,to);
    UpdateState(newOrder);
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
          UpdateContents(e.from,e.to);
        }}
        renderRow={row => <Row edit={state.lists[0].edit} lastAction={state.lists[0].lastAction} data={row} />}
      />
      <TouchableHighlight underlayColor={'none'} onPress={() => ToggleEdit()} style={{...styles.controlls,backgroundColor: state.lists[0].edit ? 'green' : 'orange'}}>

      <Text style={{color: 'white'}}>Edit</Text>
      </TouchableHighlight>
      </View>
    )
}

export default StepList
