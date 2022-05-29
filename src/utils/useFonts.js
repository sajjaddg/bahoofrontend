import * as Font from "expo-font";
 
export default useFonts = async () =>
  await Font.loadAsync({
    'LalezarRegular':   require('../../assets/fonts/LalezarRegular.ttf'),
    'Shabnam-Bold-FD':  require('../../assets/fonts/Shabnam-Bold-FD.ttf'),
    'Shabnam-FD':       require('../../assets/fonts/Shabnam-FD.ttf'),
    'Shabnam':          require('../../assets/fonts/Shabnam.ttf'),
    'ShabnamBold':      require('../../assets/fonts/ShabnamBold.ttf'),
    'ShabnamLight':     require('../../assets/fonts/ShabnamLight.ttf'),
    'ShabnamMedium':    require('../../assets/fonts/ShabnamMedium.ttf'),
    'ShabnamMediumFD':  require('../../assets/fonts/ShabnamMediumFD.ttf'),
});