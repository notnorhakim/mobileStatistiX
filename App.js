import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View  } from 'react-native';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Insights from './components/Insights';
import Home from './components/Home';
import InsightsResults from './components/InsightsResults';  // Import the new results component
import GraphPage from './components/GraphPage';  // Import the new graph component
import CompiledGraphs from './components/CompiledGraphs';  // Import the new compiled graphs component

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Insights" component={Insights} />
        <Stack.Screen name="InsightsResults" component={InsightsResults} /> 
        <Stack.Screen name="GraphPage" component={GraphPage} />
        <Stack.Screen name="CompiledGraphs" component={CompiledGraphs} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
