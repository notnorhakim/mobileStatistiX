import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';

// Get the width of the screen
const screenWidth = Dimensions.get('window').width;

// Define the size of each week square
const WEEK_SQUARE_SIZE = 10; // Adjust as needed
const WEEK_SQUARE_MARGIN = 1; // Margin between squares

// Calculate how many squares can fit in one row based on screen width
const numColumns = Math.floor(screenWidth / (WEEK_SQUARE_SIZE + WEEK_SQUARE_MARGIN * 2));

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
    let label = null;
    let textColor = 'black'; 
    let borderColor = 'transparent'; // Default border color is transparent

    // Determine background color based on lived or remaining weeks
    if (index < weeksAlive) {
      backgroundColor = 'blue'; // Lived weeks
      textColor = 'white'; // White text for blue boxes (lived weeks)
    } else if (index === midLifeWeek) {
      backgroundColor = 'red'; // Mid-life indicator
    } else {
      backgroundColor = 'lightgray'; // Remaining weeks
    }

    // Add the year number inside the first week's box for every year (e.g., 0, 52, 104, etc.)
    if (index % 52 === 0) {
      label = (index / 52).toString(); // Display the year inside the box
      borderColor = 'black'; // Apply black border only to the year indicator
    }

    return (
      <View style={[styles.weekSquare, { backgroundColor, borderColor }]}>
        {label && <Text style={[styles.yearText, { color: textColor }]}>{label}</Text>}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Life in Weeks</Text>
      {/* Brief description below the title */}
      <Text style={styles.description}>
        The graphic below shows your life in weeks.
        The blue boxes represent weeks you have lived, the red box marks the midpoint of your life, 
        and the gray boxes show the remaining weeks based on your life expectancy. 
        The number in the box indicates the year. 
      </Text>

      {/* Render grid with dynamic columns based on screen width */}
      <FlatList
        data={Array(totalWeeksLifeExpectancy).fill(0)}
        renderItem={renderWeek}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns} 
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}
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
    marginBottom: 20,
  },
  weekSquare: {
    width: WEEK_SQUARE_SIZE,
    height: WEEK_SQUARE_SIZE,
    margin: WEEK_SQUARE_MARGIN,
    justifyContent: 'center',
    alignItems: 'center',
  },
  yearText: {
    fontSize: 8,
  },
  statsText: {
    marginTop: 16,
    fontSize: 16,
  },
});

export default LifeExpectancyGraphic;
