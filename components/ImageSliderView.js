import { StyleSheet } from 'react-native'
import React from 'react';
import { ImageSlider } from "react-native-image-slider-banner";

const ImageSliderView = ({images, width, height}) => {

    const LOGTAG = "ImageSliderView";
  
    console.log(LOGTAG + " :images=" + JSON.stringify(images));

    return (
        <ImageSlider
            caroselImageContainerStyle={styles.container}
            data={images}
            autoPlay={false}
            showIndicator={true}
            // activeIndicatorStyle={{ color: 'red', backgroundColor: 'red'}}
            indicatorContainerStyle={{backgroundColor: 'white', top: 55}}
            showHeader={false}
            preview={false}
            // closeIconColor={'black'}
            // previewImageContainerStyle={{ backgroundColor: 'black'}}
            caroselImageStyle={{ resizeMode: 'cover', width: width, height: height }}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'pink',
    },
});

export default ImageSliderView;
  