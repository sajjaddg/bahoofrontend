import React, {useEffect, useState} from "react";
import {View, StyleSheet, TouchableOpacity,TouchableWithoutFeedback, Dimensions} from "react-native";
import ColorPicker from "./ColorPicker";

const CircleColorPicker = (props) => {
    const [colors,setColors] = useState(['#FFC1C1','#FFE6C1'
        ,'#FDFF92','#A1FF92','#92E5FF','#E2A6FF',
        '#FF7D7D','#FFC979','#FCFF62','#4CE865','#688EF0','#C365EF']);
    const [selectedColor,setSelectedColor] = useState('#FFC1C1');
    const [visible,setVisible] = useState(false)
    useEffect(()=>{
        props.setSelectColor(selectedColor)
    },[selectedColor])
  return(
          <View style={styles.circle} >
              <View style = {[styles.circleIn,{ backgroundColor:selectedColor}]}>
                  <TouchableOpacity
                      style={styles.circleIn}
                      onPress={()=> {
                          setVisible(!visible)
                      }
                      }
                  >
                    <ColorPicker setVisible={setVisible} visible={visible} colors={colors} SelectedColor={setSelectedColor}/>
                  </TouchableOpacity>
              </View>

          </View>

  );
}

const styles = StyleSheet.create({
    circle: {
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.25,
        height: Dimensions.get('window').width * 0.25,
        borderColor:'#5724AB',
        borderWidth:4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    circleIn:{
        borderRadius: 82,
        width:82,
        height:82,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default CircleColorPicker;
