#!/bin/bash

# Patch react-native-kontaktio module
sed -i '38s/this.deviceUpdateCallbackInterval = 3000;/this.deviceUpdateCallbackInterval = 1000;/' ./node_modules/react-native-kontaktio/android/src/main/java/com/artirigo/kontaktio/Configuration.java

# Patch react-native-image-slider-banner module
sed -i '194s/snapToInterval={width}/snapToInterval={caroselImageStyle.width || width}/' ./node_modules/react-native-image-slider-banner/src/index.tsx

