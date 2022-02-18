import React from 'react';
import { View, Text, StyleSheet, Share } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'

const DuaHeader = ({ title, dua }) => {

    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    `${dua} 
                    To Share Dua Like these download this app https://play.google.com/store/apps/developer?id=com.inbound.islam365`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, paddingBottom: 10, borderBottomColor: '#ddd' }}>
                <View style={{ flex: 5, alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, color: 'white', fontWeight: '900', marginLeft: '17%' }}>Random Dua</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Entypo name='share' color={'white'} size={25} onPress={onShare} />
                </View>
            </View>

            <View style={{ marginVertical: 10, width: '100%' }}>
                <Text numberOfLines={2} style={styles.title}>
                    {title}
                </Text>
                <Text numberOfLines={5} style={styles.dua}>
                    {dua}
                </Text>
            </View>
        </View>
    )
}

export default DuaHeader;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#D5A101',
        height: 'auto',
        width: '90%',
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 15,
        paddingVertical: 20,
        paddingHorizontal: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 10,
    },
    title: {
        textAlign: 'center',
        fontSize: 17,
        marginBottom: 10,
        color: "#fff",
        fontWeight: '700'
    },
    dua: {
        fontSize: 22,
        color: "#fff",
        textAlign: 'center',
        fontWeight: '600'
    }
})