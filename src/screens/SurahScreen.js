import QuranKemenag from 'quran-kemenag';
import React from 'react'
import { StyleSheet, Text, SafeAreaView, FlatList, TouchableOpacity, Share } from 'react-native'
import { Row, Col, ScaledText, Circle, Box, Padder, ImgIcon, Gap, Line } from 'urip-rn-kit'





export default function SurahScreen({ route }) {

    const Item = ({ arabic, id }) => {

        const onShare = async () => {
            try {
                const result = await Share.share({
                    message:
                        `${arabic}`,
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
            <Padder horizontal={5}>
                <Col>
                    <Row>
                        <Col>
                            <Padder horizontal={5}>
                                <Box fullWidth borderRadius={15} color='#F2E6F4' height={40}>
                                    <Row>
                                        <Col size={2} alignStart justifyCenter>
                                            <Padder horizontal>
                                                <Circle size={30}>
                                                    <ScaledText color='white' bold>
                                                        <Text>
                                                            {id}
                                                        </Text>
                                                    </ScaledText>
                                                </Circle>
                                            </Padder>
                                        </Col>
                                        <Col size={1}>
                                            <Row alignCenter justifyEnd>
                                                <TouchableOpacity
                                                    onPress={onShare}
                                                    style={{ marginRight: 15 }}>
                                                    <ImgIcon
                                                        source={require('../assets/icons/share.png')}
                                                        tintColor='#542F84'
                                                        size={22}
                                                    />
                                                </TouchableOpacity>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Box>
                            </Padder>
                        </Col>
                    </Row>
                    <Row alignStart justifyEnd>
                        <Padder horizontal={5}>
                            <ScaledText color='black' size={28} ><Text>{arabic}</Text></ScaledText>
                        </Padder>
                    </Row>
                    <Gap vertical />
                    <Line size={1} />
                    <Gap vertical />
                </Col>
            </Padder>
        )
    };


    var item = route.params

    const [verse, setVerse] = React.useState([]);

    const getQuran = () => {
        console.log(item.surah_id)
        var json = require('../quran/quran.json')
        let jlength = json[item.surah_id].length
        console.log(jlength)
        let ayat = [];
        for (let i = 0; i < jlength; i++) {
            ayat.push(json[item.surah_id][i])
        }
        console.log(ayat)
        setVerse(ayat)

    }

    React.useEffect(() => {
        getQuran();
    }, []);


    const renderItem = ({ item }) => (
        <Item arabic={item.text} id={item.verse} />
    );


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                style={{ marginVertical: 5 }}
                data={verse}
                keyExtractor={v => v.verse}
                renderItem={renderItem}
            />
        </SafeAreaView>
    )
}