import { UserData, CalculationResults, AnalyticsData, AnalyticsSummary } from '../types';
import { getAgeRange, getBodyFatRange, getEAStatus } from './calculations';

const ANALYTICS_KEY = 'metabolic_calculator_analytics';

export const saveCalculationData = (userData: UserData, results: CalculationResults): void => {
  try {
    // Create analytics data with user name
    const analyticsEntry: AnalyticsData = {
      timestamp: new Date().toISOString(),
      userName: userData.name || 'Anonymous',
      demographics: {
        age_range: getAgeRange(userData.age),
        gender: userData.gender,
        activity_level: userData.activityLevel,
        body_fat_range: getBodyFatRange(userData.bodyFatPercentage)
      },
      results: {
        bmr: results.bmr,
        rmr: results.rmr,
        tdee: results.tdee,
        ea: results.energyAvailability,
        ea_status: getEAStatus(results.energyAvailability)
      }
    };

    // Get existing data
    const existingData = getAnalyticsData();
    
    // Add new entry
    existingData.push(analyticsEntry);
    
    // Keep only last 1000 entries to prevent storage bloat
    const trimmedData = existingData.slice(-1000);
    
    // Save to localStorage
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(trimmedData));
  } catch (error) {
    console.error('Error saving analytics data:', error);
  }
};

export const getAnalyticsData = (): AnalyticsData[] => {
  try {
    const data = localStorage.getItem(ANALYTICS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading analytics data:', error);
    return [];
  }
};

export const getAnalyticsSummary = (daysBack: number = 30): AnalyticsSummary => {
  const data = getAnalyticsData();
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysBack);
  
  const filteredData = data.filter(item => 
    new Date(item.timestamp) >= cutoffDate
  );

  if (filteredData.length === 0) {
    return {
      totalCalculations: 0,
      dailyAverage: 0,
      genderDistribution: {},
      activityLevelDistribution: {},
      bodyFatDistribution: {},
      eaStatusDistribution: {},
      averageAge: 0,
      averageTDEE: 0
    };
  }

  // Calculate distributions
  const genderDistribution: Record<string, number> = {};
  const activityLevelDistribution: Record<string, number> = {};
  const bodyFatDistribution: Record<string, number> = {};
  const eaStatusDistribution: Record<string, number> = {};

  let totalTDEE = 0;
  let totalAge = 0;
  const ageMidpoints: Record<string, number> = {
    'under-18': 16,
    '18-24': 21,
    '25-34': 29.5,
    '35-44': 39.5,
    '45-54': 49.5,
    '55-64': 59.5,
    '65+': 70
  };

  filteredData.forEach(item => {
    // Gender distribution
    genderDistribution[item.demographics.gender] = 
      (genderDistribution[item.demographics.gender] || 0) + 1;

    // Activity level distribution
    activityLevelDistribution[item.demographics.activity_level] = 
      (activityLevelDistribution[item.demographics.activity_level] || 0) + 1;

    // Body fat distribution
    bodyFatDistribution[item.demographics.body_fat_range] = 
      (bodyFatDistribution[item.demographics.body_fat_range] || 0) + 1;

    // EA status distribution
    eaStatusDistribution[item.results.ea_status] = 
      (eaStatusDistribution[item.results.ea_status] || 0) + 1;

    // Totals for averages
    totalTDEE += item.results.tdee;
    totalAge += ageMidpoints[item.demographics.age_range] || 30;
  });

  return {
    totalCalculations: filteredData.length,
    dailyAverage: filteredData.length / daysBack,
    genderDistribution,
    activityLevelDistribution,
    bodyFatDistribution,
    eaStatusDistribution,
    averageAge: totalAge / filteredData.length,
    averageTDEE: totalTDEE / filteredData.length
  };
};

export const clearAnalyticsData = (): void => {
  try {
    localStorage.removeItem(ANALYTICS_KEY);
  } catch (error) {
    console.error('Error clearing analytics data:', error);
  }
};

// Generate sample data for demo purposes
export const generateSampleData = (count: number = 50): void => {
  const sampleData: AnalyticsData[] = [];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const daysAgo = Math.floor(Math.random() * 30);
    const timestamp = new Date(now);
    timestamp.setDate(timestamp.getDate() - daysAgo);
    
    const genders = ['male', 'female'];
    const activities = ['sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extremely_active'];
    const ageRanges = ['18-24', '25-34', '35-44', '45-54', '55-64'];
    const bodyFatRanges = ['8-12%', '13-17%', '18-22%', '23-27%', '28-35%'];
    const eaStatuses = ['low', 'optimal', 'high'];
    
    const gender = genders[Math.floor(Math.random() * genders.length)];
    const bmr = gender === 'male' ? 1600 + Math.random() * 400 : 1200 + Math.random() * 300;
    const rmr = bmr + (Math.random() * 100 - 50);
    const tdee = bmr * (1.2 + Math.random() * 0.7);
    const ea = 25 + Math.random() * 25;
    
    sampleData.push({
      timestamp: timestamp.toISOString(),
      userName: 'Sample User',
      demographics: {
        age_range: ageRanges[Math.floor(Math.random() * ageRanges.length)],
        gender,
        activity_level: activities[Math.floor(Math.random() * activities.length)],
        body_fat_range: bodyFatRanges[Math.floor(Math.random() * bodyFatRanges.length)]
      },
      results: {
        bmr,
        rmr,
        tdee,
        ea,
        ea_status: eaStatuses[Math.floor(Math.random() * eaStatuses.length)] as 'low' | 'optimal' | 'high'
      }
    });
  }
  
  // Merge with existing data
  const existingData = getAnalyticsData();
  const combinedData = [...existingData, ...sampleData];
  localStorage.setItem(ANALYTICS_KEY, JSON.stringify(combinedData.slice(-1000)));
};

// Remove auto-generation of fake data - only store real user data