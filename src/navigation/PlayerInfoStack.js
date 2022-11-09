import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import PlayerInfo from '../screens/PlayerInfo';

const Stack = createNativeStackNavigator();

export const PlayerInfoStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="PlayerInfo" component={PlayerInfo} />
        </Stack.Navigator>
    );
};

export default PlayerInfoStack;