import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DailySubmissionsChart = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [{
      label: 'Daily Submissions',
      data: data.values,
      fill: false,
      borderColor: 'rgb(255, 99, 132)',
      tension: 0.1
    }]
  };

  return <Line data={chartData} />;
};

export default DailySubmissionsChart;
