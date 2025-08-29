import React from 'react';

const StatCard = ({ icon, value, label, color = '#58a6ff' }) => {
  return (
    <div className="stat-card">
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: `${color}20`,
        margin: '0 auto 16px auto'
      }}>
        <div style={{ color: color }}>
          {icon}
        </div>
      </div>
      <div className="stat-number" style={{ color: color }}>
        {value.toLocaleString()}
      </div>
      <div className="stat-label">
        {label}
      </div>
    </div>
  );
};

export default StatCard;
