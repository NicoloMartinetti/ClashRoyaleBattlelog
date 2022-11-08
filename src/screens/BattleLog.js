import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList, Image } from 'react-native';

const getCharacters = async () => {
    const response = await fetch('https://api.clashroyale.com/v1/players/%2380VG20G2/battlelog', {
        headers: new Headers({
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6Ijk2MmZkZGY2LTE1MDctNDZiOS1hYmRkLTRkZWI0ODMwN2NlZCIsImlhdCI6MTY2NzU1NjQ1MCwic3ViIjoiZGV2ZWxvcGVyLzcxZjI1YmUxLWQ4OGEtNGQwZi1lMDNlLTY4M2VkOTQ4NTYzNSIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIyLjE5OS40MC4yMjQiXSwidHlwZSI6ImNsaWVudCJ9XX0.fWA2YwZ0inv-aBcsFv31H8kcbCOmobWDX-J2cvxQDLAGWPVOll135hgrGBln2NcEGoxAvxA-75TUiTXndUkKXA', 
        }),
    })
    const data = await response.json();
    console.log(data);
    return data;
}

export const BattleLog = () => {
    const [list, setList] = useState([]);

    useEffect(() => {
        getCharacters().then(setList);
    }, []);

    const checkMyClan = (item) => {
        if (item.team[0].clan != undefined) {
            return item.team[0].clan.name;
        } else {
            return '';
        }
    };

    const checkOpponentClan = (item) => {
        if (item.opponent[0].clan != undefined) {
            return item.opponent[0].clan.name;
        } else {
            return '';
        }
    };

    const isLadderMy = (item) => {
        if (item.gameMode.name == 'Ladder') {
            return item.team[0].startingTrophies;
        } else { return '0' }
    }

    const isLadderOpp = (item) => {
        if (item.gameMode.name == 'Ladder') {
            return item.opponent[0].startingTrophies;
        } else { return '0' }
    }

    const renderItem = useCallback(({ item }) => {

        var win = true;
        var tie = false;

        if (item.team[0].crowns > item.opponent[0].crowns) {
            win = true;
        } else { win = false }

        if (item.team[0].crowns == item.opponent[0].crowns) {
            tie = true;
        }

        return (
            <View>
                <View style = { tie ? styles.tieStyle : win ? styles.winStyle : styles.loseStyle }></View>
                <View style = {styles.card}>
                    <Text style = {{ fontWeight: 'bold' }}>{item.gameMode.name}</Text>
                    <View style = {styles.result}>
                        <Image
                            style = {styles.crownsImgL}
                            source = {{uri : 'https://cdn.royaleapi.com/static/img/ui/crown-blue.png?t=5fe83973c'}}
                        />
                        <Text>{item.team[0].crowns}   -    {item.opponent[0].crowns}</Text>
                        <Image
                            style = {styles.crownsImgR}
                            source = {{uri : 'https://cdn.royaleapi.com/static/img/ui/crown-red.png?t=fb34e44ec'}}
                        />
                    </View>
                    <View style = {{ flexDirection: 'row' }}>
                        <View style = {styles.myInfo}>
                            <Text style = {{ fontWeight: 'bold' }}>{item.team[0].name}</Text>
                            <Text style = {{ fontWeight: '200', paddingTop: 5 }}>{checkMyClan(item)}</Text>
                            <View style = {styles.trophies}>
                                <Text style = {styles.trophiesText}>{isLadderMy(item)}</Text>
                            </View>
                        </View>
                        <View style = {styles.opponentInfo}>
                            <Text style = {{ fontWeight: 'bold' }}>{item.opponent[0].name}</Text>
                            <Text style = {{ fontWeight: '200', paddingTop: 5 }}>{checkOpponentClan(item)}</Text>
                            <View style = {styles.trophies}>
                                <Text style = {styles.trophiesText}>{isLadderOpp(item)}</Text>
                            </View>
                        </View>
                    </View>
                    <View style = {{ flexDirection: 'row', marginTop: 10 }}>
                        <View style = {styles.myDeck}>
                            <View style = {{ flexDirection: 'row' }}>
                                <Image
                                    style = {styles.cardImagesMy}
                                    source = {{ uri: item.team[0].cards[0].iconUrls.medium }}
                                />
                                <Image
                                    style = {styles.cardImagesMy}
                                    source = {{ uri: item.team[0].cards[1].iconUrls.medium }}
                                />
                                <Image
                                    style = {styles.cardImagesMy}
                                    source = {{ uri: item.team[0].cards[2].iconUrls.medium }}
                                />
                                <Image
                                    style = {styles.cardImagesMy}
                                    source = {{ uri: item.team[0].cards[3].iconUrls.medium }}
                                />
                            </View>
                            <View style = {{ flexDirection: 'row' }}>
                                <Text style = {styles.levelCardsMy}>{'Lvl ' + (14 - item.team[0].cards[0].maxLevel + item.team[0].cards[0].level)}</Text>
                                <Text style = {styles.levelCardsMy}>{'Lvl ' + (14 - item.team[0].cards[1].maxLevel + item.team[0].cards[1].level)}</Text>
                                <Text style = {styles.levelCardsMy}>{'Lvl ' + (14 - item.team[0].cards[2].maxLevel + item.team[0].cards[2].level)}</Text>
                                <Text style = {styles.levelCardsMy}>{'Lvl ' + (14 - item.team[0].cards[3].maxLevel + item.team[0].cards[3].level)}</Text>
                            </View>
                            <View style = {{ flexDirection: 'row', marginTop: 5 }}>
                                <Image
                                    style = {styles.cardImagesMy}
                                    source = {{ uri: item.team[0].cards[4].iconUrls.medium }}
                                />
                                <Image
                                    style = {styles.cardImagesMy}
                                    source = {{ uri: item.team[0].cards[5].iconUrls.medium }}
                                />
                                <Image
                                    style = {styles.cardImagesMy}
                                    source = {{ uri: item.team[0].cards[6].iconUrls.medium }}
                                />
                                <Image
                                    style = {styles.cardImagesMy}
                                    source = {{ uri: item.team[0].cards[7].iconUrls.medium }}
                                />
                            </View>
                            <View style = {{ flexDirection: 'row' }}>
                                <Text style = {styles.levelCardsMy}>{'Lvl ' + (14 - item.team[0].cards[4].maxLevel + item.team[0].cards[4].level)}</Text>
                                <Text style = {styles.levelCardsMy}>{'Lvl ' + (14 - item.team[0].cards[5].maxLevel + item.team[0].cards[5].level)}</Text>
                                <Text style = {styles.levelCardsMy}>{'Lvl ' + (14 - item.team[0].cards[6].maxLevel + item.team[0].cards[6].level)}</Text>
                                <Text style = {styles.levelCardsMy}>{'Lvl ' + (14 - item.team[0].cards[7].maxLevel + item.team[0].cards[7].level)}</Text>
                            </View>
                        </View>
                        <View style = {styles.opponentDeck}>
                            <View style = {{ flexDirection: 'row' }}>
                                <Image
                                    style = {styles.cardImagesOpp}
                                    source = {{ uri: item.opponent[0].cards[0].iconUrls.medium }}
                                />
                                <Image
                                    style = {styles.cardImagesOpp}
                                    source = {{ uri: item.opponent[0].cards[1].iconUrls.medium }}
                                />
                                <Image
                                    style = {styles.cardImagesOpp}
                                    source = {{ uri: item.opponent[0].cards[2].iconUrls.medium }}
                                />
                                <Image
                                    style = {styles.cardImagesOpp}
                                    source = {{ uri: item.opponent[0].cards[3].iconUrls.medium }}
                                />
                            </View>
                            <View style = {{ flexDirection: 'row',alignItems: 'flex-end' }}>
                                <Text style = {styles.levelCardsOpp}>{'Lvl ' + (14 - item.opponent[0].cards[0].maxLevel + item.opponent[0].cards[0].level)}</Text>
                                <Text style = {styles.levelCardsOpp}>{'Lvl ' + (14 - item.opponent[0].cards[1].maxLevel + item.opponent[0].cards[1].level)}</Text>
                                <Text style = {styles.levelCardsOpp}>{'Lvl ' + (14 - item.opponent[0].cards[2].maxLevel + item.opponent[0].cards[2].level)}</Text>
                                <Text style = {styles.levelCardsOpp}>{'Lvl ' + (14 - item.opponent[0].cards[3].maxLevel + item.opponent[0].cards[3].level)}</Text>
                            </View>
                            <View style = {{ flexDirection: 'row', marginTop: 5 }}>
                                <Image
                                    style = {styles.cardImagesOpp}
                                    source = {{ uri: item.opponent[0].cards[4].iconUrls.medium }}
                                />
                                <Image
                                    style = {styles.cardImagesOpp}
                                    source = {{ uri: item.opponent[0].cards[5].iconUrls.medium }}
                                />
                                <Image
                                    style = {styles.cardImagesOpp}
                                    source = {{ uri: item.opponent[0].cards[6].iconUrls.medium }}
                                />
                                <Image
                                    style = {styles.cardImagesOpp}
                                    source = {{ uri: item.opponent[0].cards[7].iconUrls.medium }}
                                />
                            </View>
                            <View style = {{ flexDirection: 'row',alignItems: 'flex-end' }}>
                                <Text style = {styles.levelCardsOpp}>{'Lvl ' + (14 - item.opponent[0].cards[4].maxLevel + item.opponent[0].cards[4].level)}</Text>
                                <Text style = {styles.levelCardsOpp}>{'Lvl ' + (14 - item.opponent[0].cards[5].maxLevel + item.opponent[0].cards[5].level)}</Text>
                                <Text style = {styles.levelCardsOpp}>{'Lvl ' + (14 - item.opponent[0].cards[6].maxLevel + item.opponent[0].cards[6].level)}</Text>
                                <Text style = {styles.levelCardsOpp}>{'Lvl ' + (14 - item.opponent[0].cards[7].maxLevel + item.opponent[0].cards[7].level)}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={list}
                renderItem={renderItem}
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
    card: {
        //borderTopWidth: 1,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },
    result: {
        flexDirection: 'row',
        marginTop: 10,
    },
    crownsImgL: {
        width: 20,
        height: 15,
        marginRight: 10,
    },
    crownsImgR: {
        width: 20,
        height: 15,
        marginLeft: 10,
    },
    myInfo: {
        alignItems: 'flex-start',
        width: '50%',
        paddingLeft: 15,
        paddingTop: 5,
    },
    opponentInfo: {
        alignItems: 'flex-end',
        width: '50%',
        paddingRight: 15,
        paddingTop: 5,
    },
    winStyle: {
        height: 2,
        width: '100%',
        backgroundColor: 'blue',
    },
    loseStyle: {
        height: 2,
        width: '100%',
        backgroundColor: 'red',
    },
    tieStyle: {
        height: 2,
        width: '100%',
        backgroundColor: 'grey',
    },
    trophies: {
        height: 25,
        backgroundColor: '#DADADA',
        borderRadius: 10,
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    trophiesText: {
        fontSize: 12,
    },
    myDeck: {
        flexDirection: 'column',
        width: '50%',
        marginLeft: 5,
    },
    opponentDeck: {
        flexDirection: 'column',
        width: '50%',
        alignItems: 'flex-end',
        marginRight: 5,
    },
    cardImagesMy: {
        height: 50,
        width: '23%',
        marginLeft: '1%',
    },
    cardImagesOpp: {
        height: 50,
        width: '23%',
        marginRight: '1%',
    },
    levelCardsMy: {
        fontSize: 8,
        width:'23%',
        textAlign: 'center',
        marginLeft: '1%',
    },
    levelCardsOpp: {
        fontSize: 8,
        width:'23%',
        textAlign: 'center',
        marginRight: '1%',
    },
});

export default BattleLog;