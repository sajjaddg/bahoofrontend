import React, {useState} from "react";
import {StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";


const SubmitButton = (props) => {
    const [pressed,setPressed] = useState(false);
    return(
        <View>
            <TouchableWithoutFeedback
                onPressIn={()=>{
                    setPressed(true);

                }}
                onPressOut={()=>{
                    setPressed(false)
                }}
                {...props}
            >
                <View style={pressed?styles.buttonPressed:styles.button}>
                    <Text style={[styles.buttonText,props.labelStyle]}>{props.label}</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )

}

const styles = StyleSheet.create({

    button:{
        width:240,
        height:52,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:'#5724AB',
        borderRadius:30
    },
    buttonPressed:{
        width:240,
        height:52,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:'#16B58F',
        borderRadius:30
    },
    buttonText:{
        fontSize:20,
        color:'#FAF8F0',
        fontFamily:'Shabnam'
    },
});
export default SubmitButton;
