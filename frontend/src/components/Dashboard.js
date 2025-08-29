import React, { useState, useEffect } from 'react';
import { 
  GitCommit, 
  GitPullRequest, 
  GitMerge, 
  AlertCircle, 
  MessageSquare,
  UserCheck,
  TrendingUp,
  RefreshCw
} from 'lucide-react';
import StatCard from './StatCard';
import CommitChart from './CommitChart';
import ActivityChart from './ActivityChart';

const Dashboard = ({ user }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:5000/api/user/stats', {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch statistics');
      }
      
      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchStats();
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="container">
          <div className="loading">
            <div className="loading-spinner"></div>
            <div style={{ marginTop: '16px' }}>Loading your GitHub statistics...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <div className="container">
          <div className="error">
            <AlertCircle size={20} style={{ marginRight: '8px' }} />
            {error}
          </div>
          <button className="btn btn-primary" onClick={handleRefresh}>
            <RefreshCw size={16} style={{ marginRight: '8px' }} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="dashboard">
        <div className="container">
          <div className="error">No statistics available</div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Welcome back, {stats.user.name || stats.user.username}!</h1>
          <p className="dashboard-subtitle">
            Here's your GitHub productivity overview
          </p>
        </div>

        <div className="stats-grid grid grid-3">
          <StatCard
            icon={<GitCommit size={24} />}
            value={stats.commits.total}
            label="Total Commits"
            color="#58a6ff"
          />
          <StatCard
            icon={<GitPullRequest size={24} />}
            value={stats.pullRequests.created}
            label="PRs Created"
            color="#3fb950"
          />
          <StatCard
            icon={<GitMerge size={24} />}
            value={stats.pullRequests.merged}
            label="PRs Merged"
            color="#a371f7"
          />
          <StatCard
            icon={<MessageSquare size={24} />}
            value={stats.codeReviews.given}
            label="Code Reviews"
            color="#ff9b33"
          />
          <StatCard
            icon={<AlertCircle size={24} />}
            value={stats.issues.created}
            label="Issues Created"
            color="#f85149"
          />
          <StatCard
            icon={<UserCheck size={24} />}
            value={stats.issues.assigned}
            label="Issues Assigned"
            color="#8b949e"
          />
        </div>

        <div className="grid grid-2">
          <div className="chart-container">
            <div className="chart-header">
              <h3 className="chart-title">
                <TrendingUp size={20} style={{ marginRight: '8px' }} />
                Commit Activity
              </h3>
            </div>
            <CommitChart commitData={stats.commits.weekly} />
          </div>

          <div className="chart-container">
            <div className="chart-header">
              <h3 className="chart-title">
                <GitPullRequest size={20} style={{ marginRight: '8px' }} />
                Activity Overview
              </h3>
            </div>
            <ActivityChart stats={stats} />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">User Profile</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '16px', alignItems: 'center' }}>
            <img 
              src={stats.user.avatarUrl} 
              alt={stats.user.username}
              style={{ width: '80px', height: '80px', borderRadius: '50%' }}
            />
            <div>
              <h4 style={{ marginBottom: '8px', color: '#f0f6fc' }}>
                {stats.user.name || stats.user.username}
              </h4>
              <p style={{ color: '#8b949e', marginBottom: '4px' }}>
                @{stats.user.username}
              </p>
              <p style={{ color: '#8b949e', marginBottom: '4px' }}>
                Public Repositories: {stats.user.publicRepos}
              </p>
              <p style={{ color: '#8b949e' }}>
                Followers: {stats.user.followers} • Following: {stats.user.following}
              </p>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <button className="btn btn-secondary" onClick={handleRefresh}>
            <RefreshCw size={16} style={{ marginRight: '8px' }} />
            Refresh Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
