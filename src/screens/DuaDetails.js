import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const Item = ({ title, arabic, translation, transliteration, reference }) => (
    <View style={styles.itemBox}>
        <Text style={styles.title}>{title}</Text>
        <Text style={[styles.translationTitle, { alignSelf: 'flex-end' }]}>(Arabic)</Text>
        <Text style={styles.arabic}>{arabic}</Text>
        <Text style={styles.translationTitle}>Translation</Text>
        <Text style={styles.translation}>{translation}</Text>
        <Text style={styles.translationTitle}>Transliteration</Text>
        <Text style={styles.translation}>{transliteration}</Text>
        <Text style={styles.reference}>{reference}</Text>
    </View>
);

const DuaDetails = ({ route }) => {

    var Data = route.params

    const renderItem = ({ item }) => (
        <TouchableOpacity>
            <Item title={item.title} arabic={item.arabic} transliteration={item.transliteration} translation={item.translation} reference={item.reference} />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={Data}
                renderItem={renderItem}
                keyExtractor={item => item.title}
            />
        </View>
    )
}

export default DuaDetails;

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#fff'
    },
    itemBox: {
        width: '95%',
        borderBottomWidth: 1,
        alignSelf: 'center',
        height: 'auto',
        marginVertical: 10,
        padding: 10
    },
    title: {
        fontSize: 19,
        fontWeight: '600',
        alignSelf: 'center',
        textAlign: 'center',
        marginHorizontal: 5,
        marginVertical: 10,
        color: 'black'
    },
    arabic: {
        fontSize: 25,
        fontWeight: '600',
        alignSelf: 'center',
        textAlign: 'right',
        color: 'black',
        marginVertical: 10,
    },
    translation: {
        textAlign: 'justify',
        color: 'black',
        marginVertical: 10,
        fontSize: 15
    },
    translationTitle: {
        alignSelf: 'flex-start',
        fontSize: 17,
        color: 'black',
    },
    reference: {
        color: 'grey',
        fontSize: 15
    }
})