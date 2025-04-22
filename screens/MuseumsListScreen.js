import { StyleSheet, View, Text, TouchableOpacity, Image, ImageBackground, ActivityIndicator, SafeAreaView, Animated, Easing, Modal, HeaderBackButton } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { checkMuseumsFile, DataFetchError, fetchMuseumsFile, deleteMuseumsFile } from '../logic/DataFetchSupport';
import MuseumListView from '../components/MuseumListView';
import { useTranslation } from 'react-i18next';
import RNFS from 'react-native-fs';
import NotificationView from '../components/NotificationView';
import EndOfScreenView from '../components/EndOfScreenView';
import { appConfig } from '../config';
import Menu from '../components/Menu';
import { HeaderView, VIS_Button, Logo_app, NativeSpeech, TiredButton } from '../components/HeaderView';


const MuseumsListScreen = ({ navigation }) => {

  const LOGTAG = "MuseumsListScreen";

  const [documentsFolder, setDocumentsFolder] = useState('');
  const [museumsFileExists, setMuseumsFileExists] = useState(undefined);
  const [museums, setMuseums] = useState(undefined);
  const [retryWarning, setRetryWarning] = useState(undefined);

  const { t, i18n } = useTranslation();

  const currentSpinValue = useRef(new Animated.Value(0)).current;

  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState(30);
  const [headerPosition, setHeaderPosition] = useState(0);
    
  const [languageSelectionModalVisible, setLanguageSelectionModalVisible] = useState(false);
  const [CAASelectionModalVisible, setCAASelectionModalVisible] = useState(false);

  useEffect(() => {

    console.log(LOGTAG + ":useEffect documentsFolder: " + documentsFolder);
    console.log(LOGTAG + ":useEffect museumsFileExists: " + museumsFileExists);
    console.log(LOGTAG + ":useEffect museums: " + JSON.stringify(museums));
    console.log(LOGTAG + ":useEffect retryWarning: " + JSON.stringify(retryWarning));

    if(documentsFolder === '') { // Document folder not set yet

      // Set document folder
      console.log(LOGTAG + ":useEffect Setting documents folder");
      setDocumentsFolder(RNFS.DocumentDirectoryPath);
      
    }
    else if(museumsFileExists === undefined) { // Museums file existence is unknown

      // Check if museums file exists
      console.log(LOGTAG + ":useEffect Checking museums file");
      setMuseumsFileExists('unknown');
      checkMuseumsFile(documentsFolder).
        then(found => { 

            // Set museums file existence status
            console.log(LOGTAG + ":useEffect Setting museumsFileExists to " + museumsFileExists);
            setMuseumsFileExists(found);

            if(found) { // Museums file exists

              // Start animation to suggest updating museums file
              Animated.loop(
                  Animated.timing(currentSpinValue, {
                    toValue: 1,
                    duration: 2000,
                    easing: Easing.linear,
                    useNativeDriver: true
                  }),
                  { iterations: 2 }
              ).start();
            }
        }).
        catch(err => {
          setRetryWarning('MuseumsListScreen.downloadErrorMessage')
        });
    }
    else if(museumsFileExists === 'unknown') { // Museums file existence is being checked

      // Do nothing
      console.log(LOGTAG + ":useEffect Museums file existence is not known yet, skip");
      return;
    }
    else if(museums === undefined) { // Museums are not currently known

      // Fetch museums file
      console.log(LOGTAG + ":useEffect Fetching museums file");
      setMuseums([]);
      fetchMuseumsFile(documentsFolder).
        then(mus => setMuseums(mus)).
        catch (err => {
          console.log(LOGTAG + ":useEffect Error " + err.message);
          if(err.type === DataFetchError.TYPE_CONNECTION_ERROR) {
            setRetryWarning('MuseumsListScreen.networkConnectionMessage');
          }
          else if(err.type === DataFetchError.TYPE_DOWNLOAD_ERROR ||
            err.type === DataFetchError.TYPE_PARSE_ERROR || 
            err.type === DataFetchError.TYPE_GENERIC_ERROR) {
            setRetryWarning('MuseumsListScreen.downloadErrorMessage');
          }
        });
    }
    else if(museums.length == 0) { // Museums file is being fetched

      // Do nothing
      console.log(LOGTAG + ":useEffect Museums file is being fetched, skip");
      return;
    }
    else {

      // All information is known - nothing to do
      console.log(LOGTAG + ":useEffect Available museums: " + JSON.stringify(museums));
    }
  });

  // Update museums file
  const updateMuseumsFile = () => {

    console.log(LOGTAG + ":updatedMuseumsFile");

    // Delete museums file
    deleteMuseumsFile(documentsFolder).
      then(() => {
        // Reset museum data in order to force museums file download
        setMuseumsFileExists(false);
        setMuseums(undefined);
      });
  }

  if(retryWarning !== undefined) { // A problem with the network prevents data download

    // Show notification message
    return (
      <NotificationView 
        image={require('../assets/images/nowifi_icon.png')} 
        messageKey={retryWarning} 
        buttonKey='MuseumsListScreen.retryButton'
        buttonCallback={() => {
            // When retry button is clicked reset all museum data
            setMuseumsFileExists(undefined);
            setMuseums(undefined);
            setRetryWarning(undefined);
          }
        }
      />
    )
  }

  const renderMenuIcon = () => {

    if((museums === undefined) || (museums.length == 0)) {
      return null;
    }
    
    return (
      <View 
        onLayout={ (event) => {
          const layout = event.nativeEvent.layout;
          const newMenuPosition = layout.y + layout.height;
          console.log(LOGTAG + " menuPosition: " + newMenuPosition);
          setMenuPosition(newMenuPosition);
        }}
      >
        <TouchableOpacity 
          accessible={true}
          accessibilityLabel={t('MuseumsListScreen.menuButtonLabel')}
          onPress={() => {
            console.log(LOGTAG + ": Menu icon pressed");
            setMenuVisible(!menuVisible);
          }}
        >
          <Image
              source={require('../assets/images/menu_icon.png')}  
              style={styles.menuIcon}
          />
  
        </TouchableOpacity>
      </View>
  
    );

  }

  const renderMenu = () => {

    const commands = [
      {
        name: t('MuseumsListScreen.menuItemCredits'),
        callback: () => {
          console.log(LOGTAG + " Credits menu item clicked");
          setMenuVisible(!menuVisible);
          navigation.navigate('CreditsScreen');
        }
      },
      {
        name: t('MuseumsListScreen.menuItemPrivacy'),
        callback: () => {
          console.log(LOGTAG + " Privacy policy menu item clicked");
          setMenuVisible(!menuVisible);
          navigation.navigate('PrivacyPolicyScreen');
        }
      },
      {
        name: t('MuseumsListScreen.menuItemLanguage'),
        callback: () => {
          console.log(LOGTAG + " Language menu item clicked");
          setMenuVisible(!menuVisible);
          navigation.navigate('VisualizationChoice');
        }
      },


      {
        name: t('MuseumsListScreen.menuItemManual'),
        callback: () => {
          console.log(LOGTAG + " Manual menu item clicked");
          setMenuVisible(!menuVisible);
          navigation.navigate('ManualScreen');
        }
      },

      {
        name: t('MuseumsListScreen.menuItemUpdate'),
        callback: () => {
          console.log(LOGTAG + " Update menu item clicked");
          setMenuVisible(!menuVisible);
          updateMuseumsFile();
        }
      }
    ];


    console.log(LOGTAG + " menu position: " + (headerPosition + menuPosition));
    return (
      <Menu
        commands={commands}
        position = {{
          top: (headerPosition + menuPosition),
          right: 0 
        }}
      />
    );
  }

  
  

  const renderMuseumsListView = () => {

    if((museums === undefined) || 
       (museums.length === 0)) {
      return (
        <View 
          style={styles.museumsView}
          accessible={true}
          accessibilityLabel={t('MuseumsListScreen.loadingViewLabel')}
        >
          <View style={styles.activityIndicatorView}>

            <Text style={styles.loadingText}>Loading...</Text>
            <ActivityIndicator 
              size="large" 
              color={appConfig.fontColor_1}
              style={styles.spinner}
            />

          </View>
        </View>
      );
    }
    else {
      return (
        <View 
          style={styles.museumsView}
          accessible={true}
          accessibilityLabel={t('MuseumsListScreen.museumsViewLabel')}
        >
          <MuseumListView 
              museums={museums} 
              documentsFolder={documentsFolder}
              selectCallback={() => {
                  setMenuVisible(false);
                }
              }
          />
        </View>
      );
    }
  }

  return (
    <SafeAreaView style={styles.container}>

<HeaderView
            left={<Logo_app/>}
            color={appConfig.backgroundColor_3}
            right={<VIS_Button/>}
            right2={<TiredButton/>}
            right3={NativeSpeech("Introduzione, Visito la Piazza")}
          />


      <View style={styles.imageView}>
        <ImageBackground 
              source={require('../assets/images/opt3.jpg')}  
              imageStyle={{ opacity: 1.0}} 
              resizeMode='cover'
              style={styles.imageBackground}
        />
      </View>

      
      
      {renderMuseumsListView()}

      <EndOfScreenView/>

      <View style={styles.bottomView}>
        { museumsFileExists === true &&
        <TouchableOpacity
          style={styles.reloadTouchable}
          onPress={updateMuseumsFile}
        >
          
          <Animated.Image 
            source={require('../assets/images/reload_icon.png')} 
            style={[ {transform: [
              {
                rotate: currentSpinValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg']
                })
              }
            ]}, styles.reloadImage]} />
        </TouchableOpacity>
        } 
      </View>

    </SafeAreaView>
  );
}; 





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appConfig.backgroundColor_2
  },

  imageView: { /** grandezza foto*/
    flex: 0.58,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    borderBottomWidth: 10,
    borderRadius: 0,
    borderColor: appConfig.fontColor_2
  },
  museumsView: { /** area pulsanti*/
    flex: 0.9, 
  },
  activityIndicatorView: {
    alignItems: 'center',
    paddingTop: 30,
  },
  loadingText: {
    fontSize: 50,
    padding: 20,
    textAlign: 'justify',
    fontFamily: appConfig.fontFamily_1,
    color: appConfig.fontColor_2
  },
  spinner: {
    padding: 40,
  },
  bottomView: {
    flexDirection: 'row',
    maxHeight: 40,
    paddingHorizontal: 40,
    paddingBottom: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  reloadTouchable: {
    width: 40,
    height: 40,
    borderRadius: 40
  },
  reloadImage: {
    width: 30,
    height: 30,
  }

});

export default MuseumsListScreen;

