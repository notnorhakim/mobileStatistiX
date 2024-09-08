import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Button, StyleSheet, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getLifeExpectancy, getTotalLifeExpectancy } from '../Discover/statsAPI'; 
import { calculateDaysAlive } from '../Discover/DiscoverForm'; 
import { useNavigation } from '@react-navigation/native'; 





function DiscoverBirthdate() {


  const navigation = useNavigation(); // Access navigation

  const [birthdate, setBirthdate] = useState(new Date()); 
  const [showDatePicker, setShowDatePicker] = useState(false); // Control visibility of the Date Picker
  const [countryInput, setCountryInput] = useState(''); 
  const [filteredCountries, setFilteredCountries] = useState([]); 
  const [selectedCountry, setSelectedCountry] = useState(''); 
  const [countries, setCountries] = useState([]); // List of countries
  const [selectedGender, setSelectedGender] = useState(''); // Selected gender
  const [genderModalVisible, setGenderModalVisible] = useState(false); // Control gender modal visibility
  const [lifeExpectancy, setLifeExpectancy] = useState(null); 
  const [stats, setStats] = useState(null); 

  // List of gender options
  const genders = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://api.worldbank.org/v2/country?format=json&per_page=300');
        const data = await response.json();
        if (data && data[1]) {
          setCountries(data[1].map(country => ({ label: country.name, value: country.id })));
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

  const handleCountrySelect = (country) => {
    setSelectedCountry(country.label);
    setCountryInput(country.label);
    setFilteredCountries([]);
  };

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender.label);
    setGenderModalVisible(false);
  };

  const openGenderModal = () => {
    setGenderModalVisible(true);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || birthdate;
    setShowDatePicker(false);
    setBirthdate(currentDate);
  };

  const handleDiscover = async () => {
    if (!birthdate || !selectedCountry || !selectedGender) {
      alert('Please enter your birthdate, select a country, and select a gender.');
      return;
    }

    try {
      // Format birthdate to a string in YYYY-MM-DD format
      const formattedBirthdate = birthdate.toISOString().split('T')[0];
   
      // Calculate the number of days the user has been alive
      const daysAlive = calculateDaysAlive(formattedBirthdate);
      // Fetch life expectancy using the selected gender and country
      const lifeExpectancyData = await getTotalLifeExpectancy(selectedGender, selectedCountry, formattedBirthdate);
      const lifeExpectancyNumber = parseFloat(lifeExpectancyData.totalLifeExpectancy.replace(' years', ''));


      setLifeExpectancy(lifeExpectancyNumber);




      // Set the combined statistics
      const combinedStats = {
        daysAlive,
        lifeExpectancy: lifeExpectancy
      };

      setStats(combinedStats);

      // Navigate to the LifeExpectancyGraphic page and pass the stats
      navigation.navigate('TableResults', {
        daysAlive: daysAlive,
        lifeExpectancy: lifeExpectancyNumber,
      });


    } catch (error) {
      console.error('Error calculating or fetching data:', error);
      alert('Error fetching data. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Visualize Your Life In Weeks</Text>

      {/* Button to open the date picker */}
      <Text style={styles.label}>Select Date of Birth:</Text>

      <TouchableOpacity style={styles.datePickerButton} onPress={showDatepicker}>
        <Text>{birthdate ? birthdate.toDateString() : 'Select Birthdate'}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={birthdate}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}

      {/* Country input */}
      <Text style={styles.label}>Select Country:</Text>
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

      {/* Gender Input */}
      <Text style={styles.label}>Select Gender:</Text>
      <TouchableOpacity style={styles.pickerButton} onPress={openGenderModal}>
        <Text>{selectedGender || 'Select Gender'}</Text>
      </TouchableOpacity>

      {/* Gender Selection Modal */}
      <Modal
        visible={genderModalVisible}
        animationType="slide"
        onRequestClose={() => setGenderModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select Gender</Text>
          <FlatList
            data={genders}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleGenderSelect(item)}>
                <Text style={styles.modalItemText}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        <TouchableOpacity style={styles.button} onPress={() => setGenderModalVisible(false)}>
            <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
        </View>
      </Modal>

      {/* Button to trigger calculation and API fetching */}
      <TouchableOpacity style={styles.button} onPress={handleDiscover}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      {/* Display calculated stats */}
      {stats && (
        <View style={styles.resultContainer}>
          <Text>Total Days Alive: {stats.daysAlive}</Text>
          <Text>Life Expectancy: {stats.lifeExpectancy}</Text>
          
        </View>
      )}

      {!stats && <Text>Please enter your information to discover your life expectancy.</Text>}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  datePickerButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    marginBottom: 16,
    alignItems: 'center',
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
  modalItemText: {
    fontSize: 18,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  resultContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#6200ea',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default DiscoverBirthdate;
