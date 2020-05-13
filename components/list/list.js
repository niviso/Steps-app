import React,{useContext,useEffect,useState} from 'react';
import SortableListView from 'react-native-sortable-listview'
import { View,Text,TouchableOpacity,NativeModules,SafeAreaView } from 'react-native';
import styles from './style.scss';
import Row from './row';
import { ListContext } from "../../contexts/ListContext";
import ArrayHelper from '../../helpers/arrayHelper';
import { FontAwesome } from '@expo/vector-icons';
import Popup from '../popup/popup';
import Header from '../header/header';
function List(props){
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
  Undo = () => {
    var tmp = JSON.parse(JSON.stringify(state));
      //NativeModules.DevSettings.reload();
      for(let i=0;i!=tmp.lists[0].contents.length;i++){
        if(tmp.lists[0].contents[i].id == tmp.lists[0].activeItemId && tmp.lists[0].contents[i - 1]){
          tmp.lists[0].activeItemId = tmp.lists[0].contents[i - 1].id;
          tmp.lists[0].contents[i - 1].complete = false;
          break;
        }
      }
      setState(tmp);

  }
  ResetList = () => {
      var result = JSON.parse(JSON.stringify(state));
      for(let i=0;i!=result.lists[0].contents.length;i++){
        result.lists[0].contents[i].complete = false;
      }

      result.lists[0].activeItemId = result.lists[0].contents[0].id;
      setState(result);
  }
  UpdateContents = (from,to) => {
    var newOrder = ArrayHelper.MoveIndex(state.lists[0].contents,from,to);
    UpdateState(newOrder,'order');
    ResetList();
  }



    return (
      <View style={styles.container}>
      <Header theme={state.lists[0].theme} text={state.lists[0].name} />
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
      <TouchableOpacity onPress={() => ToggleEdit()} style={styles.editBtn}>
        <Text style={{color: 'white'}}>{state.lists[0].edit ? <FontAwesome  name="times"  size={20} /> : <FontAwesome  name="edit"  size={20} />}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setShowInput(true)} style={styles.addBtn}>
        <Text style={{color: 'white'}}><FontAwesome  name="plus"  size={20} /></Text>
      </TouchableOpacity>

      <TouchableOpacity style={{...styles.undoBtn,backgroundColor: state.lists[0].theme.primary}} onPress={() => Undo()}>
        <Text style={{color: 'white'}}><FontAwesome  name="undo"  size={20} /></Text>
      </TouchableOpacity>

      {showInput && <Popup heading="New item" onCancel={() => setShowInput(false)} onSubmit={AddStep}/>}
      {editItem &&(
      <Popup heading={"Edit list item"} data={state.lists[0].contents[editItem]} onSubmit={UpdateStep} onCancel={() => setEditItem(null)}/>
      )}
      </View>
    )
}

export default List
