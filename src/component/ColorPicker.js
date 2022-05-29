import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View ,TouchableWithoutFeedback} from "react-native";

const ColorPicker = (props) => {
    const colors = [];
    const selcted =
    props.colors?.map((color)=>{
        colors.push(
            <TouchableWithoutFeedback  key={color} onPress={()=>{
                props.setVisible(false)
                props.SelectedColor(color)
            }}>
                <View style={[styles.colorBox,{backgroundColor: color}]}>

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
                            {colors}
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
        marginTop: 22,
    },
    modalView: {
        marginTop:150,
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
        backgroundColor:'#FFC1C1' ,
        borderRadius:10
    }
});

export default ColorPicker;
