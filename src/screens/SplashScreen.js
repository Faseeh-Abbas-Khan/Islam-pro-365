import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import LottieView from 'lottie-react-native';

export default function SplashScreen() {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#D5A101' barStyle='light-content' />
            <LottieView source={require('../assets/loadingAnimations/4098-bismillah-in-the-name-of-allah.json')} autoPlay style={styles.animation} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D5A101'
    },
    animation: {
        height: 300,
        width: 'auto',
        marginBottom: '10%',
        alignSelf: 'center'
    }
})
