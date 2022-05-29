import React, {useContext, useState} from "react";
import {View, StyleSheet, TouchableOpacity, Image} from "react-native";
import InputBox from "../../../component/InputBox";
import DatePickerJalali from "../../../component/DatePickerJalali";
import CircleProfilePickerRemainder from "../../../component/CircleProfilePickerRemainder";
import SubmitButton from "../../../component/SubmitButton";
import {AuthContext} from "../../../../Context/auth";
import jalaali from '../../../utils/pDate'
import axios from "axios";
import {useNavigation} from "@react-navigation/native";

const AddReminder = () => {

    const [state,setState] = useContext(AuthContext);
    const [showDatePicker,setShowDatePicker]=useState(false);
    const [reminderName,setReminderName]=useState('');
    const [reminderPrice,setReminderPrice]=useState('');
    const [day,setDay]=useState('');
    const [month,setMonth]=useState('');
    const [year,setYear]=useState('');
    const [icon,setIcon] = useState("");
    const navigation = useNavigation();
    const clearAll=()=>{
        setIcon('')
        setDay('')
        setMonth('')
        setYear('')
        setReminderName('')
        setReminderPrice('')
    }
    const pressSubmit = async ()=>{
        let config = {
            headers: {
                Authorization: 'Bearer ' + state.data.access
            }
        }
        // const date = new persianDate([year,month,day]).toCalendar('gregorian').toLocale('en').format('YYYY-MM-DD')
        const rawDate = jalaali.getGregorian({year:parseInt(year), month:parseInt(month), date:parseInt(day)})
        const date = jalaali.format(rawDate.gregorian,'yyyy-mm-dd')
        const URL = `/invoices/${state.defaultInvoiceId}/reminders/`;
        try {
            const {data} = await axios.post(URL,{
                name: reminderName,
                color: icon.border,
                icon: icon.id,
                balance:reminderPrice,
                due_date:date
            },config);
            console.log(data)
            if (data.success){
                clearAll()

                navigation.navigate('Home',{'paramPropKey': 'paramPropValue'})
            }

        }catch (e){
            console.log("inja : ",e.response)
        }
    }
  return(
      <View style={styles.body}>
          <View style={styles.container}>
              <View style={styles.iconPickerBox}>
                  <CircleProfilePickerRemainder setIcon={setIcon} icon={icon}/>
              </View>
              <View style={styles.textInputBox}>
                <InputBox placeholder={'نام ریمایندر'}
                          value={reminderName}
                          onChangeText={(text)=>{setReminderName(text)}}
                />
                <InputBox placeholder={'مبلغ'}
                          keyboardType={"number-pad"}
                          value={reminderPrice}
                          onChangeText={(text)=>{setReminderPrice(text)}}
                />
                <View style={styles.datePickerBox}>
                    <View style={styles.dateInputBox}>
                        <InputBox
                            placeholder={'روز'}
                            bodyStyle={{marginHorizontal:10}}
                            inputBoxStyle={{width:53}}
                            maxLength={2}
                            keyboardType={"number-pad"}
                            value={day}
                            onChangeText={(text)=>{setDay(text)}}
                        />
                        <InputBox
                            placeholder={'ماه'}
                            bodyStyle={{marginHorizontal:10}}
                            inputBoxStyle={{width:53}}
                            maxLength={2}
                            keyboardType={"number-pad"}
                            value={month}
                            onChangeText={(text)=>{setMonth(text)}}
                        />
                        <InputBox
                            placeholder={'سال'}
                            bodyStyle={{marginHorizontal:10}}
                            inputBoxStyle={{width:53}}
                            maxLength={4}
                            keyboardType={"number-pad"}
                            value={year}
                            onChangeText={(text)=>{setYear(text)}}
                        />
                    </View>
                    <View style={styles.editButtonBox}>
                        <TouchableOpacity
                            onPress={()=>{
                                setShowDatePicker(true)
                            }}
                        >
                            <Image source={require('../../../../assets/image/editButtonP.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
              </View>
              <View style={styles.submitButtonBox}>
                    <SubmitButton label={'ثبت'} onPress={()=>pressSubmit()}/>
              </View>
              <DatePickerJalali
                  visible={showDatePicker}
                  setVisible={setShowDatePicker}
                  setYear={setYear}
                  setDay={setDay}
                  setMonth={setMonth}
              />
          </View>
      </View>
  )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#FAF8F0',
        flex:1
    },
    body:{
        flex:1
    },
    iconPickerBox:{
        flex:1,
        justifyContent:"flex-end",
        alignItems:"center",
        marginBottom:20
    },
    textInputBox:{
        flex:1.5,
    },
    datePickerBox:{
        flex:1,
        flexDirection:"row-reverse",
        alignItems:"flex-start",
        marginLeft:15,
        justifyContent:"center"
    },
    editButtonBox:{
        alignItems:"center",
        marginTop:20,
        flex:1
    },
    dateInputBox:{
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row-reverse",
        marginTop:20,
        flex:3
    },
    submitButtonBox:{
        flex:1,
        alignItems:'center',
        marginLeft:15,
        justifyContent:"flex-end"
    }
})
export default AddReminder;
