import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet } from 'react-native';

var inGameTag = '80VG20G2';
const apiToken = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImQyOTIxMTQ0LWQ5NmQtNDRjNi05ZWJkLTRiNzJlNjQyN2FkYyIsImlhdCI6MTY2OTE5NDYwOCwic3ViIjoiZGV2ZWxvcGVyLzcxZjI1YmUxLWQ4OGEtNGQwZi1lMDNlLTY4M2VkOTQ4NTYzNSIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxODUuMjguODEuMjIwIl0sInR5cGUiOiJjbGllbnQifV19.8MznSF8Xmuodxfq7UHI86TddJYmd_W1LM75uVzEYSZ9KheVuluUuuQo5089V86s0bbMHEzU_Dea_zG46OESVuA';
const apiToken2 = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjkzMGVlODM5LTc4MmQtNDAzZi1iZDA2LWY4OTQ5MWQ1NjcwMiIsImlhdCI6MTY2NzM4MzA3MCwic3ViIjoiZGV2ZWxvcGVyLzcxZjI1YmUxLWQ4OGEtNGQwZi1lMDNlLTY4M2VkOTQ4NTYzNSIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI5My4xNDYuMjI3LjIxMyJdLCJ0eXBlIjoiY2xpZW50In1dfQ.mFF4rafx57RsogbYS71HUwq8vv5SLc-Zc8rAdgLn3mp-Sm-xpC4dkg6KaajDcD2dYnEEXmHs0FPfCGO0Oow2Dg';

const getCharactersInfo = async () => {
    const response = await fetch(`https://api.clashroyale.com/v1/players/%23${inGameTag}`, {
        headers: new Headers({
            Authorization: `${apiToken}`, 
        }),
    })
    const data = await response.json();
    console.log(data);
    return data;
}

export const PlayerInfo = ({ navigation }) => {
    const [list, setList] = useState({});

    useEffect(() => {
        getCharactersInfo().then(setList);
    }, []);

    const checkClan = (item) => {
        if (item.clan != undefined) {
            return item.clan.name;
        } else {
            return '';
        }
    };

    return(
        <SafeAreaView style={styles.container}>
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
                        <Text style={{width: '50%', textAlign: 'right'}}>{list.leagueStatistics.previousSeason?.trophies}</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                        <Text>Rank:       </Text>
                        <Text style={{width: '50%', textAlign: 'right'}}>{list.leagueStatistics.previousSeason?.rank}</Text>
                    </View>
                </View>
                <View style={{width: 1, backgroundColor: 'grey', marginVertical: 10}}></View>
                <View style={{flexDirection: 'column', width: '50%', paddingHorizontal: 30, marginVertical: 25}}>
                    <View style={{alignItems: 'center'}}>
                        <Text>Best Season</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 25}}>
                        <Text>Trophies:</Text>
                        <Text style={{width: '50%', textAlign: 'right'}}>{list.leagueStatistics.bestSeason?.trophies}</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                        <Text>Rank:       </Text>
                        <Text style={{width: '50%', textAlign: 'right'}}>{list.leagueStatistics.bestSeason?.rank}</Text>
                    </View>
                </View>
            </View>
            <View style={{height: 1, backgroundColor: 'grey', marginHorizontal: 10}}></View>
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
});

export default PlayerInfo;