import React,{useEffect,useState} from 'react';
import { View,TouchableOpacity,NativeModules,Text,TextInput,StyleSheet   } from 'react-native';
import styles from './style.scss';
import { SimpleAnimation } from 'react-native-simple-animations';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from 'react-native-picker-select';

export default function popup(props){
  const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
  const {onSubmit} = props;
  const [text, setText] = React.useState('');
  const [time,setTime] = useState(0);
  const [showTime,setShowTime] = useState(false);
  HandleTime = (e) =>{
    setShowTime(false);
    setTime(e.toString());
  }
  const placeholder = {
  label: 'Set time...',
  value: null,
  color: '#000000',
};
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
    <RNPickerSelect
    onValueChange={(value) => HandleTime(value)}
    style={pickerSelectStyles}
    placeholder={placeholder}
    items={[
        { label: 'Now', value: 'Now' },
        { label: 'In 30 min', value: 'baseball' },
        { label: 'In 1h', value: 'hockey' },
    ]}
    />
    <TouchableOpacity onPress={() => onSubmit()}>
    <Text>Close</Text>
    </TouchableOpacity>
    </SimpleAnimation>

    </View>
  )
}
