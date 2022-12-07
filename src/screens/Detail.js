import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import {Ionicons} from '@expo/vector-icons';

// Necessario crearsi un Bearer Token sul sito https://developer.clashroyale.com per accedere alle API
var id = '';
const apiToken = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjkzMGVlODM5LTc4MmQtNDAzZi1iZDA2LWY4OTQ5MWQ1NjcwMiIsImlhdCI6MTY2NzM4MzA3MCwic3ViIjoiZGV2ZWxvcGVyLzcxZjI1YmUxLWQ4OGEtNGQwZi1lMDNlLTY4M2VkOTQ4NTYzNSIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI5My4xNDYuMjI3LjIxMyJdLCJ0eXBlIjoiY2xpZW50In1dfQ.mFF4rafx57RsogbYS71HUwq8vv5SLc-Zc8rAdgLn3mp-Sm-xpC4dkg6KaajDcD2dYnEEXmHs0FPfCGO0Oow2Dg';
const apiToken2 = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjY4MGMwZjRkLTg2YmEtNGNjNS1hZjQ2LThkZjg5MmVkOWQ5NyIsImlhdCI6MTY3MDQwMjY4Mywic3ViIjoiZGV2ZWxvcGVyLzcxZjI1YmUxLWQ4OGEtNGQwZi1lMDNlLTY4M2VkOTQ4NTYzNSIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxNzguMjU1LjE4Ny4yNDQiXSwidHlwZSI6ImNsaWVudCJ9XX0.3mdWVe5YB5QfSzeWtwbNK93f6Y8LZ73M43WnD7JE8c8XYg0t4DYBMpkh_tnN3qNRc2kt-Adpi_5DTQK0pAOE1w';

const getCharactersInfo = async () => {
    const response = await fetch(`https://api.clashroyale.com/v1/players/%23${id}`, {
        headers: new Headers({
            Authorization: `${apiToken}`, 
        }),
    })
    const data = await response.json();
    console.log(data);
    return data;
}

export const Detail = ({ navigation, route }) => {
    const [list, setList] = useState({});
    const {inGameTag} = route.params;
    id = inGameTag.substring(1);

    useEffect(() => {
        getCharactersInfo().then(setList);
    }, []);

    const badges = list?.badges;

    const renderItem = useCallback(({ item }) => {
        return(
            <Image
                style = {styles.badge}
                source = {{ uri: item?.iconUrls?.large }}
            />
        );
    }, []);

    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.backArrow}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="close" size={30} color="black" />
            </TouchableOpacity>
            <Text style={styles.playerName}>{list.name}</Text>
            <Text style={styles.playerTag}>{list.tag}</Text>
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.trophies}>{list.trophies} / {list.bestTrophies} PB</Text>
                <Image
                    style = {styles.trophiesImg}
                    source = {{uri : 'https://cdn.royaleapi.com/static/img/ui/trophy.png?t=6f676365c'}}
                />
                <Text style={styles.arena}>{list.arena?.name}</Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 20, marginLeft: 30}}>
                <Text style={styles.clanName}>{list.clan?.name}</Text>
                <View style={{width: 1, backgroundColor: 'grey', marginHorizontal: 10}}></View>
                <Text style={styles.clanRole}>{list.role}</Text>
            </View>
            <View style={{height: 1, backgroundColor: 'grey', marginHorizontal: 10, marginTop: 25}}></View>
            <View style={{flexDirection: 'row'}}>
                <View style={{flexDirection: 'column', width: '50%', paddingHorizontal: 30, marginVertical: 25}}>
                    <View style={{alignItems: 'center'}}>
                        <Text>Previous Season</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 25}}>
                        <Text>Trophies:</Text>
                        <Text style={{width: '50%', textAlign: 'right'}}>{list.leagueStatistics?.previousSeason?.trophies}</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                        <Text>Rank:       </Text>
                        <Text style={{width: '50%', textAlign: 'right'}}>{list.leagueStatistics?.previousSeason?.rank ? list.leagueStatistics?.previousSeason?.rank : '-'}</Text>
                    </View>
                </View>
                <View style={{width: 1, backgroundColor: 'grey', marginVertical: 10}}></View>
                <View style={{flexDirection: 'column', width: '50%', paddingHorizontal: 30, marginVertical: 25}}>
                    <View style={{alignItems: 'center'}}>
                        <Text>Best Season</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 25}}>
                        <Text>Trophies:</Text>
                        <Text style={{width: '50%', textAlign: 'right'}}>{list.leagueStatistics?.bestSeason?.trophies}</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                        <Text>Rank:       </Text>
                        <Text style={{width: '50%', textAlign: 'right'}}>{list.leagueStatistics?.bestSeason?.rank ? list.leagueStatistics?.bestSeason?.rank: '-'}</Text>
                    </View>
                </View>
            </View>
            <View style={{height: 1, backgroundColor: 'grey', marginHorizontal: 10}}></View>
            <FlatList
                data={badges}
                renderItem={renderItem}
                numColumns={4}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        marginTop: 50,
    },
    playerName: {
        marginHorizontal: 30,
        marginTop: 30,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontSize: 24,
    },
    playerTag: {
        marginTop: 5,
        marginHorizontal: 30,
        fontStyle: 'italic',
        fontWeight: '300',
    },
    trophies: {
        marginLeft: 30,
        marginRight: 10,
        marginTop: 10,
    },
    arena: {
        marginLeft: 20,
        marginTop: 10,
        fontWeight: '300',
    },
    trophiesImg: {
        height: 15,
        width: 15,
        resizeMode: 'contain',
        marginTop: 10,
    },
    clanName: {
        fontWeight: 'bold',
        color: 'green',
    },
    clanRole:{
        fontStyle: 'italic',
    },
    badge: {
        height: 90,
        width: '23%',
        resizeMode: 'contain',
        marginLeft: '1%',
    },
    backArrow: {
        height: 31,
        widtgh: 31,
        position: 'absolute',
        right: 10,
    },
});

export default Detail;