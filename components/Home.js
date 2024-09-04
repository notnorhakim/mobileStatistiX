// src/components/Home.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to GraphX</Text>
      
      <TouchableOpacity 
        style={styles.card} 
        onPress={() => navigation.navigate('Insights')}
      >
        <Text style={styles.cardText}>Go to Insights</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.card} 
        onPress={() => navigation.navigate('DiscoverForm')}
      >
        <Text style={styles.cardText}>Discover Statistics About You</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.card} 
        onPress={() => navigation.navigate('ExperimentInput')}
      >
        <Text style={styles.cardText}>Experiment with Input</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.card} 
        onPress={() => navigation.navigate('FutureFeature')}
      >
        <Text style={styles.cardText}>Future Feature</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    width: '80%',
    padding: 20,
    backgroundColor: '#6200ea',
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  cardText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Home;
