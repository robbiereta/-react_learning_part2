import React from 'react';
import './StatusCard.css';

function StatusCard({ connected, status }) {
  return (
    <div className="status-card">
      <div className={`status-indicator ${connected ? 'connected' : 'disconnected'}`}>
        {connected ? '🟢' : '🔴'}
      </div>
      <p className="status-text">{status}</p>
    </div>
  );
}

export default StatusCard;
