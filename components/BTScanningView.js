import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, SafeAreaView, Animated, Text, Image, Easing } from 'react-native';
import { appConfig } from '../config';
import { HeaderView, BackButton_b, HeaderButton } from './HeaderView';
import { useTranslation } from 'react-i18next';

const BTScanningView = ({ disableProximityCallback }) => {

    const LOGTAG = "BTScanningView";

    const sizeRef = useRef(new Animated.Value(50));

    const { t, i18n } = useTranslation();

    const animationTimer = useRef(undefined);

    useEffect(() => {

        startAnimation();
        console.log(LOGTAG + " Starting animation timer");
        animationTimer.current = setInterval(function() {

            // Timer fired: run animation
            startAnimation();
        }, 2200);

        return (() => {
            console.log(LOGTAG + " Stopping animation timer");
            clearInterval(animationTimer.current);
        });
    });

    const startAnimation = () => {
        
        console.log(LOGTAG + " Reset size value");
        Animated.sequence([
            Animated.timing(sizeRef.current, {
                toValue: 150,
                duration: 1000,
                easing: Easing.inOut(Easing.quad),
                useNativeDriver: false,
            }),
            Animated.timing(sizeRef.current, {
                toValue: 50,
                duration: 1000,
                easing: Easing.inOut(Easing.quad),
                useNativeDriver: false,
            })
        ]).start();
  
    }

    return (
        <SafeAreaView style={styles.container}>
            
            <HeaderView
                color={appConfig.backgroundColor_3}
                left={<BackButton_b/>}
                title={""}
                bar={true}
                right={<HeaderButton 
                    label={t('HeaderView.disableProximityButtonLabel')}
                    callback={disableProximityCallback}
                    image={<Image source={require('../assets/images/proximity_icon.png')} style={resizeMode='contain'}
                     />}
                />}
            />

            <Text style={styles.scanningText}>
                Scanning ...
            </Text>

            <View style={styles.imageView}>
                <Animated.View style={{ ...styles.animatedView, height: sizeRef.current, width: sizeRef.current}}>
                    <Image source={require('../assets/images/scanning.png')} style={styles.scanningImage}
                     />
                </Animated.View>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appConfig.backgroundColor_1,
        alignItems: 'center'
    },
    scanningText: {
        fontSize: 28,
        fontFamily: appConfig.fontFamily_1,
        color: appConfig.fontColor_1,
        margin: 30
    },
    imageView: {
        height: '50%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    animatedView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    scanningImage: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain'
    }
    
});

export default BTScanningView;
