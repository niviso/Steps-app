import React,{useEffect,useState} from 'react';
import { View,TouchableOpacity,NativeModules,Text,TextInput   } from 'react-native';
import styles from './style.scss';
import { SimpleAnimation } from 'react-native-simple-animations';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function popup(props){
  const {onSubmit} = props;
  const [text, setText] = React.useState('');
  return(
    <View style={styles.container}>
    <SimpleAnimation duration={500} staticType="zoom" style={styles.innerContainer}>
    <Text style={styles.headingText}>This is the heading text</Text>
    <TextInput
      autoFocus
      style={styles.input}
      onChangeText={text => setText(text)}
      value={text}
      onSubmitEditing={() => onSubmit(text)}
    />
    </SimpleAnimation>
    <DateTimePickerModal
  isVisible={false}
  mode="date"
  onConfirm={null}
  onCancel={null}
/>
    </View>
  )
}
