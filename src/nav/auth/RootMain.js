import React, {useContext, useEffect} from "react";
import Main from "../../screen/Main";
import Login from "../../screen/Auth/Login";
import Verification from "../../screen/Auth/Verification";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {AuthContext} from "../../../Context/auth";
const Stack = createNativeStackNavigator();

const RootMain = (props) => {
    const [state,setState] = useContext(AuthContext);
  return(
      <Stack.Navigator screenOptions={{headerShown:false}} >
      {
          state.isLogin
          ?
          <Stack.Screen name={'Main'} component={Main}/>
          :
          <>
              <Stack.Screen name={'Login'} component={Login}/>
              <Stack.Screen name={'Verification'} component={Verification}/>
              <Stack.Screen name={'Main'} component={Main}/>
          </>
      }
      </Stack.Navigator>
  )
}
export default RootMain;
