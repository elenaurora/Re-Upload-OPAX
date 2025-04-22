import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { appConfig } from '../config';


const ArtworkTile = ({museumData, index, documentsFolder, tileHeight, tileWidth}) => {

  const LOGTAG = "ArtworkTile";

  console.log(LOGTAG + ":artwork=" + JSON.stringify(museumData.artworks[index]) + ", tileHeight=" + tileHeight);

  const { t, i18n } = useTranslation();
  const navigation = useNavigation();

  const MAX_IMAGE_HEIGHT = 500;
  const MAX_IMAGE_WIDTH = 600;

  const imageHeight = Math.min(MAX_IMAGE_HEIGHT, tileHeight);
  const imageWidth = Math.min(MAX_IMAGE_WIDTH, tileWidth * 0.8, imageHeight * 1.2);
  console.log(LOGTAG + ":imageSize=" + imageWidth + 'x' + imageHeight);

  return (
    <View style={[styles.container, { width: imageWidth, height: imageHeight }]}>

      <TouchableOpacity 
        style={styles.artworkTouchable}
        onPress={() => navigation.navigate('ArtworkScreen', 
          { museumData: museumData, index: index, documentsFolder: documentsFolder })}>
        <View
          style={styles.artworkView}
        >
          <ImageBackground 
            style={[styles.artworkImage, { height: imageHeight, width: imageWidth}]}
            imageStyle={{
              resizeMode: 'cover'
            }}
            source={{ uri: "file://" + documentsFolder + "/" + museumData.id + "/" + museumData.artworks[index].cover 
              + '?' + new Date()
            }}
          >
            <View style={styles.artworkDescriptionView}>
              <Text 
                style={styles.artworkText}
                adjustsFontSizeToFit={true}
                numberOfLines={2}
              >{t('artworks.' + index + '.shortTitle', {ns: museumData.id})}</Text>
            </View>

          </ImageBackground>

        </View>
      </TouchableOpacity>
    </View>      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    // backgroundColor: 'yellow'
  },
  artworkTouchable: {
    paddingVertical: 5
  },
  artworkView: { 
    flex: 1, 
    borderRadius: 30,
    flexDirection: 'column', 
    borderWidth: 2, 
    borderColor: appConfig.backgroundColor_3,
    overflow: 'hidden',
    marginTop: 20,
  },
  artworkImage: {
    // backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'flex-end',
    
  },
  artworkDescriptionView: { 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white', 
    width: '100%',
    borderRadius: 12,
    margin: 10,
    // maxHeight: 50,
    height: 75,
    opacity: 0.8,
  },
  artworkText: {
    color: appConfig.fontColor_1,
    fontFamily: appConfig.fontFamily_1,
    fontSize: 30,
    paddingHorizontal: 1,
    marginBottom: 15,
  }
});

export default ArtworkTile;