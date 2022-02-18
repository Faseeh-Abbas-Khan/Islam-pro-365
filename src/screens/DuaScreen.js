import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native';
import { Searchbar } from 'react-native-paper';

//icons
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Item = ({ title }) => (
    <View style={styles.itemBox}>
        <View style={styles.id}>
            <FontAwesome5 name='praying-hands' size={20} color='#D6AC2A' />
        </View>
        <View style={styles.title}>
            <Text style={styles.titleTxt}>{title}</Text>
        </View>
    </View>
);



const DuaScreen = ({ navigation }) => {

    const urlDua = `https://raw.githubusercontent.com/puntoria/prayertimes-api/master/run_results.json`

    const [Data, setData] = useState([]);
    const [filteredList, setFilteredList] = React.useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = React.useState('');

    const getData = () => {
        fetch(urlDua)
            .then((res) => res.json())
            .then((json) => {
                setData(json.data);
                setFilteredList(json.data);
            })
            .catch((error) => console.log(error))
            .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        getData();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => { navigation.navigate('DuaDetail', item.duas) }}>
            <Item title={item.name} />
        </TouchableOpacity>
    );

    const searchFilter = (val) => {
        console.log(val)
        if (val) {
            const newData = Data.filter((item) => {
                const itemData = item.name ? item.name.toUpperCase() : ``.toUpperCase();
                const textData = val.toUpperCase();
                return (itemData.indexOf(textData)) > -1;
            });
            setFilteredList(newData);
            setSearch(val);
        }
        else {
            setFilteredList(Data);
            setSearch(val);
        }
    }

    return (
        <View
            style={styles.container}
        >
            <StatusBar backgroundColor='#419366' barStyle='light-content' />
            {isLoading ? <ActivityIndicator color='#069e54' size='large'
                style={styles.loading} /> :
                (
                    <View style={{ flex: 1 }}>
                        <Searchbar
                            placeholder="Search"
                            onChangeText={(val) => {
                                searchFilter(val)
                            }}
                            style={styles.searchBar}
                        />
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={filteredList}
                            renderItem={renderItem}
                            keyExtractor={item => item.name}
                        />
                    </View>
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemBox: {
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        alignSelf: 'center',
        alignItems: 'center',
        width: '98%',
        height: 'auto',
        paddingHorizontal: 5,
        paddingVertical: 10,
        flexDirection: 'row',
        marginVertical: 10,
        shadowColor: "#ddd",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.27,
        shadowRadius: 10,
        elevation: 0.5,

    },
    title: {
        width: '90%',
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    titleTxt: {
        color: 'black',
        fontSize: 16,
        fontWeight: '700'

    },
    id: {
        padding: 3,
        marginHorizontal: 8,
        justifyContent: 'center'
    },
    searchBar: {
        height: 50,
        borderRadius: 25,
        width: '95%',
        alignSelf: 'center',
        marginVertical: '2%'
    }

})
export default DuaScreen;