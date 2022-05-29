import React from "react";
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native'


const DateProgressBar = (props) => {
    return(
        <View style={styles.container}>
            <View style={styles.progressBarBox}>
                <View style={styles.textBox}>
                    <Text style={styles.firstText}>
                        {props.firstText}
                    </Text>

                    <Text style={styles.scenedText}>
                        {props.scenedText}
                    </Text>
                </View>
                <View style={styles.ProgressBar}>
                    <View style={[styles.filler,{width:`${props.completed}%`,backgroundColor:props.bgcolor}]}>
                    </View>
                </View>
            </View>
            <View style={styles.editButtonBox}>
                <TouchableOpacity
                    onPress={()=>{
                        props.setShowDatePicker(true)
                    }}
                >
                    <Image source={require('../../assets/image/editButton.png')}/>
                </TouchableOpacity>
            </View>
        </View>

    )
}
const styles = StyleSheet.create({
    container:{
        flexDirection:"row"
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
    },
    progressBarBox:{
        flex:5,
        marginRight:10
    },
    editButtonBox:{
        flex:1,
        justifyContent:"flex-end",
        alignItems:'center',
    },

});
export default DateProgressBar;
