import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigationProp, createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login/Login';
import Home from '../screens/Home/Home';
import StudentDetail from '../screens/Detail/StudentDetail';

export type RootStackParamList = {
  Login: undefined;
  Home: {id: string};
  StudentDetail: {parentId: string; studentId: string};
};

export type NavigationScreenProps<K extends keyof RootStackParamList> = StackNavigationProp<RootStackParamList, K>;

const RootStack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="Login" component={Login} />
        <RootStack.Screen name="Home" component={Home} />
        <RootStack.Screen name="StudentDetail" component={StudentDetail} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
