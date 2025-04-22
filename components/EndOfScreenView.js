import { View, Image, StyleSheet } from 'react-native'
import React from 'react';

const EndOfScreenView = () => {

    return (
        <View style={styles.container}>
            <View style={styles.line}/>
            <View style={styles.imageView}>
                <Image
                    source={require('../assets/images/LOGO_APP.png')}  
                    style={styles.image}
                />
            </View>
            <View style={styles.line}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 0,
        flexDirection: 'row', 
        width: '0%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 0
    },
    line: {
        height: 1,
        width: "60%",
        backgroundColor: "black",
    },
    imageView: {
        paddingHorizontal: 0
    },
    image: {
        width: 0,
        height: 0
    }
})


export default EndOfScreenView;

