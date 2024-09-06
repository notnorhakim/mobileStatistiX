import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Button, StyleSheet, Modal, Alert } from 'react-native';
import { categories } from '../subCategories.js';
import { getCountryIndicator } from '../../services/api.js';

function Insights({ navigation }) {
  const [countryInput, setCountryInput] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [mainCategory, setMainCategory] = useState('');
  const [indicator, setIndicator] = useState('');
  const [countries, setCountries] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [activePicker, setActivePicker] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://api.worldbank.org/v2/country?format=json&per_page=300');
        const data = await response.json();
        if (data && data[1]) {
          setCountries(data[1].map(country => ({ label: country.name, value: country.id })));
        } else {
          console.error('Unexpected response format:', data);
        }
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (countryInput.length > 0) {
      const filtered = countries.filter(country =>
        country.label.toLowerCase().includes(countryInput.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries([]);
    }
  }, [countryInput, countries]);

  useEffect(() => {
    if (mainCategory) {
      setSubCategories(categories[mainCategory].subCategories);
      setIndicator(''); // Reset indicator when main category changes
    }
  }, [mainCategory]);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setCountryInput(country.label);
    setFilteredCountries([]);
  };

  const openModal = (pickerType) => {
    setActivePicker(pickerType);
    setModalVisible(true);
  };

  const handleSelection = (itemValue) => {
    if (activePicker === 'mainCategory') {
      setMainCategory(itemValue);
    } else if (activePicker === 'indicator') {
      setIndicator(itemValue);
    }
    setModalVisible(false);
  };

  const renderPickerItems = () => {
    let items = [];
    if (activePicker === 'mainCategory') {
      items = Object.keys(categories).map(key => ({ label: categories[key].label, value: key }));
    } else if (activePicker === 'indicator') {
      items = subCategories;
    }

    return (
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.modalItem}
            onPress={() => handleSelection(item.value)}
          >
            <Text style={styles.modalItemText}>{item.label}</Text>
          </TouchableOpacity>
        )}
      />
    );
  };

  const handleSubmit = async () => {
    if (!selectedCountry || !mainCategory || !indicator) {
      let missingFields = [];
  
      if (!selectedCountry) missingFields.push('Country');
      if (!mainCategory) missingFields.push('Category');
      if (!indicator) missingFields.push('Indicator');
  
      Alert.alert("Error", `Please select: ${missingFields.join(', ')}`);
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await getCountryIndicator(selectedCountry.value, indicator);
      
      setLoading(false);
      console.log(response);
      if (!response || response.length === 0) {
        console.log("Error", "No data available for the selected country and indicator.");
        Alert.alert("Error", "No data available for the selected country and indicator.");
        return;
      }
  
      const nonNullValuesCount = response.filter(entry => entry.value !== null && entry.value !== undefined).length;
      console.log("Number of entries with non-null values:", nonNullValuesCount);
  
      if (nonNullValuesCount < 5) {
        console.log("Error", "No data available for the selected country and indicator.");
        Alert.alert("Error", "No data available for the selected country and indicator.");
      } else {
        navigation.navigate('InsightsResults', { data: response })
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
      Alert.alert("Error", "An error occurred while fetching data. Please try again.");
    }
  };


  

  const isButtonDisabled = !selectedCountry || !mainCategory || !indicator || loading;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Country Insights</Text>

      <Text style={styles.label}>Type Country to Select:</Text>
      <TextInput
        style={styles.input}
        value={countryInput}
        onChangeText={setCountryInput}
        placeholder="Start typing a country..."
      />
      {filteredCountries.length > 0 && (
        <FlatList
          data={filteredCountries}
          keyExtractor={(item) => item.value}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleCountrySelect(item)}>
              <Text style={styles.suggestion}>{item.label}</Text>
            </TouchableOpacity>
          )}
          style={styles.suggestionsContainer}
        />
      )}

      <Text style={styles.label}>Select Category:</Text>
      <TouchableOpacity style={styles.pickerButton} onPress={() => openModal('mainCategory')}>
        <Text>{mainCategory ? categories[mainCategory].label : 'Select a category...'}</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Select Indicator:</Text>
      <TouchableOpacity
        style={styles.pickerButton}
        onPress={() => openModal('indicator')}
        disabled={!mainCategory}
      >
      <Text>{indicator ? subCategories.find(i => i.value === indicator)?.label : 'Select an indicator...'}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, isButtonDisabled && styles.buttonDisabled]}
        onPress={() => {
          if (isButtonDisabled) {
            let missingFields = [];
            if (!selectedCountry) missingFields.push('Country(Tap to select)');
            if (!mainCategory) missingFields.push('Category');
            if (!indicator) missingFields.push('Indicator');

            alert(`Missing Fields: ${missingFields.join(', ')}`);
          } else {
            handleSubmit();
          }
        }}
            >
        <Text style={styles.buttonText}>Get Data</Text>
      </TouchableOpacity>


      {loading && <Text>Loading...</Text>}

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select an option</Text>
          {renderPickerItems()}
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
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
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 16,
  },
  suggestionsContainer: {
    maxHeight: 150,
  },
  suggestion: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  pickerButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 4,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#6200ea',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: 'grey',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
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

export default Insights;
