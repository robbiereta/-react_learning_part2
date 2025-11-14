import React from 'react';
import './DataCard.css';

function DataCard({ icon, label, value }) {
  return (
    <div className="data-card">
      <div className="data-icon">{icon}</div>
      <div className="data-label">{label}</div>
      <div className="data-value">{value}</div>
    </div>
  );
}

export default DataCard;
