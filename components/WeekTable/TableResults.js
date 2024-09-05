import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const LifeExpectancyGraphic = ({ route }) => {
  const { daysAlive, lifeExpectancy } = route.params;

  // Calculate weeks lived and total life expectancy in weeks
  const weeksAlive = Math.floor(daysAlive / 7);
  const totalWeeksLifeExpectancy = Math.floor(lifeExpectancy * 52); // 52 weeks per year
  const weeksRemaining = totalWeeksLifeExpectancy - weeksAlive;

  // Calculate the mid-life point in weeks
  const midLifeWeek = Math.floor(totalWeeksLifeExpectancy / 2);

  // Render each week as a box (one per week)
  const renderWeek = ({ index }) => {
    let backgroundColor;
    
    if (index < weeksAlive) {
      backgroundColor = 'blue'; // Lived weeks
    } else if (index === midLifeWeek) {
      backgroundColor = 'red'; // Mid-life indicator
    } else {
      backgroundColor = 'lightgray'; // Remaining weeks
    }

    return <View style={[styles.weekSquare, { backgroundColor }]} />;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Life in Weeks</Text>
      {/* Brief description below the title */}
      <Text style={styles.description}>
        Each row in the graphic represents one year, and each box represents a week.
        The blue boxes indicate the weeks you have already lived, the red box marks the midpoint of your life, and the gray boxes show the weeks remaining based on your life expectancy.
      </Text>

      {/* Render grid with 52 columns, representing one row per year */}
      <FlatList
        data={Array(totalWeeksLifeExpectancy).fill(0)}
        renderItem={renderWeek}
        keyExtractor={(item, index) => index.toString()}
        numColumns={52} // Set 52 weeks per row (1 year)
      />
      <Text style={styles.statsText}>Weeks Lived: {weeksAlive}</Text>
      <Text style={styles.statsText}>Weeks Remaining: {weeksRemaining}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20, // Space below the description before the grid
  },
  weekSquare: {
    width: 10, // Adjust the size based on your preference
    height: 10, // Adjust the size based on your preference
    margin: 1,
  },
  statsText: {
    marginTop: 16,
    fontSize: 16,
  },
});

export default LifeExpectancyGraphic;
