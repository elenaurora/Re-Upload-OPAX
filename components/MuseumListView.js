import React from 'react';
import { View, StyleSheet, Linking, TouchableOpacity, Image, Text, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { appConfig } from '../config';


const MuseumListView = ({documentsFolder, museums, selectCallback}) => {

    const navigation = useNavigation();
    const { t, i18n } = useTranslation();
    console.log("Creating MuseumListView with properties=" + JSON.stringify({ documentsFolder, museums }));


    
    return (
        
        <View style={styles.listView}>
            <TouchableOpacity
            style={styles.listElement} 
            onPress={() => Linking.openURL('https://online.fliphtml5.com/pfurn/cdik/')} 
            >
            <Text style={styles.museumName}>{t('MuseumsListScreen.IntroLabel')}</Text>
            <Image
                source={require('../assets/images/istruzioni.png')}  
                style={{
                    height: Number(t('MuseumsListScreen.caa_icons')),
                    width: Number(t('MuseumsListScreen.caa_icons')),
                }
        }
            />
            
            </TouchableOpacity>

            

            <FlatList
                data={museums}
                renderItem={({item}) =>                 
                    <TouchableOpacity 
                        accessible={true}
                        accessibilityLabel={item.name}
                        style={styles.listElement} 
                        key = { "ListItem-" + item.id }
                        onPress={() => {
                            selectCallback();
                            navigation.navigate('MuseumScreen', { museum: item, documentsFolder: documentsFolder });
                        }}
                    >
                        <Text 
                            style={styles.museumName}
                            adjustsFontSizeToFit={true}
                            numberOfLines={1}
                        >{item.name}</Text>
                        <Image
                source={require('../assets/images/visita.png')}  
                style={{
                    height: Number(t('MuseumsListScreen.caa_icons')),
                    width: Number(t('MuseumsListScreen.caa_icons')),
                }}
            />
                    </TouchableOpacity>
                }
                ItemSeparatorComponent={() => 
                    <View style={styles.separator}/>
                }
                />
        </View>
    );
    }
    


const styles = StyleSheet.create({
    listView: {
        flex: 1.0,
        backgroundColor: appConfig.backgroundColor_2,
        marginTop: 30,
    },
    listElement: {
        backgroundColor: appConfig.backgroundColor_3,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: appConfig.backgroundColor_1,
        borderRadius:10,
        margin: 30,
        marginTop: 5,
        marginLeft: 40,
        elevation: 5,
        width: '80%',
        height: 160
    },

    mvlIcon: { /** simbolo logo*/
    width: 55,
    height: 55,
  },
    museumName: {
        fontFamily: appConfig.fontFamily_2_bold,
        color: appConfig.fontColor_1,
        fontSize: 42,
        textAlign: 'center',
        paddingBottom: 10,
    },
    
});  

export default MuseumListView;
