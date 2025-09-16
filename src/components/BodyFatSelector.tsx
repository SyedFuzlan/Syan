import React from 'react';

interface BodyFatSelectorProps {
  selectedPercentage: number;
  gender: 'male' | 'female';
  onChange: (percentage: number) => void;
}

const BodyFatSelector: React.FC<BodyFatSelectorProps> = ({
  selectedPercentage,
  gender,
  onChange
}) => {
  const bodyFatRanges = [
    { range: '8-12%', percentage: 10, label: 'Athletic/Very Lean', color: 'blue' },
    { range: '13-17%', percentage: 15, label: 'Fit/Lean', color: 'green' },
    { range: '18-22%', percentage: 20, label: 'Average/Moderate', color: 'yellow' },
    { range: '23-27%', percentage: 25, label: 'Above Average', color: 'orange' },
    { range: '28-35%', percentage: 31, label: 'High', color: 'red' },
    { range: '36-45%', percentage: 40, label: 'Very High', color: 'purple' }
  ];

  const getColorClasses = (color: string, isSelected: boolean) => {
    const colorMap = {
      blue: isSelected ? 'border-blue-500 bg-blue-50' : 'border-blue-200 hover:border-blue-300',
      green: isSelected ? 'border-green-500 bg-green-50' : 'border-green-200 hover:border-green-300',
      yellow: isSelected ? 'border-yellow-500 bg-yellow-50' : 'border-yellow-200 hover:border-yellow-300',
      orange: isSelected ? 'border-orange-500 bg-orange-50' : 'border-orange-200 hover:border-orange-300',
      red: isSelected ? 'border-red-500 bg-red-50' : 'border-red-200 hover:border-red-300',
      purple: isSelected ? 'border-purple-500 bg-purple-50' : 'border-purple-200 hover:border-purple-300'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const getBodyCompositionIcon = (percentage: number, gender: 'male' | 'female') => {
    // Create visual representation using CSS and Unicode characters
    const getMaleIcon = (bf: number) => {
      if (bf <= 12) return '💪'; // Very lean/muscular
      if (bf <= 17) return '🏃'; // Fit/athletic
      if (bf <= 22) return '🚶'; // Average
      if (bf <= 27) return '👤'; // Above average
      if (bf <= 35) return '🧍'; // High
      return '👥'; // Very high
    };

    const getFemaleIcon = (bf: number) => {
      if (bf <= 12) return '🏃‍♀️'; // Very lean/athletic
      if (bf <= 17) return '🚶‍♀️'; // Fit
      if (bf <= 22) return '👩'; // Average
      if (bf <= 27) return '👤'; // Above average
      if (bf <= 35) return '🧍‍♀️'; // High
      return '👥'; // Very high
    };

    return gender === 'male' ? getMaleIcon(percentage) : getFemaleIcon(percentage);
  };

  return (
    <div>
      <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-medium text-blue-900 mb-2">How to Select Your Body Composition</h4>
        <p className="text-sm text-blue-700">
          Choose the range that best represents your current body composition. 
          This visual guide helps provide more accurate metabolic calculations than standard BMI methods.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {bodyFatRanges.map((range) => {
          const isSelected = selectedPercentage === range.percentage;
          return (
            <button
              key={range.percentage}
              onClick={() => onChange(range.percentage)}
              className={`p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg transform hover:scale-105 ${
                getColorClasses(range.color, isSelected)
              } ${isSelected ? 'ring-2 ring-offset-2 ring-blue-400' : ''}`}
            >
              {/* Visual Representation */}
              <div className="text-4xl mb-3 flex justify-center">
                {getBodyCompositionIcon(range.percentage, gender)}
              </div>
              
              {/* Body Fat Percentage */}
              <div className={`text-lg font-bold mb-1 ${
                isSelected ? 'text-gray-900' : 'text-gray-700'
              }`}>
                {range.range}
              </div>
              
              {/* Description */}
              <div className={`text-sm mb-2 ${
                isSelected ? 'text-gray-700' : 'text-gray-600'
              }`}>
                {range.label}
              </div>
              
              {/* Visual Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    range.color === 'blue' ? 'bg-blue-500' :
                    range.color === 'green' ? 'bg-green-500' :
                    range.color === 'yellow' ? 'bg-yellow-500' :
                    range.color === 'orange' ? 'bg-orange-500' :
                    range.color === 'red' ? 'bg-red-500' :
                    'bg-purple-500'
                  }`}
                  style={{ width: `${Math.min(range.percentage * 2, 100)}%` }}
                />
              </div>
              
              {/* Selection Indicator */}
              {isSelected && (
                <div className="text-xs text-green-600 font-medium mt-1">
                  ✓ Selected
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Additional Information */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h5 className="font-medium text-gray-900 mb-2">Body Fat Reference Guidelines</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <strong className="text-blue-600">Men:</strong>
            <ul className="mt-1 space-y-1">
              <li>• Essential fat: 2-5%</li>
              <li>• Athletes: 6-13%</li>
              <li>• Fitness: 14-17%</li>
              <li>• Average: 18-24%</li>
              <li>• Obese: 25%+</li>
            </ul>
          </div>
          <div>
            <strong className="text-pink-600">Women:</strong>
            <ul className="mt-1 space-y-1">
              <li>• Essential fat: 10-13%</li>
              <li>• Athletes: 14-20%</li>
              <li>• Fitness: 21-24%</li>
              <li>• Average: 25-31%</li>
              <li>• Obese: 32%+</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyFatSelector;