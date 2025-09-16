export interface UserData {
  weight: number;
  height: number;
  age: number;
  gender: 'male' | 'female';
  activityLevel: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extremely_active';
  bodyFatPercentage: number;
  name?: string;
}

export interface CalculationResults {
  bmr: number; // Basal Metabolic Rate (Mifflin-St Jeor)
  rmr: number; // Resting Metabolic Rate (Harris-Benedict)
  tdee: number; // Total Daily Energy Expenditure
  energyAvailability: number; // Energy Availability
  exerciseEE: number; // Exercise Energy Expenditure
  fatFreeMass: number; // Fat-Free Mass
}

export interface AnalyticsData {
  timestamp: string;
  userName: string;
  demographics: {
    age_range: string;
    gender: string;
    activity_level: string;
    body_fat_range: string;
  };
  results: {
    bmr: number;
    rmr: number;
    tdee: number;
    ea: number;
    ea_status: 'low' | 'optimal' | 'high';
  };
}

export interface AnalyticsSummary {
  totalCalculations: number;
  dailyAverage: number;
  genderDistribution: Record<string, number>;
  activityLevelDistribution: Record<string, number>;
  bodyFatDistribution: Record<string, number>;
  eaStatusDistribution: Record<string, number>;
  averageAge: number;
  averageTDEE: number;
}