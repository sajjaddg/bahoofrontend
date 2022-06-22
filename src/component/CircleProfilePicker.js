import React, {useEffect, useState} from "react";
import {View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Dimensions, Image} from "react-native";
import ColorPicker from "./ColorPicker";
import IconPicker from "./IconPicker";
import icon from "../../assets/image/remainderIcon";

const CircleProfilePicker = (props) => {

    const [icons,setIcons] = useState(icon);
    const [selectedIcon,setSelectedIcon] = useState(props.icon);
    const [visible,setVisible] = useState(false)
  return(
          <View style={[styles.circle,{borderColor:props.icon===''?'#5724AB':props.icon.border}]} >
              <View style = {[styles.circleIn,{ backgroundColor:props.icon===''?'#E9DBFF':'#fff'}]}>
                  <TouchableOpacity
                      style={styles.circleIn}
                      onPress={()=> {
                          setVisible(!visible)
                      }
                      }
                  >
                    <IconPicker setVisible={setVisible} visible={visible} icons={icons} setSelectedIcon={props.setIcon}/>
                      {
                          props.icon!==''?
                              /*<Image source={props.icon.src} style={{ width: '60%', height: '60%',resizeMode: 'stretch',marginBottom:20}}/>*/
                              <props.icon.svg
                                  width={55}
                                  height={55}
                                  style={{resizeMode: 'stretch',marginBottom:15}}
                              />
                          :
                              null
                      }
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
        borderWidth:3,
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

export default CircleProfilePicker;
