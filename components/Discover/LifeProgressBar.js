import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const parseLifeExpectancy = (lifeExpectancyString) => {
    return parseFloat(lifeExpectancyString.replace(' years', '')); // Remove ' years' and convert to float
  };

const SimpleLineBar = ({ age, totalLifeExpectancy }) => {
  // Calculate the percentage of life passed

  const lifePassedPercentage = (age / parseLifeExpectancy(totalLifeExpectancy)) * 100;

  return (
    <View style={styles.container}>
      {/* The progress bar container */}
      <View style={styles.progressBar}>
        {/* The filled portion showing the life passed */}
        <View style={[styles.filledBar, { width: `${lifePassedPercentage}%` }]} />
      </View>

      {/* Display the percentage as text */}
      <Text>{lifePassedPercentage.toFixed(2)}% of life has passed.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  progressBar: {
    height: 20,
    width: '100%',
    backgroundColor: '#E0E0E0', // Gray background for the unfilled portion
    borderRadius: 10,
    overflow: 'hidden',
  },
  filledBar: {
    height: '100%',
    backgroundColor: '#6200ea', // Blue color for the filled part
  },
});

export default SimpleLineBar;
