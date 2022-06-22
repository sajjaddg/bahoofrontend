import React, { useState } from "react";
import {View, StyleSheet, Dimensions, Text,Animated} from "react-native";
import {ReactNativeNumberFormat} from "../utils/ReactNativeNumberFormat";
import Swipeable from 'react-native-gesture-handler/Swipeable'


const TreansactionCard = (props) => {

    return(
        <View style={[styles.container, props.mainStyle]}>
            <View style={styles.iconBox}>
                <View style={[styles.circle,props.circleStyle]}>
                    {
                        props.icon?<props.icon.svg width={38}height={38}/>:null
                        
                    }
                    
                </View>
            </View>
            <View style={styles.textBox}>
                <Text style={styles.titer}>
                    {props.title}
                </Text>
                <Text style={styles.date}>
                    {props.date}
                </Text>
            </View>
            <View style={styles.balanceTextBox}>
                {props.deposit?
                    <>
                        <Text style={[styles.balanceText,{ color:'#09B785' }]}>+</Text>
                        <ReactNativeNumberFormat  textStyle={[styles.balanceText,{ color:'#09B785'}]} value={props.balance} />
                    </>
                    :
                    <>
                        <Text style={[styles.balanceText,{color: '#EC4141'}]}>-</Text>
                        <ReactNativeNumberFormat  textStyle={[styles.balanceText,{ color:'#EC4141'}]} value={props.balance} />
                    </>
                }
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        justifyContent:"space-around",
        alignItems:"center",
        flexDirection:"row-reverse",
        backgroundColor:'#FAF8F0',
        width:340,
        height:70,
        borderRadius:20,
        marginVertical:6,
    },
    iconBox:{
        flex:1,
        marginHorizontal:8
    },
    circle:{
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.14,
        height: Dimensions.get('window').width * 0.14,
        backgroundColor:'#FAF8F0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textBox:{
        flex:3
    },
    titer:{
        paddingTop:20,
        justifyContent:'center',
        alignItems:'center',
        textAlign:"right",
        fontSize:16,
        marginLeft:10,
        color:'#302B38',
        fontFamily:'Shabnam',
    },
    date:{
        textAlign:"right",
        fontSize:18,
        marginLeft:10,
        color:'#8A7F9D',
        fontFamily:'Shabnam-FD',
    },
    balanceTextBox:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        marginHorizontal:8,
        flexDirection:"row"
    },
    balanceText:{
        fontSize:18,
        color:'#302B38',
        fontFamily:'Shabnam-FD',
    }
});
export default TreansactionCard;
