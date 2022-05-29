import React from "react";
import {View, StyleSheet, Dimensions, Text, TouchableWithoutFeedback, Image} from "react-native";
import ProgressCircle from  'react-native-progress-circle';
import icon from "../../assets/image/remainderIcon";
const Remainder = (props) => {
    const Svg = icon.find(x=> x.id===props.iconid)
  return(
      <TouchableWithoutFeedback {...props}>
          <View style={[styles.container, props.mainStyle]}>
            <View style={styles.iconBox}>
                <View style={[styles.circle,{borderWidth:2,borderColor:props.borderColor}]}>
                  {/*  <Image source={image.src}/>*/}
                    <Svg.svg/>
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
              <View style={styles.progressBox}>
                  <ProgressCircle
                      percent={props.percent}
                      radius={25}
                      borderWidth={2}
                      color="#5724AB"
                      shadowColor="#E9DBFF"
                      bgColor={'#FAF8F0'}
                  >
                      <Text style={styles.percentText}>{`${props.percent}%`}</Text>
                  </ProgressCircle>
              </View>
          </View>
      </TouchableWithoutFeedback>
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
        marginVertical:6
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
        textAlign:"right",
        fontSize:16,
        marginLeft:10,
        color:'#302B38',
        fontFamily:'Shabnam',
    },
    date:{
        textAlign:"right",
        fontSize:16,
        marginLeft:10,
        color:'#8A7F9D',
        fontFamily:'Shabnam-FD',
    },
    progressBox:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        marginHorizontal:8
    },
    percentText:{
        fontSize:16,
        color:'#302B38',
    }
});
export default Remainder;
