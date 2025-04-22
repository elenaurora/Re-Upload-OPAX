import { StyleSheet, SafeAreaView } from 'react-native'
import React from 'react';
import { useTranslation } from 'react-i18next';
import { appConfig } from '../config';
import { HeaderView, BackButton } from '../components/HeaderView';
import PrivacyPolicy from '../components/PrivacyPolicy';


const PrivacyPolicyScreen = ({ route, navigation }) => {

    const LOGTAG = "PrivacyPolicyScreen";

    const { t, i18n } = useTranslation();

    return (
        <SafeAreaView style={styles.safeAreaView}>

            <HeaderView
                    left={<BackButton/>}
                    title={t('PrivacyPolicyScreen.header')}
            />

            <PrivacyPolicy/>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    safeAreaView: {
        flex: 1,
        backgroundColor: appConfig.backgroundColor_1,
        paddingBottom: 10
    }  
  
});
    
export default PrivacyPolicyScreen;
  