import React from "react";
import { View, Linking, StyleSheet, Share } from 'react-native'
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import LottieView from 'lottie-react-native';

const CustomDrawer = (props) => {


    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'Hey check out this app through with you can read and listen to quran and learn duas https://play.google.com/store/apps/developer?id=com.inbound.islam365',
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
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}
                contentContainerStyle={{ backgroundColor: '#fff' }}
            >
                <View
                    style={{ padding: 10, marginTop: -5, borderBottomWidth: 2, borderBottomColor: 'lightgrey' }}
                >
                    <LottieView source={require('../assets/loadingAnimations/59734-muslim-people-lifestyle-ramadan-2021.json')} style={[styles.animation], { height: 150, alignSelf: 'center' }} autoPlay loop />

                </View>
                <View
                    style={{ flex: 1, backgroundColor: '#fff', paddingTop: 20 }}>
                    <DrawerItemList {...props} />
                    <DrawerItem
                        label="Terms and Privacy"
                        onPress={() => Linking.openURL('https://sites.google.com/view/islam365')}
                    />
                    <DrawerItem
                        label="Like us on Facebook"
                        onPress={() => Linking.openURL('https://www.facebook.com/inboundpk')}
                    />
                    <DrawerItem
                        label="Follow us on Instagram"
                        onPress={() => Linking.openURL('https://www.instagram.com/inboundpk')}
                    />
                    <DrawerItem
                        label="Share this App"
                        onPress={onShare}
                    />
                    <DrawerItem
                        label="Rate this App"
                        onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.inbound.islam365')}
                    />
                    <DrawerItem
                        label="More Apps from Us!"
                        onPress={() => Linking.openURL('https://play.google.com/store/apps/developer?id=whatsdevelopers')}
                    />
                </View>
            </DrawerContentScrollView>
        </View>
    )
}

export default CustomDrawer;

const styles = StyleSheet.create({
    animation: {
        height: 200,
        width: 'auto',
        alignSelf: 'center'
    }
})