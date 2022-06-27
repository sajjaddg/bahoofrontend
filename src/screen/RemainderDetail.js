import React, {useContext, useEffect, useState} from "react";
import {View, Text, StyleSheet, TextInput, ScrollView, Dimensions,FlatList, TouchableOpacity,TouchableHighlight} from 'react-native'
import BalanceProgressBar from "../component/BalanceProgressBar";
import DateProgressBar from "../component/DateProgressBar";
import TransactionCard from "../component/TransactionCard";
import DatePickerJalali from "../component/DatePickerJalali";
import axios from "axios";
import {AuthContext} from "../../Context/auth";
import icon from "../../assets/image/remainderIcon";
import jalaali from "../utils/pDate";
import icons from "../../assets/image/tagicon";



const RemainderDetail = (props) => {
    const [showDatePicker,setShowDatePicker] = useState(false);
    const [state,setState] = useContext(AuthContext);
    const[title,setTitle] = useState('');
    const[borderColor,setBorderColor] = useState('');
    const[svgIcon,setSvgIcon] = useState('');
    const [balance,setBalance] = useState('');
    const [date,setDate] = useState('');
    const [createDate,setCreateDate] = useState('');
    const[spentPercentage,setSpentPercentage] = useState(0);
    const[dateSpent,setDateSpent] = useState(0);
    const[transactions,setTransactions] = useState([]);
    const[spent,setSpent] = useState(0);
    const loadRemainderFromApi= async(token, invoiceId,remainderId)=> {
        let config = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        console.log(token, invoiceId,remainderId)
        const URL = `/invoices/${invoiceId}/reminders/${remainderId}`;
        try {
            const {data} = await axios.get(URL, config).then((response)=>{
                //console.log(response.data.data);
                setTitle(response.data.data.name)
                setBorderColor(response.data.data.color)
                setBalance(response.data.data.balance)
                setSpentPercentage(response.data.data.spent_percentage)
                let Svg = icon.find(x=> x.id===response.data.data.icon)
                let date =response.data.data.due_date.split('-')
                setSpent(Math.abs(response.data.data.spent))
                const due_date = new Date(parseInt(date[0]),parseInt(date[1])-1,parseInt(date[2]))
                const jalali_due_date = jalaali.getJalali(due_date)
                setDateSpent((due_date.getTime() - (new Date()).getTime()) / (due_date.getTime() - (new Date(response.data.data.created_at)).getTime()) * 100)
                setCreateDate(jalaali.formatJalaali(jalaali.getJalali(new Date(response.data.data.created_at))));
                setDate(jalaali.formatJalaali(jalali_due_date))
                setSvgIcon(Svg)
            }).catch(error => {
                console.log(error)
            })
            console.log(data)
        }
        catch (e) {
            console.log(e.response)
        }
    }
      
    const loadTransactionFromApi= async(token, invoiceId,remainderId)=> {
        try {
            let config = {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
            const URL = `invoices/${invoiceId}/reminders/${remainderId}/transactions/`
            await axios.get(URL,config).then((response)=>{
                setTransactions(response.data.data);
            })
        } catch (error) {
            console.log('loadTransactionFromApi RemainderDetail:',error);
        }
    }
    useEffect(()=>{
        loadRemainderFromApi(state.data.access, state.defaultInvoiceId,props.route.params.id)
        loadTransactionFromApi(state.data.access, state.defaultInvoiceId,props.route.params.id)
    },[props.route])
  return(
      <View style={styles.body}>
          <View style={styles.container}>
              <View style={styles.header}>
                  <View style={[styles.circle,{borderWidth:2,borderColor:borderColor}]}>
                      {
                          svgIcon!==""?
                              <svgIcon.svg/>
                              :
                              null
                      }
                  </View>
                  <View>
                      <Text style={styles.textTitle}>
                          {title}
                      </Text>
                  </View>
              </View>
              <View style={styles.progressBars}>
                <View>
                    <BalanceProgressBar
                        bgcolor={"#6a1b9a"}
                        completed={spentPercentage>100?100:spentPercentage}
                        firstText={spent}
                        scenedText={balance}
                    />
                </View>
                <View>
                    <DateProgressBar
                        bgcolor={"#16B58F"}
                        completed={dateSpent}
                        setShowDatePicker={setShowDatePicker}
                        firstText={createDate}
                        scenedText={date}
                    />
                </View>
              </View>
              <View style={styles.detail}>
                <TextInput
                    multiline={true}
                    numberOfLines={10}
                    style={styles.detailTextInput}
                />
              </View>
              <View style={styles.transaction}>
                  <View style={styles.transactionHeader}>
                    <TouchableOpacity 
                        style={styles.circle}
                        onPress={()=>{
                            props.navigation.navigate('Add')
                        }}
                    >
                        <Text style={{color:'#5724AB',fontSize:40}}>+</Text>
                    </TouchableOpacity>
                      <Text style={styles.transactionHeaderText}>اضافه کردن یک تراکنش</Text>
                  </View>
                  <View
                      style={
                        {height:'97%' , paddingBottom:50, alignItems:'center'}
                      }
                  >
                      <ScrollView
                          showsVerticalScrollIndicator={false}

                      >
                          {
                              transactions?.map(item=>{
                                  return(
                                        <TransactionCard
                                            key={item.id}
                                            title={item.name}
                                            balance={item.price<0?item.price*-1:item.price}
                                            date={jalaali.formatJalaali(jalaali.getJalali(new Date(item.created_at)))}
                                            circleStyle={{backgroundColor:item.color}}
                                            deposit={item.price>0}
                                            icon={icons.find(x=> x.id===item.icon)}
                                        />
                                        
                                  )
                              })
                          }
                      </ScrollView> 
              </View>
              <DatePickerJalali visible={showDatePicker} setVisible={setShowDatePicker}/>
          </View>
      </View>
      </View>
  )
}
const styles = StyleSheet.create({
    body:{
        backgroundColor:'#FAF8F0',
        flex:1,
        
    },
    container:{
        flex:1,
        marginHorizontal:20,
        marginTop:10
    },
    header:{
        marginTop:40,
        flex:0.07,
        flexDirection:"row-reverse",
        alignItems:"center"

    },
    progressBars:{
        marginVertical:40,
        flexDirection:"column",
        flex:0.21,
        justifyContent:"space-between",
    },
    detail:{
        flex:0.3,
        borderRadius:20,
        borderWidth:2,
        borderColor:'#5724AB',
        padding:10,
        marginVertical:20
    },
    transaction:{
        flex:0.5,
    },
    transactionHeader:{
        flexDirection:"row-reverse",
        justifyContent:"flex-start",
        alignItems:"center",
        marginHorizontal:25,
        marginVertical:10,
    },
    transactionHeaderText:{
        textAlign:"center",
        fontSize:14,
        color:'#8A7F9D',
        fontFamily:'Shabnam',
        marginHorizontal:10,
    },
    textTitle:{
        textAlign:"center",
        fontSize:18,
        color:'#302B38',
        fontFamily:'ShabnamBold',
        lineHeight:26,
        marginRight:8
    },
    detailTextInput:{
        fontSize:18,
        fontFamily:'Shabnam',
        textAlign:"right",
        textAlignVertical :"top"
    },
    circle:{
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.13,
        height: Dimensions.get('window').width * 0.13,
        backgroundColor:'#FAF8F0',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:10,
        },
        shadowOpacity:0.25,
        shadowRadius:3.5,
        elevation:5
    }
});
export default RemainderDetail;
