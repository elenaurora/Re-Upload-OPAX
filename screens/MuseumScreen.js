import { TouchableOpacity, StyleSheet, Text, SafeAreaView, View, ScrollView, Dimensions, BackHandler, Image, HeaderBackButton } from 'react-native';
import React, { useEffect, useState } from 'react';
import { DataFetchError, fetchMuseumData } from '../logic/DataFetchSupport';
import { useTranslation } from 'react-i18next';
import LoadingView from '../components/LoadingView';
import NotificationView from '../components/NotificationView';
import EndOfScreenView from '../components/EndOfScreenView';
import ImageSliderView from '../components/ImageSliderView';
import { appConfig } from '../config';
import { HeaderView, VIS_Button, TiredButton, BackButton_b, NativeSpeech } from '../components/HeaderView';



const MuseumScreen = ({ route, navigation }) => {

  const LOGTAG = "MuseumScreen";

  const { museum, documentsFolder } = route.params;

  const { t, i18n } = useTranslation();

  const [museumData, setMuseumData] = useState({});
  const [retryWarning, setRetryWarning] = useState(undefined);

  const [loadedPercentage, setLoadedPercentage] = useState(undefined);

  const { width, height } = Dimensions.get('window');

  const font_d = Number(t('dimensions_t', {ns: museumData.id}));

  const MAX_IMAGE_SLIDER_WIDTH = 600;
  const imageSliderWidth = Math.min(width, MAX_IMAGE_SLIDER_WIDTH);
  const imageSliderHeight = imageSliderWidth / Number(t('dimensions', {ns: museumData.id}));
  console.log(LOGTAG + ": slider size=" + JSON.stringify({ imageSliderWidth, imageSliderHeight }));

  useEffect(() => {

      console.log(LOGTAG + " adding BackHandler");
      const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          () => {

              // console.log(LOGTAG + ' BackHandler: retryWarning=' + JSON.stringify(retryWarning) + 
              //   ', museumData=' + JSON.stringify(museumData));

              // Allow back button during error notification or after successful museum data download
              if((retryWarning !== undefined) || (museumData.id !== undefined)) {
                return false;
              }

              // Ignore back button during download atttempt
              console.log(LOGTAG + " blocked back button during download");
              return true;
          }
      );
    
      return () => {
        console.log(LOGTAG + " removing BackHandler");
        backHandler.remove();
      }
    },
    [retryWarning, museumData]
  );

  useEffect(() => {

    console.log(LOGTAG + " useEffect: loadedPercentage=" + loadedPercentage);
    console.log(LOGTAG + " useEffect: retryWarning=" + retryWarning);
    console.log(LOGTAG + " useEffect: museumData=" + JSON.stringify(museumData));

    if((loadedPercentage === undefined) && (museumData.id === undefined)) {

      console.log(LOGTAG + " useEffect: fetching museum data");
      setLoadedPercentage(0);
      fetchMuseumData(documentsFolder, museum, 
          (fraction) => {
              console.log(LOGTAG + " useEffect: downloaded " + fraction);
              setLoadedPercentage(Math.round(fraction * 100));
        }).
        then(md => {

          // Update translations
          i18n.addResourceBundle('en', museum.id, md.en);
          i18n.addResourceBundle('caa', museum.id, md.caa);
          i18n.addResourceBundle('it', museum.id, md.it);
          

          // Set museum data 
          console.log(LOGTAG + " useEffect: Setting museumData");
          setMuseumData(md.en);
          setLoadedPercentage(undefined);
        }).
        catch (err => {

          // Error occurred during download
          console.log(LOGTAG + " useEffect: Error " + err.message);

          // Show error notification with retry button
          if(err.type === DataFetchError.TYPE_CONNECTION_ERROR) {
            setRetryWarning('MuseumScreen.networkConnectionMessage');
          }
          else if(err.type === DataFetchError.TYPE_DOWNLOAD_ERROR ||
            err.type === DataFetchError.TYPE_PARSE_ERROR || 
            err.type === DataFetchError.TYPE_GENERIC_ERROR) {
            setRetryWarning('MuseumScreen.downloadErrorMessage');              
          }
          else { 
            setRetryWarning('MuseumScreen.downloadErrorMessage');              
          }
        });
    }
  });

  if(retryWarning !== undefined) { // Error downloading museum data

    // Show notification with retry button
    return (
      <NotificationView 
        image={require('../assets/images/nowifi_icon.png')} 
        messageKey={retryWarning} 
        buttonKey='MuseumScreen.retryButton'
        buttonCallback={() => {
            setRetryWarning(undefined);
            setLoadedPercentage(undefined);
          }
        }
      />
    )
  }

  let museumView = null;  

  if(museumData.id !== undefined) { // Museum data was downloaded
    //console.log(LOGTAG + " museumData=" + JSON.stringify(museumData));

    
    museumView = (
      <SafeAreaView style={styles.container}>

        <HeaderView 
          left={<BackButton_b/>}
          bar={false}
          right={<VIS_Button/>}
          right2={<TiredButton/>}
          right3={NativeSpeech(t('description', {ns: museumData.id}))}
          lines={2}

          />

        <ScrollView style={styles.museumScrollView}>
          
          <View 
              accessible={true}
              accessibilityLabel={t('MuseumScreen.imageSliderLabel')}
              style={[styles.imageSliderView, {
                          height: imageSliderHeight,
                          width: imageSliderWidth,
                      }
                  ]    
              }
          >
            

            <ImageSliderView 
                images={ 
                  t('gallery', {ns: museumData.id}).split(" ").
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

          <View style={styles.museumDescriptionView}>
            <Text style={{color: appConfig.fontColor_1, fontSize: font_d, fontFamily: appConfig.fontFamily_1, textAlign: 'justify', }}> {t('description', {ns: museumData.id})}</Text>
          </View>

        </ScrollView>

        <EndOfScreenView/>

        <View style={styles.touchableOpacityView}>
            <TouchableOpacity
              style={styles.touchableOpacity} 
              onPress={() => navigation.navigate('ArtworksScreen', { documentsFolder: documentsFolder, museumData: museumData })} 
            >
              <Text style={styles.touchableOpacityText}>{t('MuseumScreen.enterButton')}</Text>
            </TouchableOpacity>
        </View>

      </SafeAreaView>
    )
  }
  else { // Downloading museum data
    museumView = (
      <SafeAreaView style={{flex: 1}}>
        <LoadingView
          loadedPercentage={loadedPercentage}/>
      </SafeAreaView>      

    );
  }

  return museumView;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appConfig.backgroundColor_3
  },
  museumScrollView : {
    flex: 1,
  },
  imageSliderView: {
    paddingTop: 0,
    alignSelf: 'center',
  },
  museumDescriptionView: {
    padding: 20, 
    marginTop: 60 
  },

  touchableOpacityView: {
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 20,
    
  },
  touchableOpacity: {
    borderRadius: 20,
    backgroundColor: appConfig.backgroundColor_2
  },
  touchableOpacityText: {
    fontSize: 45,
    color: appConfig.fontColor_2,
    fontFamily: appConfig.fontFamily_1,
    paddingVertical: 10,
    paddingHorizontal: 50,
    alignSelf: 'center'
  }
});  

export default MuseumScreen;
