import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native'
import React from 'react';
import { appConfig } from '../config';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { red } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

const LanguageSelectionView = ({languageOptions, selectCallback}) => {

    const navigation = useNavigation();

    const LOGTAG = "LanguageSelectionView";

    const { t, i18n } = useTranslation();


    const renderLanguageOptions = () => {

        const languageOptionViews = [];

        for(let i = 0; i < languageOptions.length; i++) {

            const languageOption = languageOptions[i];
            console.log(LOGTAG + " adding language " + languageOption.label);
            const languageOptionView = (

                <TouchableOpacity 
                    style={styles.languageOptionTouchable}
                    key={languageOption.code}
                    onPress={() => {
                        console.log(LOGTAG + " selected " + languageOption.label);
                        selectCallback(languageOption.code);
                        navigation.navigate('MuseumsListScreen');
                    }}
                >
                    <View style={styles.languageOptionView}>
                        <Image 
                            style={styles.languageOptionImage}
                            source={languageOption.flag}  
                        />
                        <Text 
                            style={styles.languageOptionText}
                        >  {languageOption.label}</Text>
                    </View>
                </TouchableOpacity>
                

            );
            languageOptionViews.push(languageOptionView);
        }

        return languageOptionViews;
    }

    return (
        <View style={styles.container}>
            
            <View style={styles.headerView}>
                <Text 
                    style={styles.headerText}
                    adjustsFontSizeToFit={true}
                    numberOfLines={2}
                >{t('MuseumsListScreen.languageSelectionMessage')}</Text>
            </View>

            <ScrollView>

                {renderLanguageOptions()}

            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        maxWidth: 600,
        maxHeight: 900,
        flex: 0,
        flexDirection: 'column', 
        alignSelf: 'center',
        marginTop: 80,
        backgroundColor: appConfig.backgroundColor_3,
        
    },
    headerView: {
        paddingBottom: 50,
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'center',
    },
    headerText: {
        fontFamily: appConfig.fontFamily_1,
        fontSize: 45,
        color: appConfig.fontColor_1
    },
    languageOptionView: {
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    languageOptionTouchable: {
        paddingVertical: 10,
        //backgroundColor: 'red'

    },
    languageOptionImage: {
        width: '60%',
        paddingBottom: 160,
        height: 55,
        //backgroundColor: 'pink',
        resizeMode: 'contain'
    },
    languageOptionText: {
        fontFamily: appConfig.fontFamily_1,
        color: appConfig.fontColor_1,
    
    }
});

export default LanguageSelectionView;