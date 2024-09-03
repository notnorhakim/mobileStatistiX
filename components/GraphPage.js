import React, { useState } from 'react';
import { View, Dimensions, StyleSheet, ScrollView, Text, Button, Modal, TouchableOpacity, FlatList } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { getCountryIndicator } from '../services/api';  // Adjust the path if necessary

export const formatNumberWithCommas = (number) => {
    if (number === null || number === undefined) { //number contains decimal
      return '0';
    } else if (number % 1 !== 0) {
      return number.toFixed(2); 
    } else {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    
};
export const findNextValue = (data) => {
    for (let i = 0; i < data.length; i++) {
        if (data[i].value !== null && data[i].value !== undefined) {
            console.log(data[i].value);
            return data[i].value;
        }
    }
    return null; // Return null if no valid value is found
};

const GraphPage = ({ route, navigation }) => {
  const { data } = route.params;
  const [graphs, setGraphs] = useState([{ data }]);
  const [modalVisible, setModalVisible] = useState(false);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');

  const addGraph = async () => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://api.worldbank.org/v2/country?format=json&per_page=300');
        const data = await response.json();
        if (data && data[1]) {
          setCountries(data[1].map(country => ({ label: country.name, value: country.id })));
          setModalVisible(true);
        } else {
          console.error('Unexpected response format:', data);
        }
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    fetchCountries();
  };

  const handleCountrySelect = async (countryCode) => {
    setModalVisible(false);
    setSelectedCountry(countryCode);
    try {
      const response = await getCountryIndicator(countryCode, data[0].indicator.id);
      
      // Check if there is data available
      if (response && response.length > 0) {
        setGraphs([...graphs, { data: response }]);
      } else {
        alert('No data available for the selected country.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('An error occurred while fetching data.');
    }
};


  const renderPickerItems = () => {
    return (
      <FlatList
        data={countries}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.modalItem}
            onPress={() => handleCountrySelect(item.value)}
          >
            <Text style={styles.modalItemText}>{item.label}</Text>
          </TouchableOpacity>
        )}
      />
    );
  };

  const handleCompileGraphs = () => {
    navigation.navigate('CompiledGraphs', { graphs });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.indicatorText}>{data[0].indicator.value}</Text>
      {graphs.map((graphData, index) => (
        <View key={index} style={styles.graphContainer}>
          <Text style={styles.countryText}>
          {graphData.data[0].country.value}'s Latest: {formatNumberWithCommas(findNextValue(graphData.data))}
          </Text>
          <ScrollView horizontal={true}>
            <LineChart
              data={{
                labels: graphData.data.map(item => item.date).reverse(),
                datasets: [
                  {
                    data: graphData.data.map(item => item.value).reverse(),
                  },
                ],
              }}
              width={Dimensions.get('window').width * 4} // Make the graph wider than the screen for scrolling
              height={200}
              chartConfig={chartConfig}
              style={{
                ...styles.chartStyle,
                marginLeft: 10, // Add this to create more space for y-axis labels
              }}
            />
          </ScrollView>
        </View>
      ))}
      <View style={styles.buttonContainer}>
        <Button 
          title="Add Another Graph" 
          onPress={addGraph} 
          color="#841584" // Example color
        />
        <Button 
          title="Compile Graphs"
          onPress={() => navigation.navigate('CompiledGraphs', { graphs })}
          color="#841584"
        />
      </View>
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select a Country</Text>
          {renderPickerItems()}
        <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </ScrollView>
  );
};

const chartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
  xAxisLabelRotation: 45, // Rotate the x-axis labels to avoid overlap
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    borderWidth: 2,
    borderColor: 'green',
    paddingBottom: 30, // Add padding to avoid overlap with navigation buttons
  },
  buttonContainer: {
    marginBottom: 50, // Ensure the buttons are not at the very bottom
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  graphContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  chartStyle: {
    marginVertical: 16,
    borderRadius: 10,
  },
  indicatorText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  countryText: {
    fontSize: 18,
    textAlign: 'left',
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  modalItemText: {
    fontSize: 18,
  },
});

export default GraphPage;
