import React from "react";
import {View, StyleSheet, Text} from 'react-native'
import {ReactNativeNumberFormat} from "../utils/ReactNativeNumberFormat";
const BalanceProgressBar = (props) => {
    return(
        <View style={styles.container}>
            <View style={styles.textBox}>
                <ReactNativeNumberFormat textStyle={styles.firstText} value={props.firstText}/>
                <ReactNativeNumberFormat textStyle={styles.scenedText} value={props.scenedText}/>
            </View>
            <View style={styles.ProgressBar}>
                <View style={[styles.filler,{width:`${props.completed}%`,backgroundColor:props.bgcolor}]}>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{

    },
    ProgressBar:{
        height: 7,
        width: '100%',
        backgroundColor: "#e0e0de",
        borderRadius: 50,
    },
    filler : {
        height: '100%',
        borderRadius: 50,
        textAlign: 'right',
        transition: 'width 1s ease-in-out',
    },
    textBox:{
        flexDirection:"row",
        justifyContent:'space-between',
        marginBottom:6,
    },
    scenedText:{
        textAlign:"center",
        fontSize:16,
        color:'#8A7F9D',
        fontFamily:'ShabnamMediumFD',
    },
    firstText:{
        textAlign:"center",
        fontSize:16,
        color:'#302B38',
        fontFamily:'ShabnamMediumFD',
    }
});
export default BalanceProgressBar;
