/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { Image, ImageBackground, StyleSheet, View, StatusBar } from 'react-native';
import CompassHeading from 'react-native-compass-heading';
import Geolocation from '@react-native-community/geolocation';
import LottieView from 'lottie-react-native';

class QiblaCompass extends Component {
    state = {
        compassHeading: 0,
        qiblaDirection: 0,
        loading: true
    };

    componentDidMount() {
        this.getLocation();
        const degree_update_rate = 0.1;

        CompassHeading.start(degree_update_rate, degree => {
            this.setState({ compassHeading: degree.heading });
        });

        return () => {
            CompassHeading.stop();
        };
    }
    componentWillUnmount() {
        CompassHeading.stop();
    }


    calculate = (latitude, longitude) => {
        console.log('calculation')
        const PI = Math.PI;
        let latk = (21.4225 * PI) / 180.0;
        let longk = (39.8264 * PI) / 180.0;
        let phi = (latitude * PI) / 180.0;
        let lambda = (longitude * PI) / 180.0;
        let qiblaDirection =
            (180.0 / PI) *
            Math.atan2(
                Math.sin(longk - lambda),
                Math.cos(phi) * Math.tan(latk) -
                Math.sin(phi) * Math.cos(longk - lambda),
            );
        this.setState({ qiblaDirection });
        this.state.loading = false;
    };

    getLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                console.log(latitude, longitude)
                this.calculate(latitude, longitude);
            },
            error => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
    };

    render() {
        return (
            <View style={styles.container} >
                <StatusBar backgroundColor='#D5A101' barStyle='light-content' />
                {
                    this.state.loading ? (
                        <LottieView source={require('../assets/loadingAnimations/80702-compass.json')} autoPlay style={styles.animation} />
                    ) :
                        <ImageBackground
                            source={require('../assets/images/kompass.png')}
                            style={[
                                styles.image,
                                { transform: [{ rotate: `${360 - this.state.compassHeading}deg` }] },
                            ]}>
                            <View
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transform: [{ rotate: `${this.state.qiblaDirection}deg` }],
                                }}>
                                <Image
                                    source={require('../assets/images/kabbah.png')}
                                    style={{ resizeMode: 'contain', height: 40, marginBottom: "50%" }}
                                />
                            </View>
                        </ImageBackground>
                }
            </View >
        );
    }
}

export default QiblaCompass;

const styles = StyleSheet.create({
    image: {
        width: "120%",
        height: 'auto',
        flex: 0.4,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    container: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center'
    },
    animation: {
        height: 300,
        width: 'auto',
        marginBottom: '10%',
        alignSelf: 'center'
    }
});