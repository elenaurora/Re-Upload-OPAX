import { StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { appConfig } from '../config';
import { HeaderView, BackButton } from '../components/HeaderView';
import Map from '../components/Map';

const MapScreen = ({ route, navigation }) => {

  const LOGTAG = "MapScreen";

  const { t, i18n } = useTranslation();
  

  return (
    <SafeAreaView style={styles.safeAreaView}>

        <HeaderView
            left={<BackButton/>}
            title={t('MapScreen.header')}
            color={appConfig.backgroundColor_2}
            titlecolor={appConfig.fontColor_2}
        />
        <Map/>
    </SafeAreaView>
  );
}; 

const styles = StyleSheet.create({

  safeAreaView: {
      flex: 1,
      backgroundColor: appConfig.backgroundColor_2,
      paddingBottom: 0
  },  

});

export default MapScreen;