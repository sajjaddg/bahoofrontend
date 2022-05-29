import React, {useState, useEffect, useContext} from "react";
import {
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,TouchableOpacity
} from "react-native";
import SubmitButton from "../../component/SubmitButton";
import Timer from "../../component/Timer";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AuthContext} from "../../../Context/auth";


const Verification = (props) => {
    const [state,setState] = useContext(AuthContext);
    const [pressed,setPressed] = useState(false);
    const [alert,setAlert] = useState("");
    const [number,setNumber] = useState("+98"+props.route.params.number);
    const [code,setCode] = useState('');
    const [timerMin,setTimerMin] = useState(0)
    const [timerSce,SetTimerSec] = useState(5)

    const sendOtp =async (number)=>{
        setAlert('')
        const URL = `/auth/otp/${number}`;

            try {
                const {data} = await axios.get(URL);
                if (data.success){
                    console.log('otp send')
                }

            }catch (e){
                console.log(e.response)
                setAlert(e.message)
            }
    }
    useEffect(()=>{

    },[])
   const pressSubmit = async () => {
           setAlert('');
           const URL = `/auth/otp/login/`;
               try {
                   const {data} = await axios.post(URL,{
                       phone_number: number,
                       otp: code,
                       bypass: true
                   });
                   console.log(data)
                   if (data.success){
                       console.log('token set')
                       await AsyncStorage.setItem("@auth",JSON.stringify(data));
                       setState({...state,data:data.data})
                       props.navigation.navigate('Main')
                   }

               }catch (e){
                   console.log("inja : ",e)
                   setAlert(e.message)
               }
       }
    return(
        <View style={styles.container}>
            <KeyboardAvoidingView style={styles.avoidContainer}>
                <View style={styles.texts}>
                    <View style={styles.textBox}>
                        <Text style={styles.text}>{"کد شش رقمی که به شماره شما\n ارسال شده را وارد کنید."}</Text>
                    </View>
                    <View style={styles.numberBox}>
                        <Text style={styles.text}>{number}</Text>
                    </View>
                </View>
                <View style={styles.inputs}>
                    <View style={styles.numberInputBox}>
                        <View style={styles.inputBox}>
                            <TextInput
                                keyboardType={'number-pad'}
                                maxLength={6}
                                style={styles.input}
                                placeholder={'______'}
                                value={code}
                                onChangeText={(text)=>{setCode(text)}}
                            />
                        </View>
                </View>
                    <View style={styles.alertTextBox}>
                        {alert ?<Text style={styles.alertText}>{alert}</Text>
                            :<Timer textStyle={styles.text} initialMinute={timerMin} initialSeconds={timerSce} onPress={()=>{
                                sendOtp(number)
                            }}/> }
                    </View>
                    <View>
                        <Text style={styles.text}>
                            {"شماره موبایل خود را اشتبا وارد کرده‌اید؟"}
                        </Text>
                        <TouchableOpacity onPress={()=>{props.navigation.navigate('Login')}}>
                            <Text style={[styles.text,{color:'#16B58F' }]}>
                                {"ویرایش کنید"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={styles.buttons}>
                    <View style={styles.buttonBox}>
                        <SubmitButton label={"ورود"} onPress={()=>pressSubmit()}/>
                    </View>
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
    input:{
        textAlignVertical: 'bottom',
        textAlign:"center",
        fontSize:18,
        fontFamily:'Shabnam',
        letterSpacing: 15
    },
    inputBox:{
        borderBottomColor:'#5724AB',
        borderBottomWidth:2,
        width:'65%',
    },
    alertText:{
        textAlign:"center",
        fontSize:16,
        color:'#EC4141',
        fontFamily:'Shabnam'
    },
    alertTextBox:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    buttonBox:{
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
    numberBox:{
        marginVertical:12
    },
    texts:{
        flex:1,
        justifyContent:"flex-end",
        alignItems:"center",
        flexGrow:1.8
    },
    buttons:{
        flex:1,
        justifyContent:"flex-end",
        alignItems:"center"
    },
    inputs:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
});


export default Verification;
