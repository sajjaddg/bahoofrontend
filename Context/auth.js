import React , {useEffect,useState,createContext} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {API} from "../config";



const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [state,setState] = useState({
        data:'',
        defaultInvoiceId:0,
        isLogin:false,
        reminders:[],
        tags:[],
    });
    axios.defaults.baseURL = API;
    useEffect(()=>{
        //AsyncStorage.clear()
        const loadFromAsyncStorage = async () => {
            let data = await AsyncStorage.getItem('@auth');
            let id = await AsyncStorage.getItem('@defaultInvoiceId');
            if(id){
                const idd = JSON.parse(id);
                console.log("auth Provider "+idd)
                state.defaultInvoiceId=idd;

            }
            if (data){
                const as = JSON.parse(data);
                console.log("auth Provider "+data)
                setState({...state,data: as.data});
            }
        }
        loadFromAsyncStorage();
    },[]);
    return(
        <AuthContext.Provider value={[state,setState]}>
            {children}
        </AuthContext.Provider>
    );
}
export {AuthProvider,AuthContext};
