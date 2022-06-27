import React,{useEffect,useState,useContext} from "react";
import {Text,StyleSheet,View,ScrollView} from "react-native";
import {AuthContext} from "../../../Context/auth";
import CircleIcon from "../../component/CircleIcon";
import TransactionCard from "../../component/TransactionCard";
import axios from "axios";
import icons from "../../../assets/image/tagicon";
import jalaali from "../../utils/pDate";
import {useNavigation} from "@react-navigation/native";
import icon from "../../../assets/image/remainderIcon";


const Transaction = (props) => {
    const [state,setState] = useContext(AuthContext);
    const [tags,setTags] = useState([]);
    const navigation = useNavigation();
    const [transactions,setTransactions] = useState([]);
    const [filteredTransactions,setFilteredTransactions] = useState([]);
    const [filter,setFilter] = useState(false);
    const [remainders,setRemainders] = useState([]);
    const loadTransactionFromApi= async(token, invoiceId)=> {
        let config = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        const URL = `/invoices/${invoiceId}/transactions`;
        try {
            const {data} = await axios.get(URL, config).then((response)=>{
                console.log(response);
                setTransactions(response.data.data)
            }).catch(error => {
                console.log(error)
            })
            console.log(data)
        }
        catch (e) {
            console.log(e)
        }
    }
    const loadTagsFromApi = async (token,id)=>{
        let config = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        const URL = `/invoices/${id}/tags/`;
        try {
            const {data} = await axios.get(URL, config).then((response)=>
                {
                    setTags(response.data.data)
                }
            ).catch(error => {
                console.log(error)
            })
            console.log(data)
        }
        catch (e) {
            console.log(e.response)
        }
    }
    const loadFilterTransactionsFromApi= async(token, invoiceId,id)=>{
        let config = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        const URL = `/invoices/${invoiceId}/transactions?has_tag=${id}`;
        try {
            const {data} = await axios.get(URL, config).then((response)=>{
                console.log(response);
                setFilteredTransactions(response.data.data)
            }).catch(error => {
                console.log(error)
            })
        }
        catch (e) {
            console.log(e)
        }
    }
    const loadFilterRimaindersFromApi=async(token, invoiceId,id)=>{
        let config = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        const URL = `/invoices/${invoiceId}/reminders?used_tag=${id}`;
        try {
            const {data} = await axios.get(URL, config).then((response)=>{
                console.log(response);
                setRemainders(response.data.data)
            }).catch(error => {
                console.log(error)
            })
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(()=>{
        const unsubscribe = navigation.addListener('tabPress', (e) => {
            loadTransactionFromApi(state.data.access,state.defaultInvoiceId);
            loadTagsFromApi(state.data.access,state.defaultInvoiceId);
            setFilter(false)
            setRemainders([])
            navigation.navigate('Transaction')
        })
        loadTagsFromApi(state.data.access,state.defaultInvoiceId);
        setFilter(false)
        setRemainders([])
        loadTransactionFromApi(state.data.access,state.defaultInvoiceId);
    },[props.navigation])
    const handleFilterPress=(id)=>{
        setFilter(true)
        loadFilterTransactionsFromApi(state.data.access,state.defaultInvoiceId,id)
        loadFilterRimaindersFromApi(state.data.access,state.defaultInvoiceId,id)
    }
    const body = (
        <View style={styles.body}>
            <View style={styles.container}>
                <View style={styles.categories}>
                    <View>
                        <Text style={styles.title}> دسته بندی ها </Text>
                    </View>
                    <View style={{marginTop:25}}>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        >
                            {tags?.map(item=>{
                                return(
                                    <CircleIcon
                                        key={item.id}
                                        title={item.name}
                                        circleStyle={{backgroundColor: item.color}}
                                        icon={icons.find(icon=>icon.id===item.icon)}
                                        onpress={()=>handleFilterPress(item.id)}
                                    />
                                )
                            })}
                        </ScrollView>
                    </View>
                </View>
                <View style={styles.transactions}>
                    <View>
                        <Text style={styles.title}> تراکنش ها </Text>
                    </View>
                    <View
                        style={
                            {height:'97%' , paddingBottom:70, alignItems:'center'}
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
                </View>
            </View>
        </View>
    )
    const filterBody=(
        <View style={styles.body}>
            <View style={[styles.container,{marginTop:70,marginRight:15}]}>
                <View style={[styles.filterHederBody,{alignItems:'center' , justifyContent:"flex-start",flexDirection:'row-reverse'}]}>
                    <View>
                        <CircleIcon
                            key={tags[0]?.id}
                            circleStyle={{backgroundColor: tags[0]?.color,width:60,height:60}}
                            icon={icons.find(icon=>icon.id===tags[0]?.icon)}
                        />
                    </View>
                    <View>
                        <Text style={[styles.title,{marginRight:0,marginTop:8}]}> {tags[0]?.name} </Text>
                    </View>
                </View>
                <View style={{marginTop:50}}>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            style={{flexDirection: 'row-reverse'}}
                        >
                            {remainders?.map(item=>{
                                return(
                                    <CircleIcon
                                        key={item.id}
                                        title={item.name}
                                        circleStyle={{backgroundColor: 'transparent',borderWidth:2,borderColor:item.color ,width:65,height:65}}
                                        icon={icon.find(icon=>icon.id===item.icon)}
                                        onpress={()=>{navigation.navigate('RemainderDetail',{id:item.id})}}

                                    />
                                )
                            })}
                        </ScrollView>
                    </View>
                    <View style={styles.transactions}>
                    <View>
                        <Text style={[styles.title,{marginTop:30}]}> تراکنش ها </Text>
                    </View>
                    <View
                        style={
                            {height:'97%' , paddingBottom:70, alignItems:'center'}
                        }
                    >
                        <ScrollView
                            showsVerticalScrollIndicator={false}

                        >
                            {
                              filteredTransactions?.map(item=>{
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
                </View>   
            </View>
        </View>
        
    )
    return(filter?filterBody:body)
}
const styles = StyleSheet.create({
  body:{
      backgroundColor:'#FAF8F0',
      flex:1
  },
  container:{
      flex:1,
      marginTop:50,
      justifyContent:"flex-start",
  },
  categories:{
      flex:1
  },
    transactions:{
      flex:4,
    },
    title:{
        fontSize:18,
        color:'#302B38',
        fontFamily:'Shabnam-Bold-FD',
        marginHorizontal:25
    },

});
export default Transaction;
