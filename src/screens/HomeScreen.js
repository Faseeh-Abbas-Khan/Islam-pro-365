import React from 'react'
import { View, Text, StyleSheet, ScrollView, StatusBar, ImageBackground, Image, TouchableOpacity, Alert } from 'react-native'
import LottieView from 'lottie-react-native';
import NetInfo from "@react-native-community/netinfo";


//location
import Geolocation from '@react-native-community/geolocation';

//components
import NamazTime from '../components/NamazTime';
import DisplayHeader from '../components/DisplayHeader';
import { NotificationSchedule } from '../services/NotificationService';

//Icon
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default HomeScreen = ({ navigation }) => {

    const [namazTime, setNamazTime] = React.useState([]);
    const [dua, setDua] = React.useState({
        Dua: '',
        Name: ''
    });
    const [duaLoading, setDuaLoading] = React.useState(true);
    const [isConnected, setIsConnected] = React.useState(true);

    //checkConnection
    const checkConnection = () => {
        NetInfo.addEventListener(state => {
            if (!state.isConnected) {
                Alert.alert(
                    'you are offline',
                    'Please connect to internet to use this app!',
                    [
                        { text: "OK", onPress: () => { setIsConnected(false) } }
                    ]
                )
            }
        })
        console.log(isConnected);
    }

    //getting location
    const location = async () => {
        Geolocation.getCurrentPosition(
            (position) => {
                getNamazTime(position.coords.longitude, position.coords.latitude, position.coords.altitude);
            },
            (error) => alert('Error Finding Location Please Allow Location Access'),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }

    //getting Namaz Time
    const getNamazTime = async (Long, Lat, ele) => {
        return await fetch(`https://api.pray.zone/v2/times/today.json?longitude=${Long}&latitude=${Lat}&elevation=${ele}`)
            .then((response) => response.json())
            .then((json) => {
                setTimeNamaz(json);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const setTimeNamaz = (json) => {
        setNamazTime(json.results.datetime[0].times)
        NotificationSchedule(json.results.datetime[0].times)
    }

    //dua data
    const getDua = () => {
        fetch(`https://raw.githubusercontent.com/puntoria/prayertimes-api/master/run_results.json`)
            .then((res) => res.json())
            .then((json) => {
                let randomMain;
                randomMain = Math.floor(Math.random() * json.data.length);

                let randomArr = Math.floor(Math.random() * json.data[randomMain].duas.length)
                setDua({
                    Dua: json.data[randomMain].duas[randomArr].arabic,
                    Name: json.data[randomMain].name,
                })
            })
            .catch((error) => console.log(error))
            .finally(() => { setDuaLoading(false) })
    }

    React.useEffect(() => {
        location();
        getDua();
        checkConnection();
    }, [])

    return (
        <ScrollView style={styles.container}>
            <StatusBar backgroundColor='#fff' barStyle='dark-content' />

            <View style={styles.mainHead}>
                <MaterialCommunityIcons name='menu' color={'#fff'} size={25} onPress={() => { navigation.openDrawer() }}></MaterialCommunityIcons>
                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', marginLeft: '5%' }}>Islam 356</Text>
            </View>
            {
                !duaLoading ?
                    (
                        <View style={{ marginTop: '2%' }}>
                            <DisplayHeader title={dua.Name} dua={dua.Dua} />
                        </View>
                    )
                    : <LottieView source={require('../assets/loadingAnimations/9329-loading.json')} style={[styles.animation], { height: 150, alignSelf: 'center' }} autoPlay loop />
            }
            <View>
                <LottieView source={require('../assets/loadingAnimations/59734-muslim-people-lifestyle-ramadan-2021.json')} style={styles.animation} autoPlay loop />
            </View>
            {
                isConnected ? (
                    <View style={styles.NamazTimeline}>
                        <NamazTime data={namazTime} />
                    </View>
                ) : (
                    <View style={{
                        alignSelf: 'center',
                        marginVertical: 15
                    }} >
                        <MaterialCommunityIcons name='wifi-off' color={'black'} size={30} style={{
                            alignSelf: 'center'
                        }} />
                        <Text style={{ color: 'black' }}>You are Offline!</Text>
                    </View>
                )
            }

            {/* compass redirect */}
            <ImageBackground
                style={[styles.BgImage, { height: 200, marginVertical: 5, marginTop: 15 }]}
                source={require('../assets/images/qibla.jpg')}
                blurRadius={4}
            >
                <View style={[styles.BgImage, { height: '70%', width: '80%', padding: 10, borderRadius: 15, }]}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row' }}
                        onPress={() => navigation.navigate('Qibla')}
                    >
                        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ textAlign: 'center', color: 'white', fontWeight: '700' }}>
                                Qibla Compass Will help you find Qibla direction so that you can offer prayer in right direction.
                            </Text>
                        </View>
                        <View style={styles.FloatingImg}>
                            <Image
                                source={require('../assets/images/compass.png')}
                                style={{ height: 90, width: 90 }}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>

            {/* Quran */}
            <ImageBackground
                style={[styles.BgImage, { height: 200, marginVertical: 5 }]}
                source={require('../assets/images/Holy-Quran.jpg')}
                blurRadius={4}
            >
                <View style={[styles.BgImage, { height: '70%', width: '80%', padding: 10, borderRadius: 15, }]}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row' }}
                        onPress={() => { navigation.navigate('Quran') }}
                    >
                        <View style={styles.FloatingImg}>
                            <Image
                                source={require('../assets/images/quran.png')}
                                style={{ height: 90, width: 130 }}
                            />
                        </View>
                        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ textAlign: 'center', color: 'white', fontWeight: '700', margin: 6 }}>
                                Read and Learn Quran on daily bases.
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>

            {/* Dua */}
            <ImageBackground
                style={[styles.BgImage, { height: 200, marginVertical: 5 }]}
                source={require('../assets/images/Dua.jpg')}
                blurRadius={4}
            >
                <View style={[styles.BgImage, { height: '70%', width: '80%', padding: 10, borderRadius: 15, }]}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row' }}
                        onPress={() => { navigation.navigate('Dua') }}>
                        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ textAlign: 'center', color: 'white', fontWeight: '700', margin: 5 }}>
                                Read and Learn Dua on daily bases.
                            </Text>
                        </View>
                        <View style={styles.FloatingImg}>
                            <Image
                                source={require('../assets/images/Duahands.png')}
                                style={{ height: 90, width: 130 }}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    mainHead: {
        flexDirection: 'row',
        height: 60,
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        borderRadius: 20,
        marginTop: 10,
        backgroundColor: '#419366',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    menuOpt: {
        marginTop: '9%',
        backgroundColor: '#419366',
    },
    lable: {
        height: 20,
        fontSize: 15,
        margin: 2,
        color: '#fff'
    },
    trigger: {
        width: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        backgroundColor: '#D5A101',
        height: 'auto',
        paddingVertical: 15
    },
    headerTxt: {
        fontSize: 18,
        fontWeight: '800',
        color: '#fff'
    },
    NamazTimeline: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    BgImage: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: 10
    },
    FloatingImg: {
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    animation: {
        height: 250,
        width: 'auto',
        alignSelf: 'center'
    }
})
