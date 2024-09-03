// src/components/Home.js
import React from 'react';
import { View, Text, Button } from 'react-native';

function Home({ navigation }) {
  return (
    <View>
      <Text>Welcome to GraphX</Text>
      <Button title="Go to Insights" onPress={() => navigation.navigate('Insights')} />
    </View>
  );
}

export default Home;
