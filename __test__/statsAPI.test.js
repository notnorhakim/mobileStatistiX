import { 
  getWorldPopulationRank, 
  calculateEyeBlinks, 
  calculateSteps, 
  calculatePoopLiters, 
  calculateLifeStats, 
  getLifeExpectancy, 
  getTotalLifeExpectancy 
} from '../components/Discover/statsAPI';

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({}),
  ok: true,
}));

// Unit test for getWorldPopulationRank
describe('getWorldPopulationRank', () => {
  it('should return the population rank when API responds successfully', async () => {
    const mockResponse = { rank: 123456 };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });
    const result = await getWorldPopulationRank('1990-01-01', 'male', 'USA');
    expect(result).toBe('123,456');
  });

  it('should handle an error response from the API', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      text: async () => 'Error message',
    });
    const result = await getWorldPopulationRank('1990-01-01', 'male', 'USA');
    expect(result).toBeNull();
  });
});

// Unit test for calculateEyeBlinks
describe('calculateEyeBlinks', () => {
  it('should correctly calculate eye blinks based on days alive', () => {
    const daysAlive = 10000; // Example days alive
    const result = calculateEyeBlinks(daysAlive);
    const expectedBlinks = 15 * 60 * 24 * 10000; // 15 blinks/min, 60 mins/hour, 24 hours/day
    expect(result).toBe(expectedBlinks);
  });
});

// Unit test for calculateSteps
describe('calculateSteps', () => {
  it('should calculate steps for a male', () => {
    const daysAlive = 10000;
    const sex = 'male';
    const result = calculateSteps(daysAlive, sex);
    const expectedSteps = 8000 * 10000; // 8000 steps/day for males
    expect(result).toBe(expectedSteps);
  });

  it('should calculate steps for a female', () => {
    const daysAlive = 10000;
    const sex = 'female';
    const result = calculateSteps(daysAlive, sex);
    const expectedSteps = 7000 * 10000; // 7000 steps/day for females
    expect(result).toBe(expectedSteps);
  });
});

// Unit test for calculatePoopLiters
describe('calculatePoopLiters', () => {
  it('should calculate poop liters for a male', () => {
    const daysAlive = 10000;
    const sex = 'male';
    const result = calculatePoopLiters(daysAlive, sex);
    const expectedPoopLiters = (200 / 1000) * 10000; // 200 grams/day for males converted to liters
    expect(result).toBeCloseTo(expectedPoopLiters, 2);
  });

  it('should calculate poop liters for a female', () => {
    const daysAlive = 10000;
    const sex = 'female';
    const result = calculatePoopLiters(daysAlive, sex);
    const expectedPoopLiters = (150 / 1000) * 10000; // 150 grams/day for females converted to liters
    expect(result).toBeCloseTo(expectedPoopLiters, 2);
  });
});

// Unit test for getLifeExpectancy
describe('getLifeExpectancy', () => {
  it('should return life expectancy data when API responds successfully', async () => {
    const mockResponse = { remaining_life_expectancy: 30.56 };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });
    const result = await getLifeExpectancy('male', 'USA', '1990-01-01');
    expect(result).toEqual({
      remainingLifeExpectancy: '30.56 years',
      date: undefined, // Can be filled based on API response
      country: undefined,
      age: undefined,
    });
  });

  it('should handle an error response from the API', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      text: async () => 'Error message',
    });
    const result = await getLifeExpectancy('male', 'USA', '1990-01-01');
    expect(result).toBeNull();
  });
});

// Unit test for calculateLifeStats
describe('calculateLifeStats', () => {
  it('should calculate all life stats correctly for a male', () => {
    const age = { years: 30 };
    const birthdate = '1990-01-01';
    const gender = 'male';
    const result = calculateLifeStats(age, birthdate, gender);

    expect(result).toHaveProperty('daysAlive');
    expect(result).toHaveProperty('eyeBlinks');
    expect(result).toHaveProperty('stepsTaken');
    expect(result).toHaveProperty('poopLiters');
    expect(result).toHaveProperty('peeLiters');
    expect(result).toHaveProperty('screenTime');
    expect(result).toHaveProperty('sleepTime');
  });
});

// Unit test for getTotalLifeExpectancy
describe('getTotalLifeExpectancy', () => {
  it('should return total life expectancy data when API responds successfully', async () => {
    const mockResponse = {
      total_life_expectancy: 80.45,
      country: 'USA',
      dob: '1990-01-01',
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await getTotalLifeExpectancy('male', 'USA', '1990-01-01');
    expect(result).toEqual({
      totalLifeExpectancy: '80.45 years',
      country: 'USA',
      dob: '1990-01-01',
    });
  });

  it('should handle an error response from the API', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      text: async () => 'Error message',
    });

    const result = await getTotalLifeExpectancy('male', 'USA', '1990-01-01');
    expect(result).toBeNull();
  });
});

describe('getLifeExpectancy', () => {
  it('should return life expectancy data when API responds successfully', async () => {
    const mockResponse = {
      remaining_life_expectancy: 30.56,
      date: '2024-01-01',
      country: 'USA',
      age: '30y5m',
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await getLifeExpectancy('male', 'USA', '1990-01-01');
    expect(result).toEqual({
      remainingLifeExpectancy: '30.56 years',
      date: '2024-01-01',
      country: 'USA',
      age: '30y5m',
    });
  });
});

  