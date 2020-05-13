import React,{useEffect,useState} from 'react';
import { View,TouchableOpacity,NativeModules,Text,TextInput,StyleSheet   } from 'react-native';
import styles from './style.scss';
import { SimpleAnimation } from 'react-native-simple-animations';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from 'react-native-picker-select';

export default function popup(props){
  const {onSubmit,onCancel,heading="No heading",data={text: null,time: null}} = props;
  const [text, setText] = React.useState(data.text);
  const [time,setTime] = useState(data.time);
  const [type,setType] = useState(data.type ? data.type : 'text');
  HandleTime = (e) =>{
    setShowTime(false);
    setTime(e.toString());
  }
  Submit = () => {
    if(!text && type == 'text'){
      alert("Set text");
      return;
    }
    if(!time && type == 'timer'){
      alert("Set time!");
      return;
    }
    if(time && time <= 0 && type == 'timer'){
      alert("Time cant be < 0");
      return;
    }
    console.log(text,time,type);
    onSubmit(text,time,type);

  }
  const placeholder = {
  label: 'Set time...',
  value: null,
  color: '#fafafa',
  };

  return(
    <View style={styles.container}>
    <SimpleAnimation duration={500} staticType="zoom" style={styles.innerContainer}>
    <Text style={styles.headingText}>{heading}</Text>
    {type == 'text' && (
    <View>
      <Text style={styles.label}>Label</Text>
      <TextInput
        autoFocus
        style={styles.input}
        onChangeText={text => setText(text)}
        value={text}
        onSubmitEditing={() => onSubmit(text)}
      />
    </View>
    )}
    {type == 'timer' && (
    <View>
      <Text style={styles.label}>Set timer</Text>
      <TextInput
        autoFocus
        style={styles.input}
        onChangeText={time => setTime(time)}
        value={time}
        onSubmitEditing={() => onSubmit(time)}
        keyboardType='number-pad'
      />
    </View>
    )}
    <TouchableOpacity onPress={() => type == 'timer' ? setType('text') : setType('timer') } style={{padding: 10,backgroundColor: 'red'}}>
      <Text>Convert to {type == 'timer' ? 'text' : 'timer'}</Text>
    </TouchableOpacity>
    <View style={styles.buttonWrapper}>


    <TouchableOpacity style={styles.cancelButton} onPress={() => onCancel()}>
    <Text style={styles.buttonText}>Cancel</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.submitButton} onPress={() => Submit()}>
    <Text style={styles.buttonText}>Submit</Text>
    </TouchableOpacity>
    </View>
    </SimpleAnimation>

    </View>
  )
}
