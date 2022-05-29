import React from "react";
import {Text, TextInput, View ,StyleSheet} from "react-native";


const InputBox = (props) => {
  return(
      <View style={[{},props.bodyStyle]}>
          <View style={styles.numberInputBox}>
              <View style={[styles.inputBox,props.inputBoxStyle]}>
                  <TextInput
                      style={[styles.input,props.inputStyle]}
                      placeholder={props.placeholder}
                      {...props}
                  />
              </View>
          </View>
        <View style={styles.alertTextBox}>
            <Text style={styles.alertText}>{props.alert}</Text>
        </View>
      </View>
  )
}
const styles=StyleSheet.create({
    numberInputBox:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
    },
    input:{
        textAlignVertical: 'bottom',
        textAlign:"right",
        fontSize:18,
        fontFamily:'Shabnam-FD',
        letterSpacing: 1
    },
    inputBox:{
        borderBottomColor:'#5724AB',
        borderBottomWidth:2,
        width:'85%'
    },
    alertText:{
        textAlign:"center",
        fontSize:16,
        color:'#EC4141',
        fontFamily:'Shabnam'
    },
    alertTextBox:{
        justifyContent:"center",
        alignItems:"center",
        marginTop:8
    },
});
export default InputBox;
