import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import BattleLog from '../screens/BattleLog';

const Stack = createNativeStackNavigator();

export const BattleLogStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="BattleLog" component={BattleLog} />
        </Stack.Navigator>
    );
};

export default BattleLogStack;