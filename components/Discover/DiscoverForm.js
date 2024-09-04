import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Button, StyleSheet, ScrollView, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';



// Helper function to calculate moon orbits, total days alive, etc.
const calculateDaysAlive = (birthdate) => {
    
    const birthDateObj = new Date(birthdate);
  
    if (isNaN(birthDateObj.getTime())) {
      return 'Invalid date';
    }
  
    const today = new Date();
    const daysAlive = Math.floor((today - birthDateObj) / (1000 * 60 * 60 * 24));
  
    return daysAlive;
};
  
// Helper function to calculate heartbeats and breaths
const calculateHeartbeatsAndBreaths = (birthdate) => {
    const daysAlive = calculateDaysAlive(birthdate);

    if (daysAlive < 0) {
        return { heartbeats: 'Invalid number of days', breaths: 'Invalid number of days' };
    }

    const averageHeartRate = 70; // Average 70 beats per minute
    const averageBreathsPerMinute = 16; // Average 16 breaths per minute

    const heartbeats = daysAlive * 24 * 60 * averageHeartRate;
    const breaths = daysAlive * 24 * 60 * averageBreathsPerMinute;


    return { heartbeats, breaths };
};
  
  // Helper function to calculate age in years, months, and days
const calculateAge = (birthdate) => {
    // Split the birthdate in the format YYYY-MM-DD
    const [year, month, day] = birthdate.split('-');
    
    // Create a Date object using the year, month (subtract 1 because months are zero-indexed), and day
    const birthDateObj = new Date(year, month - 1, day);
  
    if (isNaN(birthDateObj.getTime())) {
      return { years: 'Invalid date', months: '', days: '' };
    }
  
    const today = new Date();
    let years = today.getFullYear() - birthDateObj.getFullYear();
    let months = today.getMonth() - birthDateObj.getMonth();
    let days = today.getDate() - birthDateObj.getDate();
  
    // Adjust the months and days if necessary
    if (days < 0) {
      months -= 1;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }
  
    return { years, months, days };
  };
  
  
    // Helper function to calculate upcoming day milestones
    const calculateUpcomingMilestone = (birthdate, milestones = [10000, 20000, 30000]) => {
        const birthDateObj = new Date(birthdate); // Use the birthdate directly to create a Date object
        if (isNaN(birthDateObj.getTime())) {
            return 'Invalid date';
        }

        const upcomingMilestones = milestones.map(milestone => {
            const milestoneDate = new Date(birthDateObj);
            milestoneDate.setDate(milestoneDate.getDate() + milestone); // Properly add days to the date
            return { milestone, date: milestoneDate };
        });

        return upcomingMilestones;
    };
  
  
  // API to fetch world population at birth year
  const getWorldPopulationAtBirth = async (birthYear) => {
    try {
      const response = await fetch(`https://api.worldbank.org/v2/country/WLD/indicator/SP.POP.TOTL?date=${birthYear}&format=json`);
      
      const data = await response.json();
      
      return data[1][0].value;
    } catch (error) {
      console.error('Error fetching world population at birth:', data[1][0].value);
      return null;
    }
  };
  
  // API to fetch world population for the current year
  const getCurrentWorldPopulation = async () => {
      try {
        const response = await fetch('https://get-population.p.rapidapi.com/population?year=2024', {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'get-population.p.rapidapi.com',
            'x-rapidapi-key': '3001e69a44mshe33657be1823330p1243c6jsnc632e533a816'
          },
        });
        const data = await response.json();
        return data.readable_format; // Assuming population is the key in the response data
      } catch (error) {
        console.error('Error fetching current world population:', error);
        return null;
      }
    };
    


function DiscoverBirthdate() {

  const [birthdate, setBirthdate] = useState(new Date()); // Store birthdate as a Date object
  const [showDatePicker, setShowDatePicker] = useState(false); // Control visibility of the Date Picker
  const [stats, setStats] = useState(null); // State to hold all calculated data
  const [countryInput, setCountryInput] = useState(''); // State for country search input
  const [filteredCountries, setFilteredCountries] = useState([]); // Filtered country list
  const [selectedCountry, setSelectedCountry] = useState(''); // Selected country
  const [countries, setCountries] = useState([]); // List of countries
  const [selectedGender, setSelectedGender] = useState(''); // Selected gender
  const [genderModalVisible, setGenderModalVisible] = useState(false); // Control gender modal visibility

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

    if (!birthdate || !selectedCountry) {
        alert('Please enter your birthdate and select a country.');
        return;
    }

    try {
        
        const birthYear = birthdate.getFullYear();
        const formattedBirthdate = birthdate.toISOString().split('T')[0];
        const daysAlive = calculateDaysAlive(formattedBirthdate);
        const { heartbeats, breaths } = calculateHeartbeatsAndBreaths(formattedBirthdate);
        const age = calculateAge(formattedBirthdate);
        const worldPopulationAtBirth = await getWorldPopulationAtBirth(birthYear);
        
        const currentWorldPopulation = await getCurrentWorldPopulation();
        
        const upcomingMilestones = calculateUpcomingMilestone(formattedBirthdate);
        
        

        const combinedStats = {
        daysAlive,
        heartbeats,
        breaths,
        age,
        worldPopulationAtBirth,
        currentWorldPopulation,
        upcomingMilestones,
        selectedCountry,
        };

        setStats(combinedStats);

    } catch (error) {
        console.error('Error calculating or fetching data:', error);
        alert('Error fetching data. Please try again.');
    }
};

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discover Your Data</Text>

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
          <Button title="Close" onPress={() => setGenderModalVisible(false)} />
        </View>
      </Modal>


      {/* Button to trigger calculation and API fetching */}
      <Button title="Submit" onPress={handleDiscover} />

      {stats && stats.age && (
        <View style={styles.resultContainer}>
        <Text>Age: {stats.age.years} years, {stats.age.months} months, and {stats.age.days} days</Text>
        <Text>Total Days Alive: {stats.daysAlive.toLocaleString()}</Text>
        <Text>Heartbeats: {stats.heartbeats.toLocaleString()}</Text>
        <Text>Breaths: {stats.breaths.toLocaleString()}</Text>
        <Text>World Population at Birth: {stats.worldPopulationAtBirth.toLocaleString()}</Text>
        <Text>Current World Population: {stats.currentWorldPopulation.toLocaleString()}</Text>
        <Text>Country: {stats.selectedCountry}</Text>
        <Text>Upcoming Milestones:</Text>
        {stats.upcomingMilestones.map((milestone, index) => (
          <Text key={index}>
            You will be {milestone.milestone.toLocaleString()} days old on {milestone.date.toDateString()}
          </Text>
        ))}
      </View>
      
      )}

      {!stats && (
        <Text>Please enter your birthdate and select a country to discover your stats.</Text>
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
    borderColor: 'red',
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
});

export default DiscoverBirthdate;
