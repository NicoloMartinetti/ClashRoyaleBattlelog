import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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
          title: 'BattleLog',
        }}
        name="BattleLog"
        component={BattleLogStack}
      />
      <Tab.Screen
        options= {{
          title: 'PlayerInfo',
        }}
        name="PlayerInfo"
        component={PlayerInfoStack}
      />
    </Tab.Navigator>
  );
}

export default BottomStack;