import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import PlayerInfoStack from './PlayerInfoStack';
import BattleLogStack from './BattleLogStack';

const Tab = createBottomTabNavigator();

export const BottomStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'black',
      }}>
      <Tab.Screen
        options= {{
          title: 'PlayerInfo',
          tabBarIcon: ({ color }) => (
            <Entypo name="info" size={24} color={color} />
          ),
        }}
        name="PlayerInfo"
        component={PlayerInfoStack}
      />
      <Tab.Screen
        options= {{
          title: 'BattleLog',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="sword-cross" size={24} color={color} />
          ),
        }}
        name="BattleLog"
        component={BattleLogStack}
      />
    </Tab.Navigator>
  );
}

export default BottomStack;