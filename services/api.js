const API_BASE_URL = 'https://api.worldbank.org/v2';

export const getCountryIndicator = async (country, indicator) => {
    return fetch(`${API_BASE_URL}/country/${country}/indicator/${indicator}?format=json`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json(); // Parse the JSON response
    })
    .then((data) => {
      return data[1]; // Returning the actual data array from the JSON response
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      throw new Error('Failed to fetch or parse JSON data');
    });
  };
  
