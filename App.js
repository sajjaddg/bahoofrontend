import React , { useState,useEffect } from 'react';
import AuthNav from "./src/nav/auth/authNav";
import useFonts from './src/utils/useFonts'
import {LogBox} from "react-native";


const App = () => {
  const [IsReady, SetIsReady] = useState(false);
  const LoadFonts = async () => {
    await useFonts();
  };
  LogBox.ignoreLogs([
    "ViewPropTypes will be removed",
    "ColorPropType will be removed",
    ])
  useEffect(() => {
    async function prepare() {
      try {
        await LoadFonts();
        await new Promise(resolve => setTimeout(resolve, 2000));
        
      } catch (e) {
        console.warn(e);
      } finally {
        
        SetIsReady(true);
      }
    }

    prepare();
  }, []);
  if(!IsReady){
    return null;
  }
  
  return (
    <AuthNav/>
  );
  
};


export default App;
