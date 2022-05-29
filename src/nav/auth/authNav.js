import React from "react";
import {AuthProvider} from "../../../Context/auth";
import {NavigationContainer} from "@react-navigation/native";
import RootNav from "./RootNav";

const AuthNav = (props) => {
    return(
        <NavigationContainer>
            <AuthProvider>
                <RootNav/>
            </AuthProvider>
        </NavigationContainer>
    );
}
export default AuthNav;
