import React from 'react'
import { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity,StyleSheet} from "react-native";

const Timer = (props) => {
    const {initialMinute = 0,initialSeconds = 0} = props;
    const [ minutes, setMinutes ] = useState(initialMinute);
    const [seconds, setSeconds ] =  useState(initialSeconds);
    useEffect(()=>{
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
        };
    });

    return (
        <View>
            { minutes === 0 && seconds === 0
                ? <TouchableOpacity {...props}>
                    <Text style={styles.text}>
                        {"ارسال دوباره کد"}
                    </Text>
                </TouchableOpacity>
                : <Text style={props.textStyle}> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</Text>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    text:{
        textAlign:"center",
        fontSize:16,
        color:'#16B58F',
        fontFamily:'Shabnam',
        lineHeight:26
    }
})
export default Timer;
