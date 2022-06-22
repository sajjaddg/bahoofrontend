import React,{useEffect,useState,useContext} from "react";
import {Text,StyleSheet,View,ScrollView} from "react-native";
import {AuthContext} from "../../../Context/auth";
import CircleIcon from "../../component/CircleIcon";
import TransactionCard from "../../component/TransactionCard";
import axios from "axios";
import icons from "../../../assets/image/tagicon";
import jalaali from "../../utils/pDate";
import {useNavigation} from "@react-navigation/native";

const Transaction = (props) => {
    const [state,setState] = useContext(AuthContext);
    const[tags,setTags] = useState([]);
    const navigation = useNavigation();
    const[transactions,setTransactions] = useState([]);

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
    useEffect(()=>{
        const unsubscribe = navigation.addListener('tabPress', (e) => {
            loadTransactionFromApi(state.data.access,state.defaultInvoiceId);
            loadTagsFromApi(state.data.access,state.defaultInvoiceId);
            navigation.navigate('Transaction')
        })
        loadTagsFromApi(state.data.access,state.defaultInvoiceId);
        loadTransactionFromApi(state.data.access,state.defaultInvoiceId);
    },[props.navigation])
    return(
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
                                        data={jalaali.formatJalaali(jalaali.getJalali(new Date(item.created_at)))}
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
