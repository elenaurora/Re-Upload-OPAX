import { StyleSheet, Dimensions, View, TouchableOpacity, Image, Text, useColorScheme} from 'react-native'
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { appConfig } from '../config';
import Tts from 'react-native-tts'

Tts.setDefaultLanguage('it-GB')
Tts.setDefaultVoice('com.apple.ttsbundle.Daniel-compact')


const HeaderButton = ({label, callback, image}) => {

    return (
        <TouchableOpacity 
            accessible={true}
            accessibilityLabel={label}
            style={styles.headerButton}
            onPress={callback}
        >          
            {image}

        </TouchableOpacity>
    );
};

const Logo_app = () => {

    return (
        <TouchableOpacity 
            accessible={true}
            style={styles.mvlIcon}
        >          
            <Image
                style={styles.mvlIcon}
                source={require('../assets/images/logo_app_b.png')}
            />

        </TouchableOpacity>
    );
}

const BackButton = () => {

    const navigation = useNavigation();
    const { t, i18n } = useTranslation();

    return (
        <TouchableOpacity 
            accessible={true}
            accessibilityLabel={t('HeaderView.backButtonLabel')}
        
            onPress={() => navigation.goBack(null)}
        >          
            <Image
                style={styles.backButton}
                source={require('../assets/images/back_w.png')}
            />

        </TouchableOpacity>
    );
}


const BackButton_b = () => {

    const navigation = useNavigation();
    const { t, i18n } = useTranslation();

    return (
        <TouchableOpacity 
            accessible={true}
            accessibilityLabel={t('HeaderView.backButtonLabel')}
        
            onPress={() => {navigation.goBack(null); Tts.stop();}}
        >          
            <Image
                style={styles.backButton}
                source={require('../assets/images/back_bl.png')}
            />

        </TouchableOpacity>
    );
}

const VIS_Button = () => {

    const navigation = useNavigation();
    const { t, i18n } = useTranslation();


    return (
        <TouchableOpacity 
            accessible={true}
            style={styles.VIS_Button}
            onPress={() => {navigation.navigate('VisualizationChoice'); Tts.stop();}}
        >          
            <Image
                style={styles.VIS_Button}
                source={require("../assets/images/CAA_S.png")
              }
            />

        </TouchableOpacity>
    );
}

const TiredButton = () => {

    const navigation = useNavigation();
    const { t, i18n } = useTranslation();

    return (
        <TouchableOpacity 
            accessible={true}
            style={styles.TiredButton}
            onPress={() => {navigation.navigate('ManualScreen'); Tts.stop();}}
        >          
            <Image
                style={styles.TiredButton}
                source={require('../assets/images/tired.png')}
            />

        </TouchableOpacity>
    );
}

const NativeSpeech = (content) => {

    return (
        <TouchableOpacity 
            accessible={true}
            style={styles.ttsButton}
            onPress={() => Tts.speak(content)}
        >          
            <Image
                style={styles.ttsButton}
                source={require('../assets/images/tts_b.png')}
            />

        </TouchableOpacity>
    );
}


const HeaderView = ({left=null, right=null, right2=null, right3=null, bar=true, color, titlecolor, title, lines}) => {

    const LOGTAG = "HeaderView";

    const navigation = useNavigation();
    const { t, i18n } = useTranslation();

    console.log(LOGTAG + ": title=" + title +", lines=" + lines);

    const renderBar = () => {
        if(bar == true) {
            return (<View style={styles.headerBar}></View>);
        }
    };

    const renderTitle = () => {

        const iconCount = (left != null ? 1 : 0) + (right != null ? 1 : 0) + (right2 != null ? 1 : 0) + (right3 != null ? 1 : 0);
        const titleWidth = Dimensions.get('window').width - iconCount * 85;

        console.log(LOGTAG + ": titleWidth=" + titleWidth + ", iconCount=" + iconCount);

        if(lines != undefined) {
            return (
                <View style={[styles.titleView, { width: titleWidth }]}>
                    <Text 
                        style={[styles.titleText, { color: titlecolor }]}
                        adjustsFontSizeToFit={true}
                        numberOfLines={lines}
                    >{title}</Text>
                </View>
            );
        }
        else {
            return (
                <View style={[styles.titleView, { width: titleWidth }]}>
                    <Text 
                        style={[styles.titleText, { color: titlecolor }]}
                    >{title}</Text>

                </View>
            );
        }
    }

    return (

        <View style={[styles.headerViewBar, {
            backgroundColor: color
        }
        ]}>
            <View style={styles.headerView}>

                {left}

                {renderTitle()}

                {right}

                {right2}

                {right3}

            </View>
            { renderBar() }
        </View>
    );

}

const styles = StyleSheet.create({

    headerViewBar: {
        flexDirection: 'column',
        width: '100%'
    },
    headerView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        maxHeight: 140,
        marginTop: 10,
        marginBottom: 12
    },

    mvlIcon: { /** simbolo logo*/
    width: 55,
    height: 55,
    left: 10,
    top: 4
  },

    backButton: {
        // padding: 5,
        width: 35,
        height: 35,
        marginLeft: 10,
        marginTop: 5
        // backgroundColor: 'pink'
    },

    TiredButton: {
        width: 55,
        height: 55,
        marginLeft: 16,
        marginRight: 20,
        marginTop: 3,
        resizeMode: 'contain'

    },

    ttsButton: {
        width: 65,
        height: 65,
        marginLeft: 15,
        marginRight: 15,
        marginTop: -2,
        resizeMode: 'contain'

    },

    VIS_Button: {
        width: 65,
        height: 50,
        marginLeft: 12,
        marginRight: 12,
        marginTop: 6,
        resizeMode: 'contain'
    },

    headerButton: {
        padding: 5,
        width: 8,
        height: 8,
        marginLeft: 30,
        marginRight: 20,
        marginTop: 8,
        marginBottom: 15
    },
    titleView: {
        alignItems: 'center', 
        justifyContent: 'center',
        // backgroundColor: 'white',
    },
    titleText: {
        paddingVertical: 5,
        paddingHorizontal: 5,
        fontSize: 40,
        fontFamily: appConfig.fontFamily_1,
        textAlign: 'justify'
    },
    headerBar: {
        height: 2,
        width: '0%',
        alignSelf: 'center',
        backgroundColor: appConfig.fontColor_2
    },
  
});


export {
    VIS_Button,
    Logo_app,
    HeaderView,
    HeaderButton,
    BackButton,
    BackButton_b,
    TiredButton,
    NativeSpeech
}
