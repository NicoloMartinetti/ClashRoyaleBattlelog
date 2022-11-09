import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import  BottomStack from "./navigation/BottomStack";

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <BottomStack />
    </NavigationContainer>
  );
}

export default AppNavigation;