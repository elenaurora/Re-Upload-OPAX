import { StyleSheet, ScrollView, Text, View, SafeAreaView, TouchableOpacity, BackHandler, Platform } from 'react-native'
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { appConfig } from '../config';
import LocalStorage from '../logic/LocalStorage';
import { HeaderView } from '../components/HeaderView';
import PrivacyPolicy from '../components/PrivacyPolicy';


const PrivacyPolicyBootScreen = ({ route, navigation }) => {

    const LOGTAG = "PrivacyPolicyBootScreen";

    const [rejected, setRejected] = useState(false);

    const { t, i18n } = useTranslation();

    const isAndroid = Platform.OS === 'android';

    const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

    useEffect(() => {

        console.log(LOGTAG + ":useEffect");

        // Retrieve privacy policy data from local storage
        LocalStorage.getObject("privacyPolicy").then(value => {

            // Privacy policy acceptance defaults to false
            privacyPolicyAccepted = false;
            if(value != null) { // Update privacy policy acceptance and timestamp if available form local storage
                privacyPolicyAccepted = value.accepted;
                privacyPolicyTimestamp = value.timestamp;
            }
    
            if((privacyPolicyAccepted == true) && 
                (privacyPolicyTimestamp >= appConfig.lastPrivacyPolicyChangeTimestamp)) {
                // Privacy policy was accepted and acceptance timestamp is later than last change to privacy policy
    
                // Go to ManualBootScreen
                navigation.replace('ManualBootScreen');
            }
            else { // Privacy policy was not accepted or changed since last acceptance
    
                // Show privacy policy screen
                setShowPrivacyPolicy(true);
            }
        }); 
    });


    const accept = () => {
        console.log(LOGTAG + " privacy policy accepted");
        LocalStorage.setObject("privacyPolicy", 
            { "accepted": true, "timestamp": new Date().getTime() });

        navigation.replace('ManualBootScreen');
    }

    const reject = () => {
        console.log(LOGTAG + " privacy policy rejected");
        LocalStorage.setObject("privacyPolicy", 
            { "accepted": false, "timestamp": new Date().getTime() });
        if(isAndroid) {
            BackHandler.exitApp();
        }
        else {
            setRejected(true);
        }
    }
    
    if(!showPrivacyPolicy) {

        return (
          <SafeAreaView style={styles.safeAreaView}>
          </SafeAreaView>
        );
    }
    else {    
        if(rejected) {
            return (
                <SafeAreaView style={styles.safeAreaView}>

                    <HeaderView
                        left={null}
                        title={t('PrivacyPolicyScreen.header')}
                    />

                    <ScrollView style={styles.scrollView}>

                        <Text 
                            style={styles.text}
                            >{t('PrivacyPolicyScreen.rejectText')}</Text>

                    </ScrollView>          

                </SafeAreaView>
            );
        }
        else {
            return (
                <SafeAreaView style={styles.safeAreaView}>

                    <HeaderView
                            left={null}
                            title={t('PrivacyPolicyScreen.header')}
                    />

                    <PrivacyPolicy/>

                    <View style={styles.buttonsView}>
                        <TouchableOpacity
                            style={styles.touchableOpacity}
                            onPress={accept}
                        >
                            <Text style={styles.touchableOpacityText}>{t('PrivacyPolicyScreen.acceptButton')}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.touchableOpacity}
                            onPress={reject}
                        >
                            <Text style={styles.touchableOpacityText}>{t('PrivacyPolicyScreen.rejectButton')}</Text>
                        </TouchableOpacity>
                    </View>

                </SafeAreaView>
            );
        }
    }
}

const styles = StyleSheet.create({

    safeAreaView: {
        flex: 1,
        backgroundColor: appConfig.backgroundColor_1,
        paddingBottom: 10
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
    
export default PrivacyPolicyBootScreen;
  