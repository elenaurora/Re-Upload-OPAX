import { Alert } from 'react-native';
import React from 'react';

const AsyncAlert = async (title, message) => new Promise((resolve) => {
    Alert.alert(
      title,
      message,
      [
        {
          text: 'ok',
          onPress: () => {
            resolve('YES');
          },
        },
      ],
      { 
        cancelable: false 
      },
    );
  } 
);

export {
    AsyncAlert
}
  