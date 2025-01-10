import React from 'react';
import { Bar } from 'react-chartjs-2';

const ReportChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81],
        backgroundColor: ['#375A7F', '#4A90E2', '#52CEE6', '#FF6B6B'],
      },
    ],
  };

  return <Bar data={data} />;
};

export default ReportChart;
