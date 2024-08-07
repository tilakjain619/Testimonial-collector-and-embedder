import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const AverageRatingChart = ({ averageRating }) => {
  const data = {
    labels: ['Average Rating', 'Out of 5'],
    datasets: [{
      label: 'Average Ratings',
      data: [averageRating, 5 - averageRating], // Assuming 5 is the maximum rating
      backgroundColor: [
        'rgb(54, 162, 235)',
        'rgb(201, 203, 207)'
      ],
      hoverOffset: 4
    }]
  };

  return <Pie data={data} />;
};

export default AverageRatingChart;
