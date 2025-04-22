import { StyleSheet, ImageBackground, Text, View, SafeAreaView, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { appConfig } from '../config';

const SplashScreen = ({ navigation }) => {

  const LOGTAG = "SplashScreen";

  const { t, i18n } = useTranslation();

  const splashScreenDuration = 3000;

  const mainScreenTimer = useRef(null);

  useEffect(() => {

    console.log(LOGTAG + ":useEffect setting timer to go to main screen");

    mainScreenTimer.current = setTimeout(() => {
          // checkPrivacyPolicy();
          skip();
        }, splashScreenDuration);
  });

  const skip = () => {
    navigation.replace('PrivacyPolicyBootScreen');
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <TouchableWithoutFeedback style={styles.container} 
          onPress={() => {
            console.log(LOGTAG + " Click");
            clearTimeout(mainScreenTimer.current);
            skip();
          }}
      >
        <View style={styles.container}>
          <ImageBackground 
            source={require('../assets/images/splash_screen.jpg')}  
            imageStyle={{ opacity: 1.0}} 
            resizeMode='cover'
            style={styles.imageBackground}
            >

            <View style={styles.bannerView}>
              <Text 
                style={styles.bannerText}
                adjustsFontSizeToFit={true}
                numberOfLines={1}
              >{t('SplashScreen.bannerText')}</Text>
            </View>

          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: 'white'
  },    
  imageBackground: {
    flex: 1,
    resizeMode: 'contain'
  },
  bannerView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 25,
    justifyContent: 'center',
    backgroundColor: appConfig.backgroundColor_2,
    borderTopWidth: 3,
    borderTopColor: 'white',
  },
  bannerText: {
    fontFamily: appConfig.fontFamily_3,
    fontSize: 55,
    color: appConfig.fontColor_2,
    textAlign: 'center'
  },
});
  
export default SplashScreen;
