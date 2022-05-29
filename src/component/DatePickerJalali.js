import React, { useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View ,TouchableWithoutFeedback} from "react-native";
import DatePicker from '@mohamadkh75/react-native-jalali-datepicker';

const DatePickerJalali = (props) => {
  return(
      <View style={styles.centeredView}>
          <Modal
              animationType="fade"
              transparent={true}
              visible={props.visible}
              onRequestClose={() => {
                  props.setVisible(!props.visible);
              }}
          >
              <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                      <View>
                          <DatePicker
                              style={{
                                  width: '100%',
                                  height: '100%',
                                  alignSelf: 'center',
                                  backgroundColor: '#FAF8F0',
                                  borderWidth: 0,
                                  borderColor: '#4bcffa',
                                  borderRadius: 20,
                                  elevation: 4
                              }}
                              selected='1399/1/18'
                              dateSeparator='/'
                              minDate='1398/1/18'
                              maxDate='1402/1/18'
                              headerContainerStyle={{ height: '15%' }}
                              yearMonthBoxStyle={{
                                  width: '30%',
                                  height: '75%',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  borderWidth: 1,
                                  borderRadius: 10
                              }}
                              yearMonthTextStyle={{ fontSize: 22, color: '#4bcffa' }}
                              iconContainerStyle={{ width: `${100 / 7}%` }}
                              backIconStyle={{
                                  width: 20,
                                  height: 20,
                                  resizeMode: 'center',
                                  tintColor: '#808e9b'
                              }}
                              nextIconStyle={{
                                  width: 20,
                                  height: 20,
                                  resizeMode: 'center',
                                  tintColor: '#4bcffa'
                              }}
                              eachYearStyle={{
                                  width: 110,
                                  height: 82,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  backgroundColor: '#4bcffa',
                                  marginTop: '1.5%',
                                  marginBottom: 5,
                                  marginHorizontal: '1.5%',
                                  borderRadius: 10,
                                  elevation: 3
                              }}
                              eachYearTextStyle={{
                                  fontSize: 16,
                                  color: 'white'
                              }}
                              eachMonthStyle={{
                                  width: `${88 / 3}%`,
                                  height: `${88 / 4}%`,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  backgroundColor: '#8A7F9D',
                                  marginBottom: '3%',
                                  borderRadius: 10,
                                  elevation: 3
                              }}
                              eachMonthTextStyle={{ fontSize: 16, color: 'white' }}
                              weekdaysContainerStyle={{ height: '10%' }}
                              weekdayStyle={{
                                  flex: 1,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  backgroundColor: '#16B58F',
                                  marginHorizontal:8,
                                  borderRadius:4,
                              }}
                              weekdayTextStyle={{
                                  fontSize: 16,
                                  color: '#fff',
                                  marginBottom: 5
                              }}
                              borderColor='#4bcffa'
                              dayStyle={{
                                  width: `${100 / 7}%`,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  aspectRatio: 1 / 1
                              }}
                              selectedDayStyle={{
                                  width: '70%',
                                  aspectRatio: 1 / 1,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  borderRadius: 6
                              }}
                              selectedDayColor='#C8FFF2'
                              dayTextStyle={{ fontSize: 18 }}
                              selectedDayTextColor='#8A7F9D'
                              dayTextColor='#8A7F9D'
                              disabledTextColor='#BCBBBE'
                              onDateChange={date =>
                              {
                                  console.log(date)
                                  const myArray = date.split('/')
                                  props.setYear(myArray[0])
                                  props.setMonth(myArray[1])
                                  props.setDay(myArray[2])
                                  props.setVisible(!props.visible)
                              }
                          }
                          />
                      </View>
                  </View>
              </View>
          </Modal>
      </View>
  );
}
const styles=StyleSheet.create({
    centeredView: {

    },
    modalView: {
        marginTop:250,
        borderRadius: 10,
        alignItems: "flex-start",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        width:'90%',
        height:'58%',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 130,
        marginHorizontal:20
    },
})
export default DatePickerJalali;
