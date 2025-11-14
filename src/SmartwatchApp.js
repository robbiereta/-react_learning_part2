import React from 'react';
import StatusCard from './components/StatusCard/StatusCard';
import DataCard from './components/DataCard/DataCard';
import ControlButtons from './components/ControlButtons/ControlButtons';
import useSmartwatchBluetooth from './hooks/useSmartwatchBluetooth';
import './SmartwatchApp.css';

function SmartwatchApp() {
  const {
    device,
    connected,
    batteryLevel,
    steps,
    status,
    connectToWatch,
    disconnect,
    syncData
  } = useSmartwatchBluetooth();

  return (
    <div className="smartwatch-app">
      <header className="app-header">
        <h1>🏃 Smartwatch X3 Lite</h1>
        <p className="subtitle">Aplicación minimalista - Solo permiso Bluetooth</p>
      </header>

      <StatusCard connected={connected} status={status} />

      <ControlButtons
        connected={connected}
        onConnect={connectToWatch}
        onSync={syncData}
        onDisconnect={disconnect}
      />

      {connected && (
        <div className="data-grid">
          <DataCard
            icon="🔋"
            label="Batería"
            value={batteryLevel !== null ? `${batteryLevel}%` : 'N/A'}
          />
          <DataCard
            icon="👟"
            label="Pasos"
            value={steps.toLocaleString()}
          />
          <DataCard
            icon="⌚"
            label="Dispositivo"
            value={device?.name || 'X3'}
          />
        </div>
      )}

      <div className="info-section">
        <h3>Permisos requeridos</h3>
        <ul className="permissions-list">
          <li className="permission-item">
            <span className="permission-icon">✅</span>
            <strong>Bluetooth</strong> - Para conectar con el smartwatch
          </li>
        </ul>
        <p className="info-text">
          Esta aplicación solo requiere acceso a Bluetooth, sin permisos invasivos
          como ubicación, contactos, almacenamiento, o llamadas telefónicas.
        </p>
      </div>
    </div>
  );
}

export default SmartwatchApp;
