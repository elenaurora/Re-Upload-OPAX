import { StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { appConfig } from '../config';
import { HeaderView, BackButton } from '../components/HeaderView';
import Manual from '../components/Manual';

const ManualScreen = ({ route, navigation }) => {

  const LOGTAG = "ManualScreen";

  const { t, i18n } = useTranslation();
  

  return (
    <SafeAreaView style={styles.safeAreaView}>

        <HeaderView
            left={<BackButton/>}
            titlecolor= {appConfig.fontColor_2}
            color={appConfig.backgroundColor_2}
            title={t('ManualScreen.header')}
        />

        <Manual/>

    </SafeAreaView>
  );
}; 

const styles = StyleSheet.create({

  safeAreaView: {
      flex: 1,
      backgroundColor: appConfig.backgroundColor_3,
      paddingBottom: 10
  },  


});

export default ManualScreen;