import React from "react";
import {View, StyleSheet, Dimensions} from "react-native";

const CircleProfile = (props) => {
  return(
          <View style={[styles.circle,{borderColor:'#5724AB'}]} >
              <View style = {[styles.circleIn,{ 
                  backgroundColor:props.icon===''?'#E9DBFF':props.icon.color
                  }]}>
                      {
                          props.icon!==''?
                              /*<Image source={props.icon.src} style={{ width: '60%', height: '60%',resizeMode: 'stretch',marginBottom:20}}/>*/
                              <props.icon.svg
                                  width={55}
                                  height={55}
                                  style={{resizeMode: 'stretch',marginBottom:0}}
                              />
                          :
                              null
                      }
                
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

export default CircleProfile;
