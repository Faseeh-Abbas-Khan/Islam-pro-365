import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MainStack from './mainStack';
import CustomDrawer from './customDrw.js';
import AntDesign from 'react-native-vector-icons/AntDesign'

const Drawer = createDrawerNavigator();

export default function Drw() {


    return (
        <Drawer.Navigator initialRouteName="Mepco Bill Check"
            drawerContent={props => <CustomDrawer {...props} />}
            defaultStatus='closed'
            screenOptions={{
                drawerActiveBackgroundColor: '#DFCDA9',
                drawerActiveTintColor: '#fff',
                drawerIcon: () => (
                    <AntDesign name='home' size={30} color={'white'} style={{ marginRight: '-5%' }} onPress={() => { navigation.navigate('Home') }} />
                )
            }}
        >
            <Drawer.Screen name="Islam 356" component={MainStack} options={{
                headerShown: false
            }} />
        </Drawer.Navigator>
    );
}