import React, {useContext, useEffect, useState} from "react";
import {View, StyleSheet, Dimensions, Text, FlatList, ScrollView,TouchableWithoutFeedback} from "react-native";
import Poster from "../../component/Poster";
import MainCard from "../../component/MainCard";
import Remainder from "../../component/Remainder";
import {AuthContext} from "../../../Context/auth";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import posters from "../../../assets/image/poster";
import jalaali from "../../utils/pDate";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiConfig from "../../utils/ApiConfig";
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';


const Home = (props) => {
    const [state,setState] = useContext(AuthContext);
    const [invoiceName,setInvoiceName] = useState("");
    const [invoiceColor,setInvoiceColor] = useState("");
    const [invoiceBalance,setInvoiceBalance] = useState("");
    const [remainders,setRemainders] = useState([]);
    const navigation = useNavigation();
    const [invoices,setInvoices]=useState([]);
    const [visible, setVisible] = useState(false);

    const hideMenu = () => setVisible(false);
  
    const showMenu = () => setVisible(true);
    const loadInvoiceFromApi= async(token,id)=> {
        let config = ApiConfig(token)
        const URL = `/invoices`;
        try {
            const {data} = await axios.get(URL, config) .catch(error => {
                console.log(error)
            })
            if(data.data.length){
                setInvoices(data.data);
                if (state.defaultInvoiceId===0) {
                    await AsyncStorage.setItem("@defaultInvoiceId",JSON.stringify(data.data[0].id));
                    setState({...state,defaultInvoiceId:data.data[0].id})
                    setInvoiceName(data.data[0].name)
                    setInvoiceColor(data.data[0].color)
                    setInvoiceBalance(data.data[0].balance)
                }
                else {
                   let defaultInvoice = data.data.find(x=>x.id ===state.defaultInvoiceId)
                    setInvoiceName(defaultInvoice.name)
                    setInvoiceColor(defaultInvoice.color)
                    setInvoiceBalance(defaultInvoice.balance)
                }
            }else{
                navigation.navigate('CreateInvoice')
            }
        } catch (e) {
            console.log(e.response)
        }
    }
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
    const handleInvoicePress = async(id)=>{
        await AsyncStorage.setItem("@defaultInvoiceId",JSON.stringify(id));
        setState({...state,defaultInvoiceId:id})
        hideMenu()
    }
    useEffect(()=>{
        loadInvoiceFromApi(state.data.access,state.defaultInvoiceId)
        if(state.defaultInvoiceId!==0) {
            loadRemaindersFromApi(state.data.access, state.defaultInvoiceId)
        }
    },[props.route,state.defaultInvoiceId])
    return(
      <View style={styles.container}
      >
        <View style={styles.header}>
                <View>
                    <Menu
                        visible={visible}
                        anchor={<TouchableWithoutFeedback onPress={showMenu}>
                            <View style={[styles.circles,{backgroundColor: invoiceColor?invoiceColor:'#FFC1C1'}]}>

                            </View>
                        </TouchableWithoutFeedback>}
                        onRequestClose={hideMenu}
                        style={{marginTop:60 , backgroundColor:'#FAF8F0'}}
                    >
                        {invoices.map((item)=>{
                            return(
                                <MenuItem key={item.id} textStyle={[styles.headerText,{textAlign:'right',fontSize:16}]}onPress={()=>handleInvoicePress(item.id)}>{item.name}</MenuItem>
                            )
                        })}
                        <MenuItem disabled>Disabled item</MenuItem>
                        <MenuDivider />
                        <MenuItem onPress={hideMenu}>Menu item 4</MenuItem>
                    </Menu>
                </View>
            <View style={styles.headerTextBox}>
                <Text style={styles.headerText}>{invoiceName}</Text>
            </View>
        </View>
          <View style={styles.posters}>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
               <Poster
                   style={{backgroundColor:"#FFAA46"}}
                   image={posters[0]}
               />
               <Poster
                   style={{backgroundColor:"#64C7FF"}}
                   image={posters[1]}
               />
               <Poster
                   style={{backgroundColor:"#FF7171"}}
                   image={posters[2]}
               />
            </ScrollView>
          </View>
          <View style={styles.cards}>
            <MainCard balance={invoiceBalance}/>
          </View>
          <View style={styles.main}>
            <View style={styles.mainTiterBox}>
                <Text style={styles.mainTiter}>
                    ریمایندر ها
                </Text>
            </View>
              <View style={{height: '100%'}}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    justifyContent: 'space-evenly',
                    paddingBottom: 550
                }}
            >
                {
                    remainders?.slice(0, 5).map((remainder)=>{
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
  );
}
const styles= StyleSheet.create({
    container : {
        display:"flex",
        flex:1,
        backgroundColor:'#FAF8F0',
        paddingBottom : 22,
        justifyContent:"flex-start",

    },
    header:{
        flexDirection:"row-reverse",
        justifyContent: "flex-start",
        alignItems:"center",
        marginTop:50,
        marginHorizontal:30,
        
    },
    circles:{
        borderRadius: 30,
        width: Dimensions.get('window').width * 0.15,
        height: Dimensions.get('window').width * 0.15,
        backgroundColor:'#62D31D',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText:{
        textAlign:"center",
        fontSize:18,
        color:'#8A7F9D',
        fontFamily:'ShabnamBold',
        lineHeight:26
    },
    headerTextBox:{
      marginRight:20
    },
    posters:{
        marginVertical:20,
    },
    cards:{
        justifyContent:"center",
        alignItems:"center"
    },
    main:{
        marginHorizontal:30,
    },
    mainTiterBox:{
        marginVertical:15
    },
    mainTiter:{
        textAlign:"right",
        fontSize:20,
        color:'#302B38',
        fontFamily:'ShabnamBold',
    }

});
export default Home;
