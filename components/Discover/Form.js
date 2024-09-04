// src/components/DiscoverStatistics.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

function DiscoverStatistics() {
  const [age, setAge] = useState('');
  const [country, setCountry] = useState('');
  const [gender, setGender] = useState('');
  const [income, setIncome] = useState('');
  const [statistics, setStatistics] = useState(null);

  const handleDiscover = () => {
    // Simulate calculating some statistics based on user input
    const calculatedStats = {
      lifeExpectancy: 82, // Replace with dynamic calculation or data fetching
      averageIncome: 50000, // Based on user's country and demographic
    };
    setStatistics(calculatedStats);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discover Statistics About You</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your country"
        value={country}
        onChangeText={setCountry}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your gender"
        value={gender}
        onChangeText={setGender}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your income"
        keyboardType="numeric"
        value={income}
        onChangeText={setIncome}
      />

      <Button title="Discover" onPress={handleDiscover} />

      {statistics && (
        <View style={styles.resultContainer}>
          <Text>Your Estimated Life Expectancy: {statistics.lifeExpectancy} years</Text>
          <Text>Average Income in {country}: {statistics.averageIncome}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 16,
  },
  resultContainer: {
    marginTop: 20,
  },
});

export default DiscoverStatistics;
