import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Loader from "../../screen/Loader";
import RootMain from "./RootMain";

const Stack = createNativeStackNavigator();
export default function RootNav() {
    return(
        <Stack.Navigator screenOptions={{headerShown:false}} >
            <Stack.Screen name={'Loader'} component={Loader}/>
            <Stack.Screen name={'RootMain'} component={RootMain}/>
        </Stack.Navigator>
    )

}

