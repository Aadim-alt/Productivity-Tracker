import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ActivityChart = ({ stats }) => {
  const data = {
    labels: ['Commits', 'PRs Created', 'PRs Merged', 'Code Reviews', 'Issues Created', 'Issues Assigned'],
    datasets: [
      {
        label: 'Activity Count',
        data: [
          stats.commits.total,
          stats.pullRequests.created,
          stats.pullRequests.merged,
          stats.codeReviews.given,
          stats.issues.created,
          stats.issues.assigned
        ],
        backgroundColor: [
          'rgba(88, 166, 255, 0.8)',
          'rgba(63, 185, 80, 0.8)',
          'rgba(163, 113, 247, 0.8)',
          'rgba(255, 155, 51, 0.8)',
          'rgba(248, 81, 73, 0.8)',
          'rgba(139, 148, 158, 0.8)'
        ],
        borderColor: [
          '#58a6ff',
          '#3fb950',
          '#a371f7',
          '#ff9b33',
          '#f85149',
          '#8b949e'
        ],
        borderWidth: 1,
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
            return `${context.dataset.label}: ${context.parsed.y}`;
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
      <Bar data={data} options={options} />
    </div>
  );
};

export default ActivityChart;
