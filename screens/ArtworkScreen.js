import {TouchableOpacity, StyleSheet, Text, SafeAreaView, View, ScrollView, Dimensions, Modal } from 'react-native'
import { useTranslation } from 'react-i18next';
import EndOfScreenView from '../components/EndOfScreenView';
import { appConfig } from '../config';
import ImageSliderView from '../components/ImageSliderView';
import { HeaderView, BackButton, NativeSpeech, BackButton_b } from '../components/HeaderView';
import React, {useState} from 'react';


const ArtworkScreen = ({ route, navigation }) => {

    const LOGTAG = "ArtworkScreen";

    const { documentsFolder, museumData, index } = route.params;
  
    const { t, i18n } = useTranslation();
  
    const { width, height } = Dimensions.get('window');
    const font_d = Number(t('dimensions_t', {ns: museumData.id}))

    const dis = String(t('opacity', {ns: museumData.id}))

    const [languageSelectionModalVisible, setLanguageSelectionModalVisible] = useState(false);
    
    const MAX_IMAGE_SLIDER_WIDTH = 600;
    const imageSliderWidth = Math.min(width, MAX_IMAGE_SLIDER_WIDTH);
    const imageSliderHeight = imageSliderWidth / Number(t('dimensions', {ns: museumData.id}));
    console.log(LOGTAG + ": slider size=" + JSON.stringify({ imageSliderWidth, imageSliderHeight }));


    const interoCasualeTraDueESette = () => {
        return Math.floor(Math.random() * (7 - 2 + 1)) + 2;
      };
      
      // Utilizza la funzione per ottenere un numero casuale
      const risultato = interoCasualeTraDueESette();


    const LanguageSelectionView = () => {


        return (
            <View style={styles.container_C}>
                <TouchableOpacity
                onPress={() => {setLanguageSelectionModalVisible(false);}}>
                
                <View style={styles.headerView_C}>
                    <Text 
                        style={styles.headerText_C}
                        adjustsFontSizeToFit={true}
                    >{t('artworks.' + index + '.description.' + risultato, {ns: museumData.id})}</Text>
                </View>
                </TouchableOpacity>
            </View>
    
        );
    }

    const renderLanguageSelectionModal = () => {

        return (
          <Modal
            animationType='fade'
            transparent={true}
            visible={languageSelectionModalVisible}
            >
              <LanguageSelectionView/>
          </Modal>
      
        );
      }

    // const artwork = museumData.artworks[index];
    // console.log(LOGTAG + ":artwork=" + JSON.stringify(artwork));

    console.log(LOGTAG + ":index=" + index);

    return (
        <SafeAreaView style={styles.container}>

            <HeaderView
                left={<BackButton_b/>}
                color={appConfig.backgroundColor_3}
                titlecolor= {appConfig.fontColor_1}
                bar={false}
                title={t('artworks.' + index + '.title', {ns: museumData.id}) }
                right3={NativeSpeech(t('artworks.' + index + '.description.1', {ns: museumData.id}))}
                lines={2}
            />

            <ScrollView style={styles.scrollView}>

                <View 
                    accessible={true}
                    accessibilityLabel={t('ArtworkScreen.imageSliderLabel')}
                    style={[styles.imageSliderView, {
                                height: imageSliderHeight,
                                width: imageSliderWidth,
                            }
                        ]    
                    }
                >
                    <ImageSliderView 
                        images={
                            t('artworks.' + index + '.gallery', {ns: museumData.id}).split(" ").
                                map(url => { 
                                    return ({
                                        'img' : "file://" + documentsFolder + "/" + museumData.id + "/" + url 
                                            + '?' + new Date()
                                    })
                                } 
                            )                     
                        }
                        width={imageSliderWidth}
                        height={imageSliderHeight}
    

                    />
                </View>

                <View style={styles.dataView}>
        
                </View>

                <View style={styles.separator}></View>

                <View style={styles.descriptionView}>
                    <Text style={{color: appConfig.fontColor_1, fontSize: font_d, fontFamily: appConfig.fontFamily_1, textAlign: 'justify', }}>{t('artworks.' + index + '.description.1', {ns: museumData.id})}</Text>
                </View>

                <View style={{alignItems: 'center', paddingBottom: 40, display: dis}}>
                    
            <TouchableOpacity
              style={styles.touchableOpacity} 
              onPress={() => {setLanguageSelectionModalVisible(true);}}
            >
              <Text style={styles.touchableOpacityText}>Scopri una curiosità!</Text>
            </TouchableOpacity>

            {renderLanguageSelectionModal()}
        </View>

            </ScrollView>

            <EndOfScreenView/>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appConfig.fontColor_2
    },  
    scrollView: {
        paddingTop: 25,
        flex: 1,
    },
    imageSliderView: {
        alignSelf: 'center',
    },
    dataView: {
        padding: 10,
    },
    separator: {
        height: 2,
        alignSelf: 'center',
        width: '80%',
        backgroundColor: appConfig.fontColor_1,
        marginTop: 55
    },
    descriptionView: {
        padding: 25
    },

      touchableOpacity: {
        borderRadius: 20,
        backgroundColor: appConfig.backgroundColor_2
      },
      touchableOpacityText: {
        fontSize: 25,
        color: appConfig.fontColor_2,
        fontFamily: appConfig.fontFamily_1,
        paddingVertical: 20,
        paddingHorizontal: 30,
        alignSelf: 'center'
      },


      container_C: {
        width: '90%',
        flex: 0,
        flexDirection: 'column', 
        alignSelf: 'center',
        marginTop: 150,
        backgroundColor: appConfig.backgroundColor_2,
        borderWidth: 5,
        borderColor: appConfig.fontColor_2,
        paddingVertical: 10
    },
    headerView_C: {
        padding: 30
    },
    headerText_C: {
        fontFamily: appConfig.fontFamily_1,
        fontSize: 35,
        color: appConfig.fontColor_2
    },
    languageOptionView_C: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    languageOptionText_C: {
        fontFamily: appConfig.fontFamily_1,
        color: appConfig.fontColor_2,
        
    }

});

export default ArtworkScreen
