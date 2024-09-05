import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Button, StyleSheet, ScrollView, Modal, Share} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getLifeExpectancy , getWorldPopulationRank, getTotalLifeExpectancy, calculateLifeStats} from './statsAPI';
import SimpleLineBar from './LifeProgressBar'; // Import the progress bar component




// Helper function to calculate moon orbits, total days alive, etc.
 export const calculateDaysAlive = (birthdate) => {
    
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
function calculateAge(birthdate) {
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
}
  
  
// Helper function to calculate upcoming day milestones, including quarter-life, half-life, 75%, and 100% milestones
export const calculateUpcomingMilestone = (birthdate, lifeExpectancyYears, milestones = [10000, 20000, 30000]) => {
  const birthDateObj = new Date(birthdate);
  if (isNaN(birthDateObj.getTime())) {
    return 'Invalid date';
  }

  const lifeExpectancy = parseFloat(lifeExpectancyYears.split(' ')[0]); // Extract the numerical part of life expectancy

  // Calculate life milestones (quarter-life, half-life, 75%, full-life)
  const quarterLifeYears = lifeExpectancy / 4;
  const halfLifeYears = lifeExpectancy / 2;
  const threeQuarterLifeYears = (lifeExpectancy * 3) / 4;
  const fullLifeYears = lifeExpectancy;

  // Calculate milestone dates
  const quarterLifeDate = new Date(birthDateObj);
  const halfLifeDate = new Date(birthDateObj);
  const threeQuarterLifeDate = new Date(birthDateObj);
  const fullLifeDate = new Date(birthDateObj);

  quarterLifeDate.setFullYear(quarterLifeDate.getFullYear() + quarterLifeYears);
  halfLifeDate.setFullYear(halfLifeDate.getFullYear() + halfLifeYears);
  threeQuarterLifeDate.setFullYear(threeQuarterLifeDate.getFullYear() + threeQuarterLifeYears);
  fullLifeDate.setFullYear(fullLifeDate.getFullYear() + fullLifeYears);

  // Calculate the other milestones (like 10,000 days, etc.)
  const upcomingMilestones = milestones.map(milestone => {
    const milestoneDate = new Date(birthDateObj);
    milestoneDate.setDate(milestoneDate.getDate() + milestone);
    return { milestone, date: milestoneDate };
  });

  // Add life milestones (quarter, half, 75%, full) to the list
  upcomingMilestones.push({ milestone: 'Quarter-Life  (25%)', date: quarterLifeDate });
  upcomingMilestones.push({ milestone: 'Mid-Life  (50%)', date: halfLifeDate });
  upcomingMilestones.push({ milestone: 'Three-Quarter-Life  (75%)', date: threeQuarterLifeDate });
  upcomingMilestones.push({ milestone: 'Death 💀 (100%)', date: fullLifeDate });

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
  
// Function to handle sharing the stats
const handleShareStats = (stats, userName) => {

   if (!userName) {
      alert("Please enter your name before sharing.");
      return;
    }

     // Debug: Log the username before sharing
     console.log("Username being shared:", userName);

   // Calculate the percentage of life passed
   const lifePassedPercentage = (stats.age.years / parseFloat(stats.totalLifeExpectancy.totalLifeExpectancy.replace(' years', ''))) * 100;
  
   // Generate a text-based progress bar
   const totalBlocks = 20; // Length of the progress bar in characters
   const filledBlocks = Math.round((lifePassedPercentage / 100) * totalBlocks);
   const emptyBlocks = totalBlocks - filledBlocks;
   const progressBar = '█'.repeat(filledBlocks) + '░'.repeat(emptyBlocks); // Text-based progress bar
  // Format the statistics into a readable string
  const shareableText = `
    Name: ${userName}
    Country: ${stats.selectedCountry}
    Age: ${stats.age.years} years, ${stats.age.months} months, and ${stats.age.days} days
    Total Days Alive: ${stats.daysAlive.toLocaleString()}
    Average Life Expectancy: ${stats.totalLifeExpectancy.totalLifeExpectancy}
    Remaining Life Expectancy: ${stats.lifeExpectancy.remainingLifeExpectancy}
    Progress Bar: [${progressBar}] \n 
    ${lifePassedPercentage.toFixed(2)}% of life has passed.
    No. of Heartbeats taken: ${stats.heartbeats.toLocaleString()}
    No. of Breaths taken: ${stats.breaths.toLocaleString()}
    World Population at Birth: ${stats.worldPopulationAtBirth.toLocaleString()}
    Current World Population: ${stats.currentWorldPopulation.toLocaleString()}
    Country Population Rank (Same Gender): # ${stats.worldPopulationRank}
    Eye Blinks: ${stats.calculatedLifeStats.eyeBlinks}
    Steps Taken: ${stats.calculatedLifeStats.stepsTaken}
    Sleep Time: ${stats.calculatedLifeStats.sleepTime} hours
    Screen Time: ${stats.calculatedLifeStats.screenTime} hours
    👇
    👇
    👇
    \n\nUpcoming Milestones:\n
    ${stats.upcomingMilestones.map(milestone => `
        ${milestone.milestone === 'Half-Life Milestone' ? 'Half of your life' : milestone.milestone.toLocaleString()} on ${milestone.date.toDateString()}
    `).join('')}
    `.replace(/\n\s+/g, '\n'); // Clean up extra spaces and newlines


  // Trigger the native share dialog
  Share.share({
    message: shareableText,
  })
  .then((result) => console.log(result))
  .catch((error) => console.log(error.message));
};

const ShareStatsComponent = ({ stats }) => {
  const [userName, setUserName] = useState(''); // State to store user's name

  return (
    <View style={styles.shareContainer}>
      {/* Text input to collect the user's name */}
      <TextInput
        style={styles.inputName}
        placeholder="Enter your name before sharing"
        value={userName}
        onChangeText={setUserName}
      />
   


      <Button title="Share Stats" onPress={() => handleShareStats(stats, userName)} />
    </View>
  );
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
        alert('Please enter your birthdate and select a country correctly.');
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
        
        
        
        const [ worldPopulationRank , lifeExpectancy, totalLifeExpectancy, calculatedLifeStats] = await Promise.all([
            getWorldPopulationRank(formattedBirthdate, selectedGender, selectedCountry),
            getLifeExpectancy(selectedGender, selectedCountry, formattedBirthdate, age.years),
            getTotalLifeExpectancy(selectedGender, selectedCountry, formattedBirthdate),
            calculateLifeStats(age, formattedBirthdate, selectedGender, selectedCountry),

          ]);
        const upcomingMilestones = calculateUpcomingMilestone(formattedBirthdate, totalLifeExpectancy.totalLifeExpectancy);
          
        

        const combinedStats = {
        daysAlive,
        heartbeats,
        breaths,
        age,
        worldPopulationAtBirth,
        currentWorldPopulation,
        upcomingMilestones,
        selectedCountry,
        worldPopulationRank,
        lifeExpectancy,
        totalLifeExpectancy,
        calculatedLifeStats,
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
      <ScrollView 
        contentContainerStyle={styles.scrollContentContainer} // Ensure ScrollView scrolls properly
      >
      {stats && stats.age && (
        <View style={styles.resultContainer}>
        <Text>Country: {stats.selectedCountry}</Text>
        <Text>Age: {stats.age.years} years, {stats.age.months} months, and {stats.age.days} days</Text>
        <Text>Total Days Alive: {stats.daysAlive.toLocaleString()}</Text>
        <Text>Average Life Expectancy: {stats.totalLifeExpectancy.totalLifeExpectancy}</Text>
        <Text>Remaining Life Expectancy: {stats.lifeExpectancy.remainingLifeExpectancy}</Text>
        <SimpleLineBar
            age={stats.age.years}  // Pass the current age in years
            totalLifeExpectancy={stats.totalLifeExpectancy.totalLifeExpectancy || 80}  // Pass total life expectancy, default to 80 if undefined
        />
        <Text>No. of Heartbeats taken: {stats.heartbeats.toLocaleString()}</Text> 
        <Text>No. of Breaths taken: {stats.breaths.toLocaleString()}</Text>
        <Text>World Population at Birth: {stats.worldPopulationAtBirth.toLocaleString()}</Text>
        <Text>Current World Population: {stats.currentWorldPopulation.toLocaleString()}</Text>
        <Text>Country Population Rank (Same Gender): # {stats.worldPopulationRank}</Text>
        <Text>Eye Blinks: {stats.calculatedLifeStats.eyeBlinks}</Text>
        <Text>Steps Taken: {stats.calculatedLifeStats.stepsTaken}</Text>
        {/* <Text>How Much Poop in Liters: {stats.calculatedLifeStats.poopLiters}</Text>
        <Text>How Much Pee in Liters: {stats.calculatedLifeStats.peeLiters}</Text> */}
        <Text>Sleep Time: {stats.calculatedLifeStats.sleepTime} hours </Text>
        <Text>Screen Time: {stats.calculatedLifeStats.screenTime} hours {"\n"}{"\n"}</Text>
        
        
        
        
        <Text>Upcoming Milestones:</Text>
        {stats.upcomingMilestones.map((milestone, index) => (
          <Text key={index}>
             {milestone.milestone === 'Half-Life Milestone' ? 'at half of your life' : milestone.milestone.toLocaleString()} on {milestone.date.toDateString()}
          </Text>
        ))}
        
        
        
        
        <ShareStatsComponent stats={stats} />
        
      </View>
      
      )}
      </ScrollView>
      

      {!stats && (
        <Text>Please enter your birthdate and select a country to discover your stats.</Text>
      )}
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
  scrollContainer: {
    flexGrow: 1, 

  },
  resultContainer: {
    marginTop: 20,
    paddingBottom: 40,
    borderRadius: 10,
  },
  shareContainer: {
    marginTop: 20,
  },
  inputName: {
    height: 40,
    borderColor: 'grey',
    borderWidth: 0.8,
    width: '80%',
    paddingLeft: 8,
    marginBottom: 16,
    borderRadius: 10,
    alignSelf: 'center', 
  },
});

export default DiscoverBirthdate;
