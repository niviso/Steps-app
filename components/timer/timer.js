import React,{useState,useEffect} from 'react';
import { View,TouchableHighlight,TouchableOpacity,Text,Image  } from 'react-native';
import PushNotificationHelper from '../../helpers/pushNotificationHelper';


function Timer(props){
  const {data,active,CompleteItem} = props;
  const {time,id,complete} = props.data;

  const [timeLeft, setTimeLeft] = useState({hours:0,minutes:0,seconds:time});

  ZeroPad = (num) => {
     return ('0'+num).slice(-2);
  };


  CalculateNewTime = () =>{
    var tmp = JSON.parse(JSON.stringify(timeLeft));


    if(tmp.seconds > 0){
      tmp.seconds--;
    }

    if(tmp.seconds <= 0 && tmp.minutes <= 0 && tmp.hours <= 0){
      CompleteItem(id);
      PushNotificationHelper.sendPushNotification("Step app","Ready to move over to the next step!");
      return tmp;
    }

    if(tmp.seconds <= 0 && tmp.minutes > 0){
      tmp.minutes = tmp.minutes - 1;
    }
    if(tmp.minutes <=0 && tmp.hours > 0){
      tmp.hours = tmp.hours - 1;
    }

    if(tmp.minutes == 0 && tmp.seconds == 0){
      tmp.seconds = 60;
    }

    if(tmp.hours > 0 && tmp.minutes == 0){
      tmp.minutes = 60;
    }


    return tmp;

  }

  useEffect(() => {
      if(!complete && active){
      setTimeout(() => {
        setTimeLeft(CalculateNewTime());
      }, 1000);
      }
  });

  return (
    <View>
      <Text style={{fontWeight: 'bold',color: 'white',textDecorationLine: complete && 'line-through'}}>
      {ZeroPad(timeLeft.hours) + ":" + ZeroPad(timeLeft.minutes) + ":" + ZeroPad(timeLeft.seconds)}
      </Text>
    </View>
  );
}

export default Timer;
