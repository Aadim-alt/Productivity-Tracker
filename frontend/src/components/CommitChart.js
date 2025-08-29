import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CommitChart = ({ commitData }) => {
  if (!commitData || commitData.length === 0) {
    return (
      <div style={{ 
        height: '300px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: '#8b949e'
      }}>
        No commit data available
      </div>
    );
  }

  // Process last 8 weeks of data
  const recentWeeks = commitData.slice(-8);
  const labels = recentWeeks.map((week, index) => {
    const date = new Date(week.week * 1000);
    return `Week ${index + 1}`;
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Commits per Week',
        data: recentWeeks.map(week => week.total),
        borderColor: '#58a6ff',
        backgroundColor: 'rgba(88, 166, 255, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#c9d1d9',
        },
      },
      tooltip: {
        backgroundColor: '#161b22',
        titleColor: '#f0f6fc',
        bodyColor: '#c9d1d9',
        borderColor: '#30363d',
        callbacks: {
          label: function(context) {
            return `Commits: ${context.parsed.y}`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(48, 54, 61, 0.3)',
        },
        ticks: {
          color: '#8b949e',
        },
      },
      y: {
        grid: {
          color: 'rgba(48, 54, 61, 0.3)',
        },
        ticks: {
          color: '#8b949e',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ height: '300px' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default CommitChart;
