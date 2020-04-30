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
  const [showTime,setShowTime] = useState(false);
  HandleTime = (e) =>{
    setShowTime(false);
    setTime(e.toString());
  }
  Submit = () => {
    if(!text){
      alert("Set text");
      return;
    }
    if(!time){
      alert("Set time!");
      return;
    }
    onSubmit(text,time);

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
    <Text style={styles.label}>Label</Text>
    <TextInput
      autoFocus
      style={styles.input}
      onChangeText={text => setText(text)}
      value={text}
      onSubmitEditing={() => onSubmit(text)}
    />
    <Text style={styles.label}>Set time</Text>
    <RNPickerSelect
    onValueChange={(value) => HandleTime(value)}
    style={{
      inputAndroid: {
        ...styles.picker
      },
      inputIOS: {
        ...styles.picker
      }
    }}
    placeholder={placeholder}
    items={[
        { label: 'Now', value: 'Now' },
        { label: 'In 30 min', value: 'baseball' },
        { label: 'In 1h', value: 'hockey' },
    ]}
    />
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
