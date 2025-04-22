import { StyleSheet, SafeAreaView } from 'react-native'
import { Platform, PermissionsAndroid, Alert } from 'react-native'
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const PermissionsScreen = ({ navigation }) => {

  const LOGTAG = "PermissionsScreen";

  const { t, i18n } = useTranslation();

  const isAndroid = Platform.OS === 'android';

  useEffect(() => {
    requestPermissions().then(
      _ => {
        navigation.replace('SplashScreen');
      }
    );
  });

  const requestPermissions = async () => {

    console.log(LOGTAG + " requesting permissions");
    if(isAndroid) {
      try {

        let permissionResults = await PermissionsAndroid.requestMultiple(
          [ 
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          ]   
        );

        if(permissionResults[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] !=
          PermissionsAndroid.RESULTS.GRANTED) {
            console.log(LOGTAG + " Location permission denied");
            Alert.alert(
              t('App.locationPermission.alertTitle'),
              t('App.locationPermission.alertMessage')
            );      
        }

        if(Platform.Version >= 31) {
          permissionResults = await PermissionsAndroid.requestMultiple(
            [ 
              PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
              PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
            ]   
          );

          if(permissionResults[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] !=
            PermissionsAndroid.RESULTS.GRANTED) {
              console.log(LOGTAG + " Bluetooth scan permission denied");
              Alert.alert(
                t('App.bluetoothPermission.alertTitle'),
                t('App.bluetoothPermission.alertMessage')
              );      
          }

          if(permissionResults[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT] !=
            PermissionsAndroid.RESULTS.GRANTED) {
              console.log(LOGTAG + " Bluetooth connect permission denied");
              Alert.alert(
                t('App.bluetoothPermission.alertTitle'),
                t('App.bluetoothPermission.alertMessage')
              );      
          }
        }


      } catch (err) {
          console.warn(LOGTAG + " Error" + err)
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}></SafeAreaView> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  }
});
  
export default PermissionsScreen;
