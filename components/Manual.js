import { StyleSheet, Text, View,TouchableOpacity, Linking, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { appConfig } from '../config';
import { ImageSlider } from "react-native-image-slider-banner";

const Manual = () => {

    const LOGTAG = "Manual";
    const navigation = useNavigation();

    const { t, i18n } = useTranslation();

    const [currentState, setCurrentState] = useState(1);

    const imageSliderWidth=420
    const imageSliderHeight=320

    console.log(LOGTAG + ":state=" + currentState);

    return (

        <ScrollView style={styles.scrollView}>
            <View
                style={[styles.imageSliderView, {
                                height: imageSliderHeight + 38,
                                width: imageSliderWidth,
                            }
                        ]    
                }
            >
                <ImageSlider
                    accessible={true}
                    accessibilityLabel={t('ManualScreen.imageSliderLabel')}
                    caroselImageContainerStyle={styles.imageSlider}
                    data={[
                        { img: require('../assets/images/m01.ac.jpg'), state: 1 },
                        { img: require('../assets/images/m02.ac.jpg'), state: 2 },
                        { img: require('../assets/images/m03.ac.jpg'), state: 3 },
                
                    ]}
                    localImg={true}

                    autoPlay={false}
                    showIndicator={true}
                    activeIndicatorStyle={{ color: 'white', backgroundColor: 'white'}}
                    indicatorContainerStyle={{backgroundColor: 'white', top: 38}}
                    showHeader={false}
                    preview={false}
                    
                    // closeIconColor={'black'}
                    // previewImageContainerStyle={{ backgroundColor: 'black'}}
                    caroselImageStyle={{ resizeMode: 'cover', width: imageSliderWidth -6, height: imageSliderHeight }}
                    width={imageSliderWidth}
                    height={imageSliderHeight}
                    onItemChanged={(item) => {
                        console.log(LOGTAG + ":new state=" + item.state);
                        setCurrentState(item.state)
                    }}
                >

                </ImageSlider>
            </View>

            <View
                style={styles.textView} 
            >
                <Text style={styles.descriptionText}>{t('ManualScreen.description.' + currentState)}</Text>

                <Text/>
                <Text/>
            </View>


            <View
                style={{flexDirection: 'row', justifyContent: 'left', alignItems: 'left'}} 
            >
            <Image
                source={require('../assets/images/FAME.png')}
                style={[styles.S1Icon, {
                    height: Number(t('ManualScreen.caa_h_icons')),
                    width: Number(t('ManualScreen.caa_h_icons')),
                }
                ]}
            />

            <Image
                source={require('../assets/images/BAGNO.png')}
                style={[styles.S2Icon, {
                    height: Number(t('ManualScreen.caa_h_icons')),
                    width: Number(t('ManualScreen.caa_h_icons')),
                }
                ]}
            />

                  
            </View>

            <View
            style={{flexDirection: 'row', justifyContent: 'left', alignItems: 'left'}}
            >

                <View>
                <TouchableOpacity
                    onPress={() => Linking.openURL('https://www.google.it/maps/search/Bistrot+Ristorante+Pizzeria/@43.72301,10.396543,4311m/data=!3m1!1e3?hl=it&entry=ttu')} 
                >
                    <Text style={styles.hungryText}>{t('Fame?')}</Text>

                </TouchableOpacity>
                </View>

                <View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('MapScreen')} 
                >
                    <Text style={styles.WCText}>{t('Bagno?')}</Text>

                </TouchableOpacity>
                </View>


            </View>


            
        </ScrollView>    

        
    );

}

const styles = StyleSheet.create({

    scrollView: {
        padding: 0,
        flex: 1
        // backgroundColor: 'yellow'

    },
    imageSliderView: {
        alignSelf: 'center',
        backgroundColor: appConfig.backgroundColor_2
    },
    imageSlider: {
        backgroundColor: '#808080'
    },
    textView: {
        marginTop: 30,
        paddingLeft: 30,
        paddingRight: 30,
        // backgroundColor: 'white',
    },
    descriptionText: {
        color: appConfig.fontColor_1,
        fontFamily: appConfig.fontFamily_1,
        fontSize: 35,
        paddingBottom: 15,
        // textAlign: 'justify',
    },

    hungryText: {
        color: appConfig.fontColor_1,
        fontFamily: appConfig.fontFamily_2_bold,
        fontSize: 45,
        textAlign: 'center',
        paddingTop: 0,
        paddingLeft: 40,
        paddingRight: 30,
        paddingBottom: 40,
        textAlign: 'justify',
    },

    WCText: {
        color: appConfig.fontColor_1,
        fontFamily: appConfig.fontFamily_2_bold,
        fontSize: 45,
        textAlign: 'center',
        paddingTop: 0,
        paddingBottom: 40,
        paddingLeft: 40,
        textAlign: 'justify',
    },

    S1Icon: { 
        marginLeft: 50,
        resizeMode: 'contain',
        paddingBottom: 25
    },


    S2Icon: { 
        marginLeft: 145,
        resizeMode: 'contain',
        paddingBottom: 25,
    },

});

export default Manual;
