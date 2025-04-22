import { StyleSheet, SafeAreaView, Text, View, ScrollView, Linking, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { appConfig } from '../config';
import { HeaderView, BackButton } from '../components/HeaderView';

const CreditsScreen = ({ navigation }) => {

  const LOGTAG = "CreditsScreen";

  const { t, i18n } = useTranslation();

  return (
    <SafeAreaView style={styles.safeAreaView}>

        <HeaderView
            left={<BackButton/>}
            title={t('CreditsScreen.header')}
        />

        <ScrollView style={styles.scrollView}>

            <Text style={styles.text}>The MVL (Musei Val Di Lima) app has a prototype nature with the aim of 
              demonstrating the effectiveness of the technologies and techniques adopted to offer visitors support 
              for the visit, but cannot be considered a consolidated commercial product.</Text>
              
            <Text style={styles.text}>
                <Text style={styles.text}>Design and development by the </Text>
                <Text style={styles.linkText}
                    onPress={() => Linking.openURL('https://www.isti.cnr.it/it/ricerca/laboratories/27/Wireless_Networks_WN')}
                    >Wireless Network Lab</Text>
                <Text style={styles.text}>, </Text>
                <Text style={styles.linkText}
                    onPress={() => Linking.openURL('https://www.isti.cnr.it/en/')}
                    >CNR-ISTI</Text>
                <Text> of Pisa together with the parish of Santa Maria Assunta in </Text>
                <Text style={styles.linkText}
                    onPress={() => Linking.openURL('http://www.museobenabbio.it/')}
                    >Benabbio</Text>
                <Text style={styles.text}> and the parish of San Cassiano in </Text>
                <Text style={styles.linkText}
                    onPress={() => Linking.openURL('https://museo.sancassianodicontrone.com/')}
                    >San Cassiano di Controne</Text>
            </Text>

            <Text style={styles.text}>
                <Text style={styles.text}>All multimedia contents are released under the </Text>
                <Text style={styles.linkText}
                    onPress={() => Linking.openURL('https://creativecommons.org/licenses/by-nc/4.0/')}
                    >CC BY-NC 4.0</Text>
                <Text style={styles.text}> license.</Text>
            </Text>


            <Text style={styles.text}>Icons and resources:</Text>

            <View style={styles.listItemView}>
                <Text 
                    style={styles.listItemMarker}
                    >
                    {'\u2022'} </Text>
                <Text style={styles.linkText}                    
                    onPress={() => Linking.openURL('https://www.flaticon.com/free-icons/update')}
                >Update icons created by kornkun - Flaticon</Text>
            </View>

            <View style={styles.listItemView}>
                <Text 
                    style={styles.listItemMarker}
                    >
                    {'\u2022'} </Text>
                <Text style={styles.linkText}                    
                    onPress={() => Linking.openURL('https://www.flaticon.com/free-icon/location_1483285')}
                >Location icon created by Freepik - Flaticon</Text>
            </View>

            <View style={styles.listItemView}>
                <Text 
                    style={styles.listItemMarker}
                    >
                    {'\u2022'} </Text>
                <Text style={styles.linkText}                    
                    onPress={() => Linking.openURL('https://www.flaticon.com/free-icons/marble')}
                >Marble icons created by Freepik - Flaticon</Text>
            </View>

            <View style={styles.listItemView}>
                <Text 
                  style={styles.listItemMarker}
                  >
                  {'\u2022'} </Text>
                <Text style={styles.linkText}
                    onPress={() => Linking.openURL('https://www.flaticon.com/free-icons/menu')}
                >Menu icons created by firzuals - Flaticon</Text>
            </View>

            <View style={styles.listItemView}>
                <Text 
                  style={styles.listItemMarker}
                  >
                  {'\u2022'} </Text>
                <Text style={styles.linkText}
                    onPress={() => Linking.openURL('http://www.bagnidilucca.info/wp-content/uploads/2020/10/bagni-di-lucca-san-cassiano-di-controne-panorama.jpg')}
                >Splash page: Vista di San Cassiano di Controne</Text>
            </View>

            <Text style={styles.text}>For the Benabbio museum, the texts are edited by Agnese Benedetti and the translation edited by Sara Fanelli.</Text>

            <Text style={styles.text}>Project coordinator: Paolo Barsocchi</Text>

            <Text style={styles.text}>Scientific coordinator: Michele Girolami</Text>

            <Text style={styles.text}>Development and test: Davide La Rosa, Paolo Baronti</Text>

            <View style={styles.logoView}>

                <TouchableOpacity 
                    style={styles.istiLogoTouchable}
                    onPress={() => Linking.openURL('https://www.isti.cnr.it/en/')}>
                    <Image 
                        style={styles.istiLogoImage} 
                        source={require('../assets/images/logo-cnr-isti-c.png')} />
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.wnlabLogoTouchable}
                    onPress={() => Linking.openURL('https://www.isti.cnr.it/it/ricerca/laboratories/27/Wireless_Networks_WN')}>
                    <Image 
                        style={styles.wnlabLogoImage} 
                        source={require('../assets/images/logo-wnlab.png')} />
                </TouchableOpacity>

            </View>

            <Text></Text>
            <Text></Text>



        </ScrollView>        
        <Text
          style={styles.appVersionText}>Version {appConfig.version}</Text>
    </SafeAreaView>
  );
}; 

const styles = StyleSheet.create({

  safeAreaView: {
      flex: 1,
      backgroundColor: appConfig.backgroundColor_1,
      paddingBottom: 0
  },  
  scrollView: {
      padding: 30
  },
  text: {
      fontFamily: appConfig.fontFamily_1,
      fontSize: 22,
      color: appConfig.fontColor_2,
      textAlign: 'justify'
  },
  listItemView: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical:5,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  listItemMarker: {
      fontFamily: appConfig.fontFamily_1,
      fontSize: 30,
      color: appConfig.fontColor_2,
      paddingRight: 5,
      alignSelf: 'flex-start'
  },
  linkText: {
      fontFamily: appConfig.fontFamily_1,
      fontSize: 22,
      color: 'blue',
      textAlign: 'justify',
  },
  logoView: {
      flexDirection: 'column',
      alignItems: 'center',
      paddingVertical: 20
  },
  istiLogoTouchable: {
    //   backgroundColor: 'pink',
      marginVertical: 5
  },
  istiLogoImage: {
      maxWidth: 300,
      resizeMode: 'contain'
  },
  wnlabLogoTouchable: {
    //   backgroundColor: 'pink',
      marginVertical: 5
  },
  wnlabLogoImage: {
    //   maxWidth: 200,
      maxHeight: 150,
      resizeMode: 'contain'
  },
  appVersionText: {
      backgroundColor: appConfig.backgroundColor_2,
      color: 'white',
      textAlign: 'center',
      fontSize: 20
  }

});

export default CreditsScreen;