import React, {useContext, useEffect, useState} from "react";
import {Text, StyleSheet, View, ScrollView} from "react-native";
import {AuthContext} from "../../../Context/auth";
import axios from "axios";
import jalaali from "../../utils/pDate";
import Remainder from "../../component/Remainder";
import {useNavigation} from "@react-navigation/native";

const Reminder = (props) => {
    const [state,setState] = useContext(AuthContext);
    const [remainders,setRemainders] = useState([]);
    const navigation = useNavigation();
    const loadRemaindersFromApi= async(token,id)=> {
        let config = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        const URL = `/invoices/${id}/reminders/`;
        try {
            const {data} = await axios.get(URL, config).then((response)=>{setRemainders(response.data.data)}).catch(error => {
                console.log(error)
            })
            console.log(data)
        }
        catch (e) {
            console.log(e.response)
        }
    }
    useEffect(()=>{
        const unsubscribe = navigation.addListener('tabPress', (e) => {
            loadRemaindersFromApi(state.data.access, state.defaultInvoiceId)
            navigation.navigate('Reminder')

        });
        loadRemaindersFromApi(state.data.access, state.defaultInvoiceId)
    },[props.navigation])
    return(
       <View style={styles.body}>
           <View style={styles.container}>
                <View style={styles.labelTextBox}>
                    <Text style={styles.labelText}>
                        ریمایندر ها
                    </Text>
                </View>
               <View style={styles.remainderList}>
                   <ScrollView
                       showsVerticalScrollIndicator={false}
                       contentContainerStyle={{
                           justifyContent: 'space-evenly',
                           paddingBottom: 130
                       }}
                   >
                       {
                           remainders?.map((remainder)=>{
                               let date = remainder.due_date.split('-')
                               const jalali = jalaali.getJalali(new Date(parseInt(date[0]),parseInt(date[1])-1,parseInt(date[2])))
                               const x = jalaali.formatJalaali(jalali)
                               return(
                                   <Remainder key={remainder.id}
                                              title={remainder.name}
                                              date={x}
                                              iconid={remainder.icon}
                                              percent={parseInt(remainder.spent_percentage)}
                                              borderColor={remainder.color}
                                              onPress={()=>{ navigation.navigate('RemainderDetail',{id:remainder.id})}}
                                   />
                               )
                           })
                       }
                   </ScrollView>
               </View>
           </View>
       </View>
    )
}
const styles = StyleSheet.create({
    body:{
        flex:1,
        backgroundColor:'#FAF8F0',
    },
    container:{
        flex:1,
        marginHorizontal:25,
        marginTop:40
    },
    labelText:{
        textAlign:"right",
        fontSize:20,
        marginRight:10,
        color:'#302B38',
        fontFamily:'ShabnamBold',
    },
    labelTextBox:{
        marginBottom:15
    }
});
export default Reminder;
