import React from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Text, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { appConfig } from '../config';

const NotificationView = ({ image, messageKey, buttonKey, buttonCallback }) => {

  const LOGTAG = "NotificationView";

  const { t, i18n } = useTranslation();

  console.log(LOGTAG + ":messageKey=" + messageKey + ", " + t(messageKey));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.notificationView}>
        <View style={styles.notificationImageTextView}>
          <Image
            style={styles.notificationImage} 
            source={image}
          />
          <Text style={styles.notificationText}>{t(messageKey)}</Text>
        </View>
      </View>

      <View style={styles.buttonsView}>
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={buttonCallback}
        >
          <Text style={styles.touchableOpacityText}>{t(buttonKey)}</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appConfig.backgroundColor_1
  },
  notificationView: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  notificationImageTextView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
  },
  notificationImage: {
    width: 200,
    height: 200,
  },
  notificationText: {
    fontFamily: appConfig.fontFamily_1,
    color: appConfig.fontColor_1,
    fontSize: 28,
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  buttonsView: {
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 20,
    alignItems: 'center'
  },
  touchableOpacity: {
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

export default NotificationView;



