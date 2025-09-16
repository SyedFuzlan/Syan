import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS
} from 'chart.js';
import { registerables } from 'chart.js';
import { AnalyticsData } from '../types';

ChartJS.register(...registerables);

interface AnalyticsChartsProps {
  data: AnalyticsData[];
}

const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ data }) => {
  const usageChartRef = useRef<HTMLCanvasElement>(null);
  const resultsChartRef = useRef<HTMLCanvasElement>(null);
  const usageChartInstance = useRef<ChartJS | null>(null);
  const resultsChartInstance = useRef<ChartJS | null>(null);

  useEffect(() => {
    // Destroy existing charts
    if (usageChartInstance.current) {
      usageChartInstance.current.destroy();
      usageChartInstance.current = null;
    }
    if (resultsChartInstance.current) {
      resultsChartInstance.current.destroy();
      resultsChartInstance.current = null;
    }

    if (!data.length) return;

    // Usage over time chart
    if (usageChartRef.current) {
      const ctx = usageChartRef.current.getContext('2d');
      if (ctx) {
        // Group data by day
        const dailyUsage = data.reduce((acc, item) => {
          const date = new Date(item.timestamp).toDateString();
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const sortedDates = Object.keys(dailyUsage).sort((a, b) => 
          new Date(a).getTime() - new Date(b).getTime()
        );

        usageChartInstance.current = new ChartJS(ctx, {
          type: 'line',
          data: {
            labels: sortedDates,
            datasets: [{
              label: 'Daily Calculations',
              data: sortedDates.map(date => dailyUsage[date]),
              borderColor: 'rgb(59, 130, 246)',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              tension: 0.4,
              fill: true
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Calculator Usage Over Time'
              },
              legend: {
                display: false
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  precision: 0
                }
              }
            }
          }
        });
      }
    }

    // Results distribution chart
    if (resultsChartRef.current) {
      const ctx = resultsChartRef.current.getContext('2d');
      if (ctx) {
        // Calculate average results by gender
        const maleData = data.filter(item => item.demographics.gender === 'male');
        const femaleData = data.filter(item => item.demographics.gender === 'female');

        const avgMaleBMR = maleData.reduce((sum, item) => sum + item.results.bmr, 0) / maleData.length || 0;
        const avgFemaleBMR = femaleData.reduce((sum, item) => sum + item.results.bmr, 0) / femaleData.length || 0;
        const avgMaleTDEE = maleData.reduce((sum, item) => sum + item.results.tdee, 0) / maleData.length || 0;
        const avgFemaleTDEE = femaleData.reduce((sum, item) => sum + item.results.tdee, 0) / femaleData.length || 0;

        resultsChartInstance.current = new ChartJS(ctx, {
          type: 'bar',
          data: {
            labels: ['BMR', 'TDEE'],
            datasets: [
              {
                label: 'Male Average',
                data: [Math.round(avgMaleBMR), Math.round(avgMaleTDEE)],
                backgroundColor: 'rgba(59, 130, 246, 0.8)',
                borderColor: 'rgb(59, 130, 246)',
                borderWidth: 1
              },
              {
                label: 'Female Average',
                data: [Math.round(avgFemaleBMR), Math.round(avgFemaleTDEE)],
                backgroundColor: 'rgba(236, 72, 153, 0.8)',
                borderColor: 'rgb(236, 72, 153)',
                borderWidth: 1
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Average Metabolic Rates by Gender'
              }
            },
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    }

    return () => {
      if (usageChartInstance.current) {
        usageChartInstance.current.destroy();
      }
      if (resultsChartInstance.current) {
        resultsChartInstance.current.destroy();
      }
    };
  }, [data]);

  if (!data.length) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="text-center text-gray-500">
          <p>No data available for charts</p>
          <p className="text-sm mt-2">Charts will appear once calculator usage data is available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div style={{ height: '300px' }}>
          <canvas ref={usageChartRef} />
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div style={{ height: '300px' }}>
          <canvas ref={resultsChartRef} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;