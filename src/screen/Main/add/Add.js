import React from "react";
import {Text, View,StyleSheet} from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AddReminder from "./AddReminder";
import AddTransaction from "./AddTransaction";

const Tab = createMaterialTopTabNavigator();

const Add =()=>{
    return(
        <View style={styles.body}>
            <View style={styles.container}>
                <Tab.Navigator
                    screenOptions={{
                        tabBarPressColor: "transparent",
                        tabBarActiveTintColor: '#5724AB',
                        tabBarStyle: {
                            backgroundColor: 'transparent',
                            elevation: 0,
                        },
                        tabBarIndicatorStyle: {
                            borderBottomColor: '#5724AB',
                            borderBottomWidth: 4,
                            borderRadius:4
                        }
                    }}
                >
                    <Tab.Screen name="AddReminder" component={AddReminder} options={{
                        tabBarLabel:({focused,title})=>{
                            return(
                                focused?<Text style={[styles.labelStyle,{color:'#5724AB'}]}>{'ریمایندر'}</Text>
                                    :<Text style={[styles.labelStyle,{color:'#8A7F9D'}]}>{'ریمایندر'}</Text>
                            )
                        }
                    }} />
                    <Tab.Screen name="AddTransaction" component={AddTransaction} options={{
                        tabBarLabel:({focused,title})=>{
                            return(
                                focused?<Text style={[styles.labelStyle,{color:'#5724AB'}]}>{'تراکنش'}</Text>
                                    :<Text style={[styles.labelStyle,{color:'#8A7F9D'}]}>{'تراکنش'}</Text>
                            )
                        }
                    }}
                    listeners={({ navigation }) => ({
                        blur: () => navigation.setParams({ screen: 'undefined' }),
                      })}
                    />
                </Tab.Navigator>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        margin:45,
    },
    labelStyle:{
        fontSize: 18,
        fontFamily:'ShabnamMedium'
    },
    body:{
        backgroundColor:'#FAF8F0',
        flex:1
    }
})
export default Add;
