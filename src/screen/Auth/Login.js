import React, {useState, useEffect, useContext} from "react";
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View
} from "react-native";
import SubmitButton from "../../component/SubmitButton";


const Login = (props) => {

    const [pressed,setPressed] = useState(false);
    const [alert,setAlert] = useState("");
    const [number,setNumber] = useState("");
    const check = () => {
      if (number.length!==10){
          setAlert("شماره وارد شده صحیح نمیباشد")
          return false
      }
      return true
    }
    const pressedButton = async () => {
        setAlert('');
        if (check()){
            props.navigation.navigate('Verification',{number})
        }
    }
  return(
      <View style={styles.container}>
          <KeyboardAvoidingView style={styles.avoidContainer} >
            <View style={styles.textBox}>
                <Text style={styles.text}>{"شماره موبایل خود را برای دریافت\n کد تایید وارد کنید"}</Text>
            </View>
              <View style={styles.numberInputBox}>
                <View style={styles.areaNumber}>
                    <Text style={styles.textArea}>+98</Text>
                </View>
                <View style={styles.inputBox}>
                    <TextInput
                        keyboardType={'number-pad'}
                        maxLength={10}
                        style={styles.input}
                        placeholder={'912345678'}
                        value={number}
                        onChangeText={(text)=>{setNumber(text)}}
                    />
                </View>
              </View>
              <View style={styles.alertTextBox}>
                  <Text style={styles.alertText}>{alert}</Text>
              </View>
              <View style={styles.buttonBox}>
                 <SubmitButton label={"تایید"} onPress={()=>pressedButton()}/>
              </View>
          </KeyboardAvoidingView>

      </View>
  );
}
const styles = StyleSheet.create({
    container : {
        display:"flex",
        flex:1,
        backgroundColor: '#FAF8F0',
        justifyContent:"center",
        alignItems:"center",
    },
    avoidContainer:{
        display:"flex",
        flex:0.9,
        justifyContent:"center"
    },
    textBox:{
        paddingTop:110,
        position: 'absolute',
        top:0,
        alignSelf:'center'
    },
    text:{
        textAlign:"center",
        fontSize:16,
        color:'#8A7F9D',
        fontFamily:'Shabnam',
        lineHeight:26
    },
    numberInputBox:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
    },
    areaNumber:{
        justifyContent:"center",
        borderBottomColor:'#8A7F9D',
        borderBottomWidth:2,
        marginRight:14,
        width:'14%',
        paddingTop:2,
    },
    input:{
        textAlignVertical: 'bottom',
        paddingVertical: 2,
        textAlign:"center",
        fontSize:16,
        fontFamily:'Shabnam',
        letterSpacing: 3
    },
    inputBox:{
        borderBottomColor:'#5724AB',
        borderBottomWidth:2,
        width:'52%',
    },
    textArea:{
        textAlign:"center",
        fontSize:17,
        color:'#8A7F9D',
        marginBottom:2,
        fontFamily:'Shabnam'
    },
    alertText:{
        textAlign:"center",
        fontSize:16,
        color:'#EC4141',
        fontFamily:'Shabnam'
    },
    alertTextBox:{
        marginTop:8,
        justifyContent:"center",
        alignItems:"center",
    },
    buttonBox:{
        marginLeft:20,
        position:"absolute",
        bottom:0
    },
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


export default Login;
