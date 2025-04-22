import { StyleSheet, View, Text, Linking, TouchableOpacity, Image, ImageBackground, ActivityIndicator, SafeAreaView, Animated, Easing, Modal } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { checkMuseumsFile, DataFetchError, fetchMuseumsFile, deleteMuseumsFile } from '../logic/DataFetchSupport';

import { useTranslation } from 'react-i18next';
import RNFS from 'react-native-fs';
import NotificationView from '../components/NotificationView';
import EndOfScreenView from '../components/EndOfScreenView';
import { appConfig } from '../config';
import LanguageSelectionView from '../screens/LanguageSelectionView';

const VisualizationChoice = ({ navigation }) => {

  const LOGTAG = "VisualizationChoice";

  const { t, i18n } = useTranslation();

  const [headerPosition, setHeaderPosition] = useState(0);
    
  const [languageSelectionModalVisible, setLanguageSelectionModalVisible] = useState(false);
    
  const renderLanguageSelectionModal = () => {

    return (
          <LanguageSelectionView
            languageOptions={[
              { label: '', code: 'en', flag: require('../assets/images/testo.png')},
              { label: '', code: 'caa', flag: require('../assets/images/caa_icona.png')  }
            ]}
            selectCallback={(code) => {
              i18n.changeLanguage(code);
              setLanguageSelectionModalVisible(false);
            }}
          />
  
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      <View 
        style={styles.headerView}
        onLayout={ (event) => {
          const layout = event.nativeEvent.layout;
          const newHeaderPosition = layout.y;
          console.log(LOGTAG + " headerPosition y=" + layout.y);
          setHeaderPosition(newHeaderPosition);
        }}

      >
        
        <View style={styles.headerRow}>
          <View style={styles.mvlView}>
            <Text style={styles.mvlText}>OPAX</Text>
            <Image
                source={require('../assets/images/logo_app_w.png')}  
                style={styles.mvlIcon}
            />
          </View>


        </View>

        <View style={styles.headerBar}></View>

      </View>


      {renderLanguageSelectionModal()}

      <EndOfScreenView/>

    </SafeAreaView>
  );
}; 




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appConfig.backgroundColor_3
  },
  headerView: { /**header*/
    flexDirection: 'column',
    height: 80,
  },
  headerRow: {
    flexDirection: 'row',
    height: 80, /** contenuto header*/
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    backgroundColor: appConfig.backgroundColor_2,
  },
  mvlView: { 
    flexDirection: 'row',
    alignItems: 'center'
  },
  mvlText: { /** scritta logo*/
    fontFamily: appConfig.fontFamily_3,
    color: appConfig.fontColor_2,
    fontSize: 30,
  },
  mvlIcon: { /** simbolo logo*/
    width: 45,
    height: 45,
    left: 15
  },

  headerBar: { /** linea header opt.*/
    height: 3,
    width: '0%',
    alignSelf: 'center',
    backgroundColor: appConfig.backgroundColor_2,
  },
 
  bottomView: {
    flexDirection: 'row',
    maxHeight: 40,
    paddingHorizontal: 40,
    paddingBottom: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

});

export default VisualizationChoice;

