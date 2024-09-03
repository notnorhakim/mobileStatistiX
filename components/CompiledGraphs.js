import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { formatNumberWithCommas, findNextValue } from './GraphPage';


const CompiledGraphs = ({ route }) => {
  const { graphs } = route.params;


  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Display the indicator name once at the top */}
      <Text style={styles.indicatorText}>{graphs[0].data[0].indicator.value}</Text>
      
      <View style={styles.graphsContainer}>
        {graphs.map((graphData, index) => (
          <View key={index} style={styles.graphWrapper}>
            <Text style={styles.countryText}>{graphData.data[0].country.value}</Text>
            <Text style={styles.countryText}>Latest: {findNextValue(graphData.data)}</Text>
            <LineChart
              data={{
                labels: graphData.data.map(item => item.date).reverse(),
                datasets: [
                  {
                    data: graphData.data.map(item => item.value).reverse(),
                  },
                ],
              }}
              width={Dimensions.get('window').width / 2 - 40}  // Adjust the width to fit the screen
              height={200}
              chartConfig={chartConfig}
              style={styles.chartStyle}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const chartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 0,  // No decimals
  color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,  // Blue lines
  labelColor: () => `rgba(0, 0, 0, 0)`,  // Make axis labels invisible
  propsForDots: {
    r: '0',  // Set radius to 0 to hide dots
  },
  strokeWidth: 2,  // Set the stroke width for the line
  propsForBackgroundLines: {
    stroke: 'transparent',  // Hide background grid lines
  },
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    alignItems: 'center',
  },
  graphsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',  // Allow wrapping to next line for multiple graphs
    justifyContent: 'space-between',  // Space between columns
  },
  graphWrapper: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 20,
    backgroundColor: '#f9f9f9',
    width: Dimensions.get('window').width / 2 - 24,  // Adjust width to fit two graphs side by side
  },
  indicatorText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  countryText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
  },
  chartStyle: {
    marginVertical: 10,
    borderRadius: 10,
  },
});

export default CompiledGraphs;
