import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { appConfig } from '../config';
import LocalStorage from '../logic/LocalStorage';
import Manual from '../components/Manual';
import { HeaderView } from '../components/HeaderView';
import { useTranslation } from 'react-i18next';


const ManualBootScreen = ({ route, navigation }) => {

  const LOGTAG = "ManualBootScreen";

  const { t, i18n } = useTranslation();

  const [showManual, setShowManual] = useState(false);

  useEffect(() => {

    console.log(LOGTAG + ":useEffect");

    // Retrieve manual data from local storage
    LocalStorage.getObject("manual").then(value => {

      // Maual shown status defaults to false
      manualShown = false;
      if(value != null) { // Update manual shown status and timestamp if available from local storage
        manualShown = value.shown;
        manualTimestamp = value.timestamp;
      }

      if((manualShown == true) && 
        (manualTimestamp >= appConfig.lastManualChangeTimestamp)) {
          // Manual was shown and timestamp is later that last change to manual
          
          console.log(LOGTAG + ":useEffect manual shown already, goto MuseumsListScreen");

          // Show museums list screen
          navigation.replace('VisualizationChoice');
      }
      else { // Manual was never shown or changed since last time it was shown

          console.log(LOGTAG + ":useEffect manual not shown yet");

          // Show manual screen
          setShowManual(true)
      }     
      
    });
    

  });

  const skip = () => {
    console.log(LOGTAG + " skipping manual");

    // Update local storage to keep track that manual was shown     
    LocalStorage.setObject("manual", 
        { "shown": true, "timestamp": new Date().getTime() });

    // Go to MuseumsListScreen
    navigation.replace('VisualizationChoice');
  }

  if(!showManual) {

    return (
      <SafeAreaView style={styles.safeAreaView}>


      </SafeAreaView>
    );
  }
  else {
    return (


      <SafeAreaView style={styles.safeAreaView}>

        <HeaderView
            left={null}
            title={t('ManualScreen.header')}
        />

        <Manual/>

        <View style={styles.buttonsView}>
            <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={skip}
            >
                <Text style={styles.touchableOpacityText}>{t('ManualScreen.skipButton')}</Text>
            </TouchableOpacity>

        </View>


      </SafeAreaView>

    );
  }
}; 


const styles = StyleSheet.create({

  safeAreaView: {
      flex: 1,
      backgroundColor: appConfig.backgroundColor_1,
      paddingBottom: 0
  },  
  buttonsView: {
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 20,
    alignItems: 'center'
  },
  touchableOpacity: {
      marginVertical: 10,
      padding: 10,
      borderRadius: 20,
      backgroundColor: appConfig.backgroundColor_2
  },
  touchableOpacityText: {
      fontSize: 28,
      fontFamily: appConfig.fontFamily_1,
      color: appConfig.fontColor_2,
      paddingVertical: 10,
      paddingHorizontal: 30,
      textAlign: 'center'
  }

});


export default ManualBootScreen;