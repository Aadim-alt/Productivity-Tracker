import React from 'react';
import { Github, Code, GitPullRequest, BarChart3, Users } from 'lucide-react';

const Login = ({ onLogin }) => {
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">GitHub Productivity Tracker</h1>
          <p className="login-subtitle">
            Track your coding activity, analyze your productivity, and optimize your workflow
          </p>
        </div>

        <div className="login-features">
          <div className="feature-item">
            <Code className="feature-icon" size={20} />
            <span>Track commits and code contributions</span>
          </div>
          <div className="feature-item">
            <GitPullRequest className="feature-icon" size={20} />
            <span>Monitor pull request activity</span>
          </div>
          <div className="feature-item">
            <Users className="feature-icon" size={20} />
            <span>Analyze issue management</span>
          </div>
          <div className="feature-item">
            <BarChart3 className="feature-icon" size={20} />
            <span>Visualize your productivity metrics</span>
          </div>
        </div>

        <button className="btn btn-primary" onClick={onLogin}>
          <Github size={20} style={{ marginRight: '8px' }} />
          Sign in with GitHub
        </button>

        <div style={{ marginTop: '24px', fontSize: '14px', color: '#8b949e' }}>
          <p>We only request read access to your public data</p>
          <p>Your data is processed securely and never stored</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
