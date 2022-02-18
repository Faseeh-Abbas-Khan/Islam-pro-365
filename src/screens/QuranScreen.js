import React from 'react'
import { StyleSheet, Text, FlatList, SafeAreaView, StatusBar, TouchableOpacity, View } from 'react-native';
import QuranKemenag from 'quran-kemenag';
import LottieView from 'lottie-react-native';
import { Searchbar } from 'react-native-paper';
import { Row, Col, ScaledText, Line, Box, Padder } from 'urip-rn-kit'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Item = ({ title, id, arabic, verse_count }) => {

    return (
        <Col>
            <Padder horizontal={10}>
                <Row height={60}>
                    <Col justifyCenter>
                        <Box
                            backgroundImage={require('../assets/images/num_bg.png')}
                            height={40}
                            width={40}
                            justifyCenter
                            alignCenter
                        >
                            <ScaledText bold size={13}>
                                <Text style={styles.title}>{id}</Text>
                            </ScaledText>
                        </Box>
                    </Col>
                    <Col size={3} justifyCenter>
                        <ScaledText size={17} bold>
                            <Text style={styles.title}>{title}</Text>
                        </ScaledText>
                        <ScaledText>
                            <Text style={[styles.title, { color: '#888888' }]}>{verse_count} verses</Text>
                        </ScaledText>
                    </Col>
                    <Col size={2} justifyCenter alignEnd>
                        <ScaledText size={20}>
                            <Text style={styles.title}>{arabic}</Text>
                        </ScaledText>
                    </Col>
                </Row>
                <Line size={1} color='grey' />
            </Padder>
        </Col>
    )
};


export default function QuranScreen({ navigation }) {

    const [listOfSurah, setListOfSurah] = React.useState([]);
    const [filteredList, setFilteredList] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [search, setSearch] = React.useState('');

    React.useEffect(() => {
        getSurahList();
        setTimeout(() => {
            setLoading(false);
        }, 1500)
    }, [])

    const getSurahList = async () => {
        const quran = new QuranKemenag();
        const data = await quran.getListSurah();
        setListOfSurah(data);
        setFilteredList(data);
    }
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => { navigation.navigate('Surah', item) }}>
            <Item id={item.surah_id} title={item.surah_name} arabic={item.surah_name_arabic} verse_count={item.surah_verse_count} />
        </TouchableOpacity>
    );

    const searchFilter = (val) => {
        if (val) {
            const newData = listOfSurah.filter((item) => {
                const itemData = item.surah_name ? item.surah_name.toUpperCase() : ``.toUpperCase();
                const textData = val.toUpperCase();
                return (itemData.indexOf(textData)) > -1;
            });
            setFilteredList(newData);
            setSearch(val);
        }
        else {
            setFilteredList(listOfSurah);
            setSearch(val);
        }
    }


    return (
        <SafeAreaView style={{ justifyContent: 'center', flex: 1, backgroundColor: '#fff' }}>
            <StatusBar backgroundColor='#8F40FA' barStyle='light-content' />
            {
                loading ? (
                    <LottieView source={require('../assets/loadingAnimations/18127-book-animation.json')} style={styles.animation} autoPlay loop />
                ) : (
                    <View style={{ flex: 1 }}>
                        <Searchbar
                            placeholder="Search"
                            onChangeText={(val) => {
                                searchFilter(val)
                            }}
                            style={styles.searchBar}
                        />
                        <FlatList
                            data={filteredList}
                            keyExtractor={item => `${item.surah_id}`}
                            renderItem={renderItem}
                        />
                    </View>
                )
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row'
    },
    title: {
        color: 'black'
    },
    animation: {
        height: 400,
        width: 'auto',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    searchBar: {
        height: 55,
        borderColor: 'purple',
        borderWidth: 1,
        borderRadius: 30,
        width: '90%',
        alignSelf: 'center',
        marginVertical: '2%'
    }
})
