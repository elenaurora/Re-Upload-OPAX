import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { appConfig } from '../config';

const Map = () => {

    const LOGTAG = "Map";

    const { t, i18n } = useTranslation();

    const [currentState, setCurrentState] = useState(1);

    console.log(LOGTAG + ":state=" + currentState);

    return (

        <View style={styles.imageView}>
        <ImageBackground 
              source={require('../assets/images/PIANTINA_WC.png')}  
              imageStyle={{ opacity: 1.0}} 
              resizeMode='cover'
              style={styles.imageBackground}
        />
      </View>

        
    );

}

const styles = StyleSheet.create({


imageView: { /** grandezza foto*/
paddingTop: 30,
flex: 0.90,

},
imageBackground: {
  flex: 1,
  justifyContent: 'center',
  borderBottomWidth: 10,
  borderTopWidth: 10,
  borderColor: "white"
},


});

export default Map;
