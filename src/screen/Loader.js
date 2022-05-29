import React, {useContext, useEffect, useState} from "react";
import {ActivityIndicator, View, Text,Image, StyleSheet, Dimensions} from "react-native";
import {AuthContext} from "../../Context/auth";
import {useNetInfo} from "@react-native-community/netinfo";
import axios from "axios";
import ApiConfig from "../utils/ApiConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Loader = (props) => {
    const [state,setState] = useContext(AuthContext);
    const [load, setLoad]= useState(false);
    const [text,setText] = useState('به باهو خوش آمدید');
    const [error,setError] = useState(false);
    const[ready,setReady]   = useState(false);
    const netInfo = useNetInfo();
   
    const check = async()=>{
        if(!netInfo.isConnected){
            console.log('netInfo.isConnected:',netInfo.isConnected)
            setError(true)
            setText('اینترنت خود را بررسی کنید')
            return;
        }
        if(state.data!==''){
            try {
                // const {data} = await axios.get('/auth/status/')
                const {data} = await axios.get('/auth/status/', ApiConfig(state.data.access))
            }catch (e) {
                console.log(e);
                if(e.response.status===401){
                    try{
                        const {data} = await axios.post('auth/login/refresh/', {refresh:state.data.refresh})
                        setState({...state,data:{access:data.access}})
                        await AsyncStorage.setItem("@auth",JSON.stringify(state.data));
                        return;
                    }
                    catch (e) {
                        console.log(e.response)
                        AsyncStorage.clear()
                        return;
                    }
                    
                }
                setError(true)
                setText('خطایی رخ داده است')
                return;                
            }
        }
        setError(false);
        setText('به باهو خوش آمدید')
        setReady(true);
    }

    useEffect(()=>{
        if (!load) {
            setTimeout(() => {
                setLoad(true)
            }, 2000)
        }
        if(load){
            setState((x)=>{
                return {...x,isLogin:state&&state.data!==''}
            })
            check();
        }
    },[load])



    useEffect(()=>{
        if(!error&&ready){
            
            setTimeout(() => {
                props.navigation.navigate('RootMain')
            }, 500)
        }

    },[error,ready])
  return(
      <View style={styles.body}>
          <View style={styles.container}>
              <View style={styles.imageBox}>
                  <View style={styles.circle}>
                      <View style={styles.circleIn}>
                          <Image
                              style={{
                                  width: '100%',
                                  height: '100%',
                              }}
                              source={require('../../assets/image/Splash/icon.png')}
                          />
                      </View>
                  </View>
              </View>
              <View style={styles.textBox}>
                  <Text style={styles.titer}>باهو</Text>
                  <ActivityIndicator
                  animating={!error}
                  />
                  <Text style={[styles.titer,{fontSize: 14}]}>{text}</Text>
              </View>
          </View>
      </View>
  )
}
const styles = StyleSheet.create({
    container :{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    body :{
        backgroundColor:'#5724AB',
        flex:1
    },
    imageBox:{
        flex:1.5,
        justifyContent:"flex-end",
    },
    circle: {
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').width * 0.8,
        backgroundColor:'#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    circleIn:{
        borderRadius: 82,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textBox:{
        flex:1,
        justifyContent:"space-around"
    },
    titer:{
        fontFamily:'LalezarRegular',
        fontSize:96,
        color:'#FAF8F0'
    },
});
export default Loader;
