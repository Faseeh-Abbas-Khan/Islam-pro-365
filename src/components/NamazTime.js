import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';



const NamazTime = ({ data }) => {

    return (
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        >
            <View style={styles.timeBox}>
                <View style={styles.Time}>
                    <Text style={styles.namazName}>Fajr</Text>
                    <Image
                        source={require('../assets/namaztime/sunrise.png')}
                        style={styles.img}
                    />
                    {data.Fajr ? (<Text style={styles.namazTime}>{data.Fajr}</Text>) : <ActivityIndicator size='small' color={'white'} />
                    }
                </View>
                <View style={styles.Time}>
                    <Text style={styles.namazName}>Dhuhr</Text>
                    <Image source={require('../assets/namaztime/noon.png')}
                        style={styles.img} />
                    {data.Dhuhr ? (<Text style={styles.namazTime}>{data.Dhuhr}</Text>) : <ActivityIndicator size='small' color={'white'} />
                    }
                </View>
                <View style={styles.Time}>
                    <Text style={styles.namazName}>Asr</Text>
                    <Image source={require('../assets/namaztime/noon.png')}
                        style={styles.img} />
                    {data.Asr ? (<Text style={styles.namazTime}>{data.Asr}</Text>) : <ActivityIndicator size='small' color={'white'} />
                    }
                </View>
                <View style={styles.Time}>
                    <Text style={styles.namazName}>Maghrib</Text>
                    <Image source={require('../assets/namaztime/sunfall.png')}
                        style={styles.img} />
                    {data.Maghrib ? (<Text style={styles.namazTime}>{data.Maghrib}</Text>) : <ActivityIndicator size='small' color={'white'} />
                    }
                </View>
                <View style={styles.Time}>
                    <Text style={styles.namazName}>Isha</Text>
                    <Image source={require('../assets/namaztime/moon.png')}
                        style={styles.img}
                    />
                    {data.Isha ? (<Text style={styles.namazTime}>{data.Isha}</Text>) : <ActivityIndicator size='small' color={'white'} />
                    }
                </View>
            </View>
        </ScrollView>
    )
}

export default NamazTime;

const styles = StyleSheet.create({
    Time: {
        marginHorizontal: 5,
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
        height: 120,
        width: 90,
        borderRadius: 15,
        backgroundColor: '#419366',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 1,
        shadowRadius: 4.65,
        elevation: 10,
    },
    timeBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 5
    },
    img: {
        height: 50,
        width: 50,
        marginVertical: 5
    },
    namazName: {
        color: 'white',
        fontWeight: '800',
        fontSize: 15
    },
    namazTime: {
        color: 'white',
        fontWeight: '800',
        fontSize: 15
    }
});