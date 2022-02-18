import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

import HomeScreen from '../screens/HomeScreen';
import QiblaCompass from '../screens/QiblaCompass';
import QuranScreen from '../screens/QuranScreen';
import DuaScreen from '../screens/DuaScreen';
import SurahScreen from '../screens/SurahScreen';
import DuaDetails from '../screens/DuaDetails';


import AntDesign from 'react-native-vector-icons/AntDesign'

export default function MainStack({ navigation }) {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Home' component={HomeScreen} options={{
                headerShown: false,
            }} />
            <Stack.Screen name='Qibla' component={QiblaCompass} options={{
                headerStyle: {
                    backgroundColor: '#D5A101'
                },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                title: 'Qibla-Compass'
            }} />
            <Stack.Screen name='Quran' component={QuranScreen} options={{
                title: 'Quran',
                headerTitleStyle: {
                    fontSize: 22,
                    fontWeight: 'bold'
                },
                headerTintColor: 'white',
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#8F40FA',
                },
                headerTransparent: false,
            }} />
            <Stack.Screen name='Surah' component={SurahScreen} options={({ route }) => ({
                title: route.params.surah_name,
                headerTitleStyle: {
                    fontSize: 22,
                    fontWeight: 'bold'
                },
                headerTintColor: 'white',
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#8F40FA',
                },
                headerTransparent: false,
                headerRight: () => (
                    <AntDesign name='home' size={30} color={'white'} style={{ marginRight: '3%' }} onPress={() => { navigation.navigate('Home') }} />
                ),
            })} />
            <Stack.Screen name='Dua' component={DuaScreen} options={{
                headerTitleStyle: {
                    fontSize: 22,
                    fontWeight: 'bold'
                },
                headerTintColor: 'white',
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#419366',
                },
                headerTransparent: false,
            }} />
            <Stack.Screen name='DuaDetail' component={DuaDetails} options={{
                headerTitleStyle: {
                    fontSize: 22,
                    fontWeight: 'bold'
                },
                headerTintColor: 'white',
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#419366',
                },
                headerTransparent: false,
                headerRight: () => (
                    <AntDesign name='home' size={30} color={'white'} style={{ marginRight: '3%' }} onPress={() => { navigation.navigate('Home') }} />
                ),
            }} />
        </Stack.Navigator>
    )
}
