import React from "react";
import {View, StyleSheet, Text, Dimensions} from "react-native";
import {ReactNativeNumberFormat} from "../utils/ReactNativeNumberFormat";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faArrowDown} from '@fortawesome/free-solid-svg-icons/faArrowDown'
import {faArrowUp} from '@fortawesome/free-solid-svg-icons/faArrowUp'

const MainCard = (props) => {
  return(
      <View style={styles.mainCards}>
          <View style={styles.mainCardsTop}>
              <ReactNativeNumberFormat  textStyle={styles.mainCardsTopText} value={props.balance} />
          </View>
          <View style={styles.mainCardsDown}>
              <View style={styles.depositBox}>
                <View style={styles.circle}>
                <FontAwesomeIcon icon={faArrowDown} style={{color:'#EC4141'}}/>
                </View>
                  <ReactNativeNumberFormat textStyle={styles.depositText} value={props.totalSpent}/>
                  
              </View>
              <View style={styles.depositBox}>
                  <View style={styles.circle}>
                      <FontAwesomeIcon icon={faArrowUp} style={{color:'#16B555'}} />
                  </View>
                  <ReactNativeNumberFormat textStyle={styles.depositText} value={props.totalGain}/>
              </View>
          </View>
      </View>
  )
}
const styles=StyleSheet.create({
    mainCards:{
        display:"flex",
        backgroundColor:'#5724AB',
        width:370,
        height:130,
        borderRadius:18,
    }
    ,
    mainCardsTop:{
        flex:1,
        alignItems:"flex-start",
        marginLeft:42,
        marginTop:21
    },
    mainCardsTopText:{
        textAlign:"left",
        fontSize:30,
        color:'#FAF8F0',
        fontFamily:'Shabnam-Bold-FD',
    },
    mainCardsDown:{
        flex:1,
        flexDirection:"row",
        justifyContent:"space-around",
        marginBottom:8
    },
    depositBox:{
        marginHorizontal:20,
      flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
    },
    depositText:{
        textAlign:"left",
        fontSize:16,
        marginLeft:10,
        color:'#FAF8F0',
        fontFamily:'Shabnam-FD',
    },
    circle:{
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.075,
        height: Dimensions.get('window').width * 0.075,
        backgroundColor:'#FAF8F0',
        justifyContent: 'center',
        alignItems: 'center'
    },
});
export default MainCard;
