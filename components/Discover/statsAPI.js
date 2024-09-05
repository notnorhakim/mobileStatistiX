// populationAPI.js https://d6wn6bmjj722w.population.io/#!/countries/listCountries

//helper 

// Helper function to format age in the required 'XyYm' format
const formatAge = (birthdate) => {
    const [year, month, day] = birthdate.split('-');
    const birthDateObj = new Date(year, month - 1, day);
    
    const today = new Date();
    let years = today.getFullYear() - birthDateObj.getFullYear();
    let months = today.getMonth() - birthDateObj.getMonth();
    
    // Adjust if the current month is before the birth month
    if (months < 0) {
      years -= 1;
      months += 12;
    }
  
    // Format age in 'XyYm' format
    return `${years}y${months}m`;
  };
  




























// The world population rank is defined as the position of someone's birthday among the group
// of living people of the same sex and country of origin, ordered by date of birth decreasing.
// The last person born is assigned rank #1.
export const getWorldPopulationRank = async (dob, sex, country) => {
    try {
      // Convert sex to lowercase to ensure it's "male", "female", or "unisex"
      const gender = sex.toLowerCase();
  
      const response = await fetch(`https://d6wn6bmjj722w.population.io/1.0/wp-rank/${dob}/${gender}/${country}/today/`);
  
      // Check if the response is ok (status code 200-299)
      if (!response.ok) {
        const textResponse = await response.text();
        console.error('Error response:', textResponse);
        throw new Error(`Error fetching world population rank: ${response.status}`);
      }
  
      // Parse the response as JSON
      const data = await response.json();
  
      // Check if the response has the expected data
      if (data && data.rank) {
        
        return data.rank.toLocaleString();
      } else {
        console.error('Unexpected response format:', data);
        return null;
      }
    } catch (error) {
      console.error('Error fetching world population rank:', error);
      return null;
    }
  };

  // populationAPI.js

// Helper function to calculate eye blinks (same for both male and female)
export const calculateEyeBlinks = (daysAlive) => {
  const blinksPerMinute = 15; // Average number of blinks per minute
  const minutesPerDay = 24 * 60; // Total minutes in a day
  const blinksPerDay = blinksPerMinute * minutesPerDay;
  return blinksPerDay * daysAlive;
};

// Helper function to calculate steps taken based on gender
export const calculateSteps = (daysAlive, sex, stepsPerDayMale = 8000, stepsPerDayFemale = 7000) => {
  const stepsPerDay = sex === 'male' ? stepsPerDayMale : stepsPerDayFemale;
  return stepsPerDay * daysAlive;
};

// Helper function to calculate liters of poop based on gender
export const calculatePoopLiters = (daysAlive, sex) => {
  const poopPerDayGrams = sex == 'male' ? 200 : 150; // Men poop more on average
  const poopPerDayLiters = poopPerDayGrams / 1000; // Convert grams to liters
  return poopPerDayLiters * daysAlive;
};

// Helper function to calculate liters of pee based on gender
export const calculatePeeLiters = (daysAlive, sex) => {
  const peePerDayLiters = sex === 'male' ? 1.8 : 1.4; // Men pee more on average
  return peePerDayLiters * daysAlive;
};

const calculateScreenTime = (age, daysAlive) => {
    let totalScreenTime = 0;
    
    const ageInYears =  age.years

    if (ageInYears <= 2) {
      totalScreenTime = daysAlive * 0.5; // Assume 30 mins (0.5 hours) per day for babies
    } else if (ageInYears <= 5) {
      totalScreenTime = (365 * 2 * 0.5) + ((daysAlive - 365 * 2) * 1); // 0-2 years: 30 mins/day, 3-5 years: 1 hour/day
    } else if (ageInYears <= 12) {
      totalScreenTime = (365 * 2 * 0.5) + (365 * 3 * 1) + ((daysAlive - 365 * 5) * 2); // 0-5 years: above, 6-12 years: 2 hours/day
    } else if (ageInYears <= 18) {
      totalScreenTime = (365 * 2 * 0.5) + (365 * 3 * 1) + (365 * 7 * 2) + ((daysAlive - 365 * 12) * 4); // Teens: 4 hours/day
    } else {
      totalScreenTime = (365 * 2 * 0.5) + (365 * 3 * 1) + (365 * 7 * 2) + (365 * 6 * 4) + ((daysAlive - 365 * 18) * 5); // Adults: 5 hours/day
    }
    return totalScreenTime; // Total screen time in hours
};

