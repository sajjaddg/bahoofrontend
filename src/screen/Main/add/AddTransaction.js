import React, {useContext, useEffect, useState} from "react";
import {Text, View, StyleSheet,ScrollView, Dimensions} from "react-native";
import SubmitButton from "../../../component/SubmitButton";
import icons from "../../../../assets/image/tagicon";
import axios from "axios";
import {AuthContext} from "../../../../Context/auth";
import InputBox from "../../../component/InputBox";
import remainderIcon from "../../../../assets/image/remainderIcon";
import DropDownPicker from 'react-native-dropdown-picker';
import {useNavigation} from "@react-navigation/native";
import CircleProfile from "../../../component/CircleProfile";
import BouncyCheckboxGroup, {
    ICheckboxButton,
  } from "react-native-bouncy-checkbox-group";





const AddTransaction = (props) => {
    const [state,setState] = useContext(AuthContext);
    const [tagOpen, setTagOpen] = useState(false);
    const [tagValue, setTagValue] = useState(-1);
    const [tags, setTags] = useState([]);
    const [reminderOpen, setReminderOpen] = useState(false);
    const [reminderValue, setReminderValue] = useState();
    const [reminders, setReminders] = useState([]);
    const navigation = useNavigation();
    const [transactionName, setTransactionName] = useState('');
    const[transactionPrice,setTransactionPrice] = useState('');
    const [icon,setIcon] = useState("");
    const [deposit,setDeposit] = useState(false);
    const clearAll=()=>{
        setTagValue(-1)
        setReminderValue('')
        setIcon('')
        setTransactionName('')
        setTransactionPrice('')
    }
    const staticData = [{
        id: 0,
        text:'واریز',
        fillColor:'#5724AB',
        textStyle:{
            fontSize: 16,
            fontFamily:'Shabnam-FD',
            color:'#5724AB',
            textDecorationLine: "none",
        },
        style:{
            marginLeft:30
        }
      },
      {
        id: 1,
        text:'برداشت',
        fillColor:'#5724AB',
        textStyle:{
            fontSize: 16,
            fontFamily:'Shabnam-FD',
            color:'#5724AB',
            textDecorationLine: "none",
        },
        isChecked:true,
    
      }
      ]

    useEffect(()=>{
        if(tagValue!==-1){
            const x = tags.find(item=>item.value===tagValue);
            const y = icons.find(item=>item.id===x.aks);
            setIcon(y);
        }
    
    },[tagValue])
    const renderIcon = (icon,style) => {
        return(
            <View style={[styles.tagIcon,style]}>
                <icon.svg style={{height:6,width:6}}/>
            </View>
        );
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
                    let x = [];
                    response.data.data.map((item)=>{
                        let aks = icons.find((i)=>i.id===item.icon);
                        x.push(
                            {
                                label:item.name,
                                value:item.id,
                                aks:item.icon,
                                icon:()=>renderIcon(aks,{backgroundColor:item.color}),
                                containerStyle: {
                                   marginBottom:5
                                  },
                            }
                            )
                    });
                    setTags(x)
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
    const loadRemaindersFromApi= async(token,id)=> {
        console.log('inja hasim');
        let config = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        const URL = `/invoices/${id}/reminders/`;
        try {
            const {data} = await axios.get(URL, config).then((response)=>{
                //setRemainders(response.data.data)
                let x = [];
                    response.data.data.map((item)=>{
                    
                        let aks = remainderIcon.find((i)=>i.id===item.icon);
                        x.push(
                            {
                                label:item.name,
                                value:item.id,
                                icon:()=>renderIcon(aks,{borderColor:item.color,borderWidth:2 , backgroundColor:'#fff'}),
                                containerStyle: {
                                    marginVertical:5
                                  },
                            }
                            )
                    });
                    setReminders(x)
            }).catch(error => {
                console.log(error)
            })
            console.log(data)
        }
        catch (e) {
            console.log(e.response)
        }
    }
    const pressSubmit = async ()=>{
        let config = {
            headers: {
                Authorization: 'Bearer ' + state.data.access
            }
        }
        const URL = `invoices/${state.defaultInvoiceId}/reminders/${reminderValue}/transactions/`
        try {
           const {data} = axios.post(URL,{
            name:transactionName,
            color:icon?icon.color:'#0DEAD0',
            icon:icon?icon.id:'i000001',
            price:deposit?transactionPrice:transactionPrice*-1,
            tags:[tagValue]
           },config).then((response)=>{
            clearAll();
            navigation.navigate('Home',{'paramPropKey': 'paramPropValue'})
           })
           
        } catch (error) {
            console.log('error post Transaction ',error);
        }
    }
    useEffect(()=>{
        loadTagsFromApi(state.data.access,state.defaultInvoiceId)
        loadRemaindersFromApi(state.data.access, state.defaultInvoiceId)
    },[props.route.params])
    return(
        <View style={styles.body}>
            <View style={styles.container}>
                <View style={styles.iconPickerBox}>
                    <CircleProfile icon={icon}/>
                </View>
                <View style={styles.inputBox}>
                    <DropDownPicker
                            hideSelectedItemIcon={true}
                            open={tagOpen}
                            value={tagValue}
                            items={tags}
                            setOpen={setTagOpen}
                            setValue={setTagValue}
                            setItems={setTags}
                            dropDownContainerStyle={styles.dropDownContainerStyle}
                            containerStyle={{width:222,}}
                            style={styles.dropDownstyle}
                            badgeColors={["red", "blue", "orange"]}
                            badgeSeparatorStyle={{width: 5}}
                            placeholderStyle={styles.dropDownplaceholderStyle}
                            textStyle={styles.dropDowntextStyle}
                            translation={{
                                PLACEHOLDER: "دسته تراکنش",
                            }}
                            rtl={true}
                        />
                    <InputBox
                        placeholder={'نام تراکنش'}
                        value={transactionName}
                        onChangeText={(text)=>setTransactionName(text)}
                        
                    />
                    
                        <DropDownPicker
                            zIndex={1000}
                            zIndexInverse={3000}
                            open={reminderOpen}
                            value={reminderValue}
                            items={reminders}
                            setOpen={setReminderOpen}
                            setValue={setReminderValue}
                            setItems={setReminders}
                            dropDownContainerStyle={styles.dropDownContainerStyle}
                            containerStyle={{width:222}}
                            style={[styles.dropDownstyle,{height:30,marginBottom:60}]}
                            placeholderStyle={styles.dropDownplaceholderStyle}
                            textStyle={styles.dropDowntextStyle}
                            translation={{
                                PLACEHOLDER: "ریمایندر",
                            }}
                            rtl={true}
                    />
                    
                    <InputBox
                        placeholder={'مبلغ'}
                        keyboardType={"number-pad"}
                        value={transactionPrice}
                        onChangeText={(text)=>setTransactionPrice(text)}
                    />
                    <View>
                    <BouncyCheckboxGroup
                        data={staticData}
                        style={{flexDirection:"row-reverse"}}
                        onChange={(selectedItem) => {
                            if(selectedItem.id===0){
                                setDeposit(true)
                            }else{
                                setDeposit(false)
                            }                            
                        }}
                    />
                    </View>
                </View>
                <View style={styles.submitButtonBox}>
                    <SubmitButton label={'ثبت'} onPress={()=>pressSubmit()}/>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    body:{
        flex:1
    },
    container:{
        backgroundColor:'#FAF8F0',
        justifyContent:"center",
        alignItems:"center",
        flex:1
    },
    iconPickerBox:{
        flex:1,
        justifyContent:"flex-end",
        alignItems:"center",
        marginBottom:20
    },
    inputBox:{
      flex:2,
      justifyContent:"center",
      alignItems:"center"
    },
    submitButtonBox:{
        justifyContent:"flex-end",
        flex:1
    },
    dropdown: {
        margin: 16,
        marginTop:0,
        height: 60,
        width:235,
        backgroundColor: 'transparent',
        borderRadius: 12,
        padding: 12,
        elevation: 0,
        borderBottomColor:'#5724AB',
        borderBottomWidth:2
    },
    icon: {
        marginRight: 5,
    },
    item: {
        backgroundColor:'#FAF8F0',
        flex:1,
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16,
        fontFamily:'Shabnam-FD'
    },
    placeholderStyle: {
        fontSize: 16,
        fontFamily:'Shabnam-FD'
    },
    selectedTextStyle: {
        fontSize: 16,
        fontFamily:'Shabnam-FD'
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        backgroundColor:'#FAF8F0',
        height: 40,
        fontSize: 16,
    },
    circle: {
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.11,
        height: Dimensions.get('window').width * 0.11,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:15
    },
    tagIcon:{
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.09,
        height: Dimensions.get('window').width * 0.09,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    
        dropDownContainerStyle: {
            flex:1,
            borderWidth:0,
            backgroundColor:'#FAF8F0',
            borderBottomColor:'#5724AB',
            borderBottomWidth:2
        },
        dropDownstyle:{
            backgroundColor:'transparent',
            width:222,
            height:60,
            borderWidth:0,
            borderBottomWidth:2,
            borderBottomColor:'#5724AB',
            marginBottom:25,
            borderRadius:0
        },
        dropDownplaceholderStyle:{
            color: "#8A7F9D",
            opacity: 0.8,
        },
        dropDowntextStyle:{
            fontSize: 16,
            color:'#8A7F9D',
            fontFamily:'Shabnam-FD'
        }

    
});
export default AddTransaction;
