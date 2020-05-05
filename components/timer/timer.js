import React,{useState,useEffect} from 'react';
import { View,TouchableHighlight,TouchableOpacity,Text,Image  } from 'react-native';
import PushNotificationHelper from '../../helpers/pushNotificationHelper';

Number.prototype.zeroPad = function() {
   return ('0'+this).slice(-2);
};

export default  function Timer(props){
  const calculateTimeLeft = () => {
  const difference = +new Date("2020-05-05T15:06") - +new Date();
  const [done,setDone] = useState(false);
  let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        milleseconds: Math.floor(difference)
      };
    } else {
      setDone(true);
      PushNotificationHelper.sendPushNotification("Wow","amazing");
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if(props.active && !done){
      setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
      }
  });

  const timerComponents =
  <Text style={{fontWeight: 'bold',color: 'white'}}>
{timeLeft.hours.zeroPad()}:
  {timeLeft.minutes.zeroPad()}:
  {timeLeft.seconds.zeroPad()}
  </Text>

  return (
    <View>
      {timeLeft.length ? timerComponents : <Text>⏰</Text>}
    </View>
  );
}