// Helper function to calculate total sleep time based on age
const calculateSleepTime = (age, daysAlive) => {
  let totalSleepTime = 0; // Initialize total sleep time in hours
  const ageInYears = age.years;

  if (ageInYears <= 1) {
    totalSleepTime = daysAlive * 16; // 0-1 years: 14-17 hours/day (avg 16)
  } else if (ageInYears <= 2) {
    totalSleepTime = (365 * 1 * 16) + ((daysAlive - 365) * 12.5); // 1-2 years: 11-14 hours/day (avg 12.5)
  } else if (ageInYears <= 5) {
    totalSleepTime = (365 * 1 * 16) + (365 * 1 * 12.5) + ((daysAlive - 365 * 2) * 11.5); // 3-5 years: 10-13 hours/day (avg 11.5)
  } else if (ageInYears <= 13) {
    totalSleepTime = (365 * 1 * 16) + (365 * 1 * 12.5) + (365 * 3 * 11.5) + ((daysAlive - 365 * 5) * 10); // 6-13 years: 9-11 hours/day (avg 10)
  } else if (ageInYears <= 17) {
    totalSleepTime = (365 * 1 * 16) + (365 * 1 * 12.5) + (365 * 3 * 11.5) + (365 * 7 * 10) + ((daysAlive - 365 * 13) * 9); // 14-17 years: 8-10 hours/day (avg 9)
  } else if (ageInYears <= 64) {
    totalSleepTime = (365 * 1 * 16) + (365 * 1 * 12.5) + (365 * 3 * 11.5) + (365 * 7 * 10) + (365 * 4 * 9) + ((daysAlive - 365 * 18) * 8); // 18-64 years: 7-9 hours/day (avg 8)
  } else {
    totalSleepTime = (365 * 1 * 16) + (365 * 1 * 12.5) + (365 * 3 * 11.5) + (365 * 7 * 10) + (365 * 4 * 9) + (365 * 46 * 8) + ((daysAlive - 365 * 65) * 7.5); // 65+ years: 7-8 hours/day (avg 7.5)
  }

  return totalSleepTime; // Total sleep time in hours
};

  

// Main function to calculate all stats based on gender
export const calculateLifeStats = (age, birthdate, gender, country) => {

    const sex = gender.toLowerCase();
  // Calculate total days alive
  const [year, month, day] = birthdate.split('-');
  const birthDateObj = new Date(year, month - 1, day);
  const today = new Date();
  const daysAlive = Math.floor((today - birthDateObj) / (1000 * 60 * 60 * 24));
 

  // Calculate all stats based on gender
  const eyeBlinks = calculateEyeBlinks(daysAlive);
  const stepsTaken = calculateSteps(daysAlive, sex);
  const poopLiters = calculatePoopLiters(daysAlive, sex);
  const peeLiters = calculatePeeLiters(daysAlive, sex);
  const screenTime = calculateScreenTime(age, daysAlive);
  const sleepTime = calculateSleepTime(age, daysAlive); 


  // Return the formatted data
  return {
    daysAlive,
    eyeBlinks: eyeBlinks.toLocaleString(), // Format with commas
    stepsTaken: stepsTaken.toLocaleString(),
    poopLiters: poopLiters.toFixed(2), // Format with 2 decimal places
    peeLiters: peeLiters.toFixed(2),
    screenTime: screenTime.toLocaleString(),
    sleepTime: sleepTime.toLocaleString(),

  };
};

  






// Function to fetch remaining life expectancy
export const getLifeExpectancy = async (sex, country, birthdate) => {
    try {
      // Ensure the sex parameter is lowercase
      const gender = sex.toLowerCase();
      
      // Get the current date in YYYY-MM-DD format
      const today = new Date().toISOString().split('T')[0];
      
      // Format the age in 'XyYm' format
      const age = formatAge(birthdate);
  
      // Make the API request
      const response = await fetch(`https://d6wn6bmjj722w.population.io/1.0/life-expectancy/remaining/${gender}/${country}/${today}/${age}/`);
  
      // Check if the response is ok
      if (!response.ok) {
        const textResponse = await response.text();
        console.error('Error response:', textResponse);
        throw new Error(`Error fetching life expectancy: ${response.status}`);
      }
  
      // Parse the response as JSON
      const data = await response.json();
  
      // Check if the response has the expected data
      if (data && data.remaining_life_expectancy) {
        const formattedData = {
          remainingLifeExpectancy: data.remaining_life_expectancy.toFixed(2) + ' years', // Format with 2 decimal places
          date: data.date,
          country: data.country,
          age: data.age,
        };
        return formattedData;
      } else {
        console.error('Unexpected response format:', data);
        return null;
      }
    } catch (error) {
      console.error('Error fetching life expectancy:', error);
      return null;
    }
  };

  // Function to fetch total life expectancy
export const getTotalLifeExpectancy = async (sex, country, dob) => {
    try {
    // Ensure the sex parameter is lowercase
    const gender = sex.toLowerCase();

    // Make the API request
    const response = await fetch(`https://d6wn6bmjj722w.population.io:443/1.0/life-expectancy/total/${gender}/${country}/${dob}/`);

    // Check if the response is ok
    if (!response.ok) {
        const textResponse = await response.text();
        console.error('Error response:', textResponse);
        throw new Error(`Error fetching total life expectancy: ${response.status}`);
    }

    // Parse the response as JSON
    const data = await response.json();

    // Check if the response has the expected data
    if (data && data.total_life_expectancy) {
        const formattedData = {
        totalLifeExpectancy: data.total_life_expectancy.toFixed(2) + ' years', // Format with 2 decimal places
        country: data.country,
        dob: data.dob,
        };
        return formattedData;
    } else {
        console.error('Unexpected response format:', data);
        return null;
    }
    } catch (error) {
    console.error('Error fetching total life expectancy:', error);
    return null;
    }
};
  
  
  
  
  
  
  