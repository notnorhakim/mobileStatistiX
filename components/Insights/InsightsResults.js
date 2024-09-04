import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import InsightsDisplay from './InsightsDisplay';

const InsightsResults = ({ route, navigation }) => {
  const { data } = route.params;

  if (!data || data.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No data available.</Text>
      </View>
    );
  }

  const { indicator, country, countryiso3code } = data[0]; // Assuming all data entries share the same indicator and country

  return (
    <View style={styles.container}>
      {/* Display Indicator, Country, and Code */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Indicator: {indicator.value}</Text>
        <Text style={styles.headerText}>Country: {country.value}</Text>
        <Text style={styles.headerText}>Country Code: {countryiso3code}</Text>
      </View>

      {/* Add Buttons for Graph and Compare */}
      <View style={styles.buttonContainer}>
        <Button
          title="Detailed Graph"
          onPress={() => navigation.navigate('GraphPage', {
            data: data, 
            countryName: country.value, 
            indicatorName: indicator.value
          })}
        />

      </View>

      {/* Display the rest of the data */}
      <InsightsDisplay data={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
});

export default InsightsResults;
