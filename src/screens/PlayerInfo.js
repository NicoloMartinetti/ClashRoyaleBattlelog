import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

const apiToken = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjkzMGVlODM5LTc4MmQtNDAzZi1iZDA2LWY4OTQ5MWQ1NjcwMiIsImlhdCI6MTY2NzM4MzA3MCwic3ViIjoiZGV2ZWxvcGVyLzcxZjI1YmUxLWQ4OGEtNGQwZi1lMDNlLTY4M2VkOTQ4NTYzNSIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI5My4xNDYuMjI3LjIxMyJdLCJ0eXBlIjoiY2xpZW50In1dfQ.mFF4rafx57RsogbYS71HUwq8vv5SLc-Zc8rAdgLn3mp-Sm-xpC4dkg6KaajDcD2dYnEEXmHs0FPfCGO0Oow2Dg';

export const PlayerInfo = ({ navigation }) => {
    return(
        <SafeAreaView style={styles.container}>
            <Text>CIAO</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        marginTop: 50,
    },
});

export default PlayerInfo;