import React,{useContext,useEffect,useState} from 'react';
import SortableListView from 'react-native-sortable-listview'
import { View,Text,TouchableOpacity,NativeModules } from 'react-native';
import styles from './style.scss';
import Row from './row';
import { ListContext } from "./Contexts/ListContext";
import ArrayHelper from './helpers/arrayHelper';
import Popup from './components/popup/popup';
function StepList(props){
  const [state,setState] = useContext(ListContext);
  const [showInput,setShowInput] = useState(false);
  const [editItem,setEditItem] = useState(null);
  var order = Object.keys(state.lists[0].contents); //Array of keys
  ToggleEdit = () => {
    var tmp = JSON.parse(JSON.stringify(state));
    tmp.lists[0].edit = !tmp.lists[0].edit;
    tmp.lists[0].lastAction = 'toggle';
    setState(tmp);
  }
  UpdateState = (newData,action) => {
    var tmp = JSON.parse(JSON.stringify(state));
    tmp.lists[0].contents = newData;
    tmp.lists[0].lastAction = action;
    setState(tmp);
  }
  AddStep = (input,time) => {
    var tmp = JSON.parse(JSON.stringify(state));
    tmp.lists[0].contents.push({ id: Math.floor(Math.random() * 1000),text: input,draggable: true,time: time,timestamp: '14:13' })
    tmp.lists[0].lastAction = 'add';
    setState(tmp);
    setShowInput(false);
  }

  UpdateStep = (input,time) => {
    var tmp = JSON.parse(JSON.stringify(state));
    const newItem = { id: editItem,text: input,draggable: true,time: time,timestamp: '14:13' }
    tmp.lists[0].contents[editItem] = newItem;
    setState(tmp);
    setEditItem(null);
  }
  Reset = () => {
      NativeModules.DevSettings.reload();
  }
  ResetList = () => {
      var result = JSON.parse(JSON.stringify(state));
      for(let i=0;i!=result.lists[0].contents.length;i++){
        result.lists[0].contents[i].complete = false;
      }

      result.lists[0].activeItemId = result.lists[0].contents[0];
      setState(result);
  }
  UpdateContents = (from,to) => {
    var newOrder = ArrayHelper.MoveIndex(state.lists[0].contents,from,to);
    UpdateState(newOrder,'order');
    ResetList();
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
        renderRow={row => <Row editFunc={setEditItem} edit={state.lists[0].edit} lastAction={state.lists[0].lastAction} data={row} />}
      />
      <TouchableOpacity underlayColor={'none'} onPress={() => ToggleEdit()} style={{...styles.controlls,backgroundColor: state.lists[0].edit ? 'green' : 'orange'}}>

      <Text style={{color: 'white'}}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity underlayColor={'none'} onPress={() => setShowInput(true)} style={{...styles.add}}>

      <Text style={{color: 'white'}}>Add</Text>
      </TouchableOpacity>
      {showInput && <Popup heading="New item" onCancel={() => setShowInput(false)} onSubmit={AddStep}/>}
      {editItem &&(
      <Popup data={state.lists[0].contents[editItem]} onSubmit={UpdateStep} onCancel={() => setEditItem(null)}/>
      )}
      <TouchableOpacity underlayColor={'none'} style={styles.reset} onPress={() => Reset()}>
        <Text style={{color: 'white'}}>Reset</Text>
      </TouchableOpacity>
      </View>
    )
}

export default StepList
