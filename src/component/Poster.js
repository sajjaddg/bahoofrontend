import React from "react";
import {View, StyleSheet, Image} from "react-native";

const Poster = (props) => {
  return(
      <View style={[styles.poster,props.style]}>
            <Image source={props.image.src} style={{width:"100%",height:"100%"}}/>
      </View>
  )
}
const styles=StyleSheet.create({
    poster:{
        overflow:"hidden",
        flex:1,
        height:100,
        width:225,
        borderRadius:20,
        marginHorizontal:12,
        backgroundColor:'#333'
    }
});
export default Poster;
