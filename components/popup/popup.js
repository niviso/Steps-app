import React,{useEffect,useState} from 'react';
import { View,TouchableOpacity,NativeModules,Text,TextInput   } from 'react-native';
import styles from './style.scss';
import { SimpleAnimation } from 'react-native-simple-animations';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function popup(props){
  const {onSubmit} = props;
  const [text, setText] = React.useState('');
  const [time,setTime] = useState(0);
  const [showTime,setShowTime] = useState(false);
  HandleTime = (e) =>{
    setShowTime(false);
    setTime(e.toString());
  }
  return(
    <View style={styles.container}>
    <SimpleAnimation duration={500} staticType="zoom" style={styles.innerContainer}>
    <Text style={styles.headingText}>This is the heading text</Text>
    <TextInput
      style={styles.input}
      onChangeText={text => setText(text)}
      value={text}
      onSubmitEditing={() => onSubmit(text)}
    />
    <TouchableOpacity onPress={() => setShowTime(true)}>
    <Text>Set time: {time}</Text>
    </TouchableOpacity>
    </SimpleAnimation>
    <DateTimePickerModal
  isVisible={showTime}
  mode="time"
  onConfirm={(e) => HandleTime(e)}
  onCancel={setShowTime}
/>
    </View>
  )
}
