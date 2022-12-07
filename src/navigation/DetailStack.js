import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Detail from '../screens/Detail';

const Stack = createNativeStackNavigator();

export const DetailStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="Detail" component={Detail} />
        </Stack.Navigator>
    );
};

export default Detail;