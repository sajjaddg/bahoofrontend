import React, {useContext, useEffect, useState} from "react";
import {Text, View, StyleSheet, Dimensions} from "react-native";
import SubmitButton from "../../../component/SubmitButton";
//import {Dropdown} from "react-native-element-dropdown";
import AntDesign from 'react-native-vector-icons/AntDesign';
import icons from "../../../../assets/image/tagicon";
import axios from "axios";
import {AuthContext} from "../../../../Context/auth";
import InputBox from "../../../component/InputBox";
import icon from "../../../../assets/image/remainderIcon";
import DropDownPicker from 'react-native-dropdown-picker';


const AddTransaction = () => {
    const [state,setState] = useContext(AuthContext);
    const [tagOpen, setTagOpen] = useState(false);
    const [tagValues, setTagValues] = useState([]);
    const [tags, setTags] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'}
  ]);
  DropDownPicker.setMode("BADGE");
    
    const renderTagIcon = (icon,color) => {
        return(
            <View style={[styles.tagIcon,{backgroundColor:color}]}>
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
                                icon:()=>renderTagIcon(aks,item.color),
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
    const pressSubmit = async ()=>{}
    useEffect(()=>{
        loadTagsFromApi(state.data.access,state.defaultInvoiceId)
        loadRemaindersFromApi(state.data.access, state.defaultInvoiceId)
    },[])
    return(
        <View style={styles.body}>
            <View style={styles.container}>
                <View style={styles.iconPickerBox}>

                </View>
                <View style={styles.inputBox}>
                <DropDownPicker
                    multiple={true}
                    min={0}
                    max={3}
                    open={tagOpen}
                    value={tagValues}
                    items={tags}
                    setOpen={setTagOpen}
                    setValue={setTagValues}
                    setItems={setTags}
                    dropDownContainerStyle={{
                        borderWidth:0,
                        backgroundColor:'#FAF8F0',
                        borderBottomColor:'#5724AB',
                        borderBottomWidth:2
                    }}
                    containerStyle={{
                        width:222,
                    
                    }}
                    
                    style={{
                        backgroundColor:'transparent',
                        width:222,
                        borderWidth:0,
                        borderBottomWidth:2,
                        borderBottomColor:'#5724AB',
                        marginBottom:25,
                        borderRadius:0
                      }}
                    badgeColors={["red", "blue", "orange"]}
                    badgeSeparatorStyle={{
                        width: 5
                      }}
                      placeholderStyle={{
                        color: "#8A7F9D",
                        opacity: 0.8,
                    }}
                    textStyle={
                        {
                            fontSize: 16,
                            color:'#8A7F9D',
                            fontFamily:'Shabnam-FD'
                        }
                    }
                    translation={{
                        PLACEHOLDER: "دسته تراکنش",
                      }}
                    rtl={true}
                />
                    {/* <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={tags}
                        maxHeight={300}
                        labelField="name"
                        valueField='name'
                        placeholder="نام دسته تراکنش"
                        value={tagValue}
                        onChange={item => {
                            setTagValue(item.name);
                        }}
                        renderLeftIcon={() => (
                            <AntDesign
                                style={styles.icon}
                                color={'blue'}
                                name="down"
                                size={20}
                            />
                        )}
                        renderRightIcon={() => null}
                        renderItem={renderTagItem}
                    /> */}
                    <InputBox
                        placeholder={'نام تراکنش'}
                    />
                    {/* <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={remainders}
                        maxHeight={300}
                        labelField="name"
                        valueField='name'
                        placeholder="انتخاب ریمایندر"
                        value={remainderValue}
                        onChange={item => {
                            setRemainderValue(item.name);
                        }}
                        renderLeftIcon={() => (
                            <AntDesign
                                style={styles.icon}
                                color={'blue'}
                                name="down"
                                size={20}
                            />
                        )}
                        renderRightIcon={() => null}
                        renderItem={renderRemainderItem}
                    /> */}
                    <InputBox
                        placeholder={'مبلغ'}
                        keyboardType={"number-pad"}
                    />
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
        
    }
});
export default AddTransaction;
