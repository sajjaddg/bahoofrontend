import React, { useState } from "react";
import {Alert, Modal, StyleSheet, Text, Pressable, View, TouchableWithoutFeedback, Image} from "react-native";
import Svg1 from '../../assets/image/remainderIcon/000001.svg'
const IconPicker = (props) => {
    const icons = [];
    props.icons?.map((icon)=>{
        console.log(icon);
        icons.push(
            <TouchableWithoutFeedback  key={icon.border} onPress={()=>{
                props.setVisible(false)
                props.setSelectedIcon(icon)
            }}>
                <View style={[styles.colorBox,{backgroundColor: '#fff',borderColor:icon.border}]}>
                    {/* <Image source={icon.src}/> */}
                    <icon.svg/>
                    {/* <Svg1/> */}
                </View>
            </TouchableWithoutFeedback>
        )
    });
    return (
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
                        <View style={styles.colorsBox}>
                            {icons}
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    modalView: {
        backgroundColor:'#FAF8F0',
        borderRadius: 10,
        padding: 20,
        alignItems: "flex-start",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        width:330,
        height:125,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 110
    },
    colorsBox:{
        flexDirection:'row',
        display:'flex',
        flexWrap: 'wrap' ,
        justifyContent:'center'
    },
    colorBox:{
        height:40,
        width:40 ,
        marginLeft:8,
        marginBottom:8,
        borderRadius:10,
        borderWidth:2,
        justifyContent:"center",
        alignItems:"center"
    }
});

export default IconPicker;
