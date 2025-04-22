import { StyleSheet, ScrollView, Text, View, Linking } from 'react-native'
import React from 'react';
import { appConfig } from '../config';


const PrivacyPolicy = () => {

    const LOGTAG = "PrivacyPolicy";

    return (

        <ScrollView style={styles.scrollView}>

            <Text style={styles.text}>
                <Text style={styles.text}>The MVL application (Musei Val di Lima) is the result of a collaboration between </Text>
                <Text style={styles.linkText}
                    onPress={() => Linking.openURL('https://www.isti.cnr.it/')}
                >ISTI-CNR</Text>
                <Text style={styles.text}> and:</Text>
            </Text>

            <View style={styles.listItemView}>
                <Text 
                    style={styles.listItemMarker}
                    >
                    {'\u2022'} </Text>
                <Text style={styles.text}>Parrocchia di Santa Maria Assunta in Benabbio (LU)</Text>
            </View>

            <View style={styles.listItemView}>
                <Text 
                    style={styles.listItemMarker}
                    >
                    {'\u2022'} </Text>
                <Text style={styles.text}>Parrocchia di San Cassiano di Controne (LU)</Text>
            </View>

            <Text style={styles.text}>
                The application has a prototypal nature, and it is developed in a research-oriented collaboration with the museums. The application cannot be considered a commercial product, rather it is a prototypal version. Some features might not properly work on specific smartphones/tablet.
            </Text>

            <Text style={styles.text}>
                The goal of the application is to provide to museum visitors a guide able to automatically detect the proximity between visitors and museum’s artworks by exploiting the Bluetooth technology. More specifically, the application scans for Bluetooth tags available in the environment, and it estimates the proximity with nearest artworks. In turn, the user can access to some details concerning the application, such as images, description etc.
            </Text>                   

            <Text style={styles.text}> 
                Multimedia contents such as artwork's description and artworks images are provided by Parrocchia di Santa Maria Assunta in Benabbio and Parrocchia di San Cassiano di Controne (LU) under Creative Commons Attribution-NonCommercial 4.0 International License and hosted in a GitHub repository.
            </Text>             

            <Text style={styles.sectionHeaderText}>
                Data Treatments
            </Text>

            <Text style={styles.text}> 
                The application implements one single data treatment.
            </Text>

            <View style={styles.listItemView}>
                <Text 
                    style={styles.listItemMarker}
                    >
                    {'\u2022'} </Text>
                <Text style={styles.text}>Scope: To implement a museum's guide designed to automatically detect the proximity between visitors and museum's artworks by exploiting the Bluetooth technology.</Text>
            </View>
        
            <View style={styles.listItemView}>
                <Text 
                    style={styles.listItemMarker}
                    >
                    {'\u2022'} </Text>
                <Text style={styles.text}>
                    <Text style={styles.text}>Data Analysed: The MVL application does not locally store or analyse 
                    any personal data. The MVL application downloads museums digital contents (such as images and 
                    descriptions) from a remote server hosted by GitHub. The remote server used for downloading 
                    the contents might log for security reasons and for a limited period, some personal 
                    information such as the IP address of the smartphone/tablet running the MVL application. 
                    The privacy policy of GitHub is available at </Text>
                    <Text style={styles.linkText}
                        onPress={() => Linking.openURL('https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement#what-information-github-collectsThird-party')}
                    >this link</Text>.
                </Text>
                    
            </View>

            <Text style={styles.sectionHeaderText}>
                Software Components
            </Text>

            <Text style={styles.text}> 
                The MVL application is developed with the React Native Framework. The application includes 
                the following third-party libraries:
            </Text>

            <View style={styles.listItemView}>
                <Text 
                    style={styles.listItemMarker}
                    >
                    {'\u2022'} </Text>
                <Text style={styles.text}>react-native-localize
                </Text>
            </View>

            <View style={styles.listItemView}>
                <Text 
                    style={styles.listItemMarker}
                    >
                    {'\u2022'} </Text>
                <Text style={styles.text}>react-i18next
                </Text>
            </View>

            <View style={styles.listItemView}>
                <Text 
                    style={styles.listItemMarker}
                    >
                    {'\u2022'} </Text>
                <Text style={styles.text}>i18next
                </Text>
            </View>

            <View style={styles.listItemView}>
                <Text 
                    style={styles.listItemMarker}
                    >
                    {'\u2022'} </Text>
                <Text style={styles.text}>react-native-fs
                </Text>
            </View>

            <View style={styles.listItemView}>
                <Text 
                    style={styles.listItemMarker}
                    >
                    {'\u2022'} </Text>
                <Text style={styles.text}>react-native-device-info
                </Text>
            </View>

            <View style={styles.listItemView}>
                <Text 
                    style={styles.listItemMarker}
                    >
                    {'\u2022'} </Text>
                <Text style={styles.text}>react-native-bluetooth-state-manager

                </Text>
            </View>

            <View style={styles.listItemView}>
                <Text 
                    style={styles.listItemMarker}
                    >
                    {'\u2022'} </Text>
                <Text style={styles.text}>react-native-zip-archive
                </Text>
            </View>

            <View style={styles.listItemView}>
                <Text 
                    style={styles.listItemMarker}
                    >
                    {'\u2022'} </Text>
                <Text style={styles.text}>@react-native-community/netinfo
                </Text>
            </View>

            <View style={styles.listItemView}>
                <Text 
                    style={styles.listItemMarker}
                    >
                    {'\u2022'} </Text>
                <Text style={styles.text}>react-native-kontaktio
                </Text>
            </View>

            <View style={styles.listItemView}>
                <Text 
                    style={styles.listItemMarker}
                    >
                    {'\u2022'} </Text>
                <Text style={styles.text}>react-native-image-slider-banner
                </Text>
            </View>

            <View style={styles.listItemView}>
                <Text 
                    style={styles.listItemMarker}
                    >
                    {'\u2022'} </Text>
                <Text style={styles.text}>@react-native-async-storage/async-storage
                </Text>
            </View>

            <Text style={styles.sectionHeaderText}>
                Retention of Your Personal Data
            </Text>

            <Text style={styles.text}> 
                The MVL app does not locally store any personal data.
                The server used for downloading the contents might store the previously mentioned data for 
                a limited amount of time. We refer to the GitHub privacy policy for details about the data 
                retention.
            </Text>

            <Text style={styles.sectionHeaderText}>
                Transfer of Your Personal Data
            </Text>

            <Text style={styles.text}> 
                The MVL application interacts with a remote server hosted by GitHub to download the digital contents.                
            </Text>

            <Text style={styles.sectionHeaderText}>
                Rights of the Individual
            </Text>

            <Text style={styles.text}> 
                The application does not manage any personal data. For inquiries about the remote server, please refer to the GitHub privacy policy.
            </Text>

            <Text style={styles.sectionHeaderText}>
                Links to Other Websites
            </Text>

            <Text style={styles.text}> 
                The MVL application may contain links to other websites that are not operated by us and for whom we are not responsible.  If you click on a third-party links, you will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.
            </Text>

            <Text style={styles.sectionHeaderText}>
                Contact Us
            </Text>

            <Text style={styles.text}> 
                Contact information.
            </Text>

            <View style={styles.listItemView}>
                <Text 
                    style={styles.listItemMarker}
                    >
                    {'\u2022'} </Text>
                <Text style={styles.text}>ISTI-CNR: the Data Controller for the exercise of the rights of the interested party 
                    for the treatments within the CNR-ISTI Institute is the Institute Director who can be reached at the 
                    following address: via G. Muruzzi, 1 56124 Pisa, e-mail: director@isti.cnr.it
                </Text>
            </View>

            <View style={styles.listItemView}>
                <Text 
                    style={styles.listItemMarker}
                    >
                    {'\u2022'} </Text>
                <Text style={styles.text}>Parrocchia Santa Maria Assunta in Benabbio
                </Text>
            </View>

            <View style={styles.listItemView}>
                <Text 
                    style={styles.listItemMarker}
                    >
                    {'\u2022'} </Text>
                <Text style={styles.text}>Parrocchia San Cassiano di Controne
                </Text>
            </View>

            <View style={styles.listItemView}>
                <Text 
                    style={styles.listItemMarker}
                    >
                    {'\u2022'} </Text>
                <Text style={styles.text}>Individuals can send an email to: loc@isti.cnr.it for any information
                </Text>
            </View>

            <Text></Text>
            <Text></Text>

        </ScrollView>          

    );
}

const styles = StyleSheet.create({

    scrollView: {
        padding: 30
    },
    sectionHeaderText:{
        fontFamily: appConfig.fontFamily_1,
        marginTop: 30,
        fontSize: 26,
        fontWeight: 'bold',
        color: appConfig.fontColor_2,
        textAlign: 'justify'
    },
    text: {
        fontFamily: appConfig.fontFamily_1,
        fontSize: 22,
        color: appConfig.fontColor_1,
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
    }
    
});
    
export default PrivacyPolicy;
  