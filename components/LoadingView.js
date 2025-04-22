import React from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { appConfig } from '../config';

const LoadingView = ({loadedPercentage}) => {

    return (
        <View style={styles.loadingView}>
            <Text style={styles.loadingText}>Loading...</Text>
            <ActivityIndicator 
              size="large" 
              color={appConfig.fontColor_2}
              style={styles.spinner}
            />
            <Text style={styles.percentageText}>{loadedPercentage} %</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    loadingView: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 50,
      paddingHorizontal: 20,
      backgroundColor: appConfig.backgroundColor_2
    },
    loadingText: {
        fontSize: 60,
        padding: 20,
        textAlign: 'justify',
        fontFamily: appConfig.fontFamily_1,
        color: appConfig.fontColor_1
    },
    spinner: {
      padding: 40,
    },
    percentageText: {
      fontSize: 60,
      padding: 20,
      textAlign: 'center',
      fontFamily: appConfig.fontFamily_1,
      color: appConfig.fontColor_2
    }
  });

export default LoadingView;



