import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {CharacterDetailScreen} from '../screens/CharacterDetailScreen';

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="CharacterDetail" component={CharacterDetailScreen} />
  </Stack.Navigator>
);

export default AppNavigator;
