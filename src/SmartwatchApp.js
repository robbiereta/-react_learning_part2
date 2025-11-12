import React, { Component } from 'react';
import './SmartwatchApp.css';

class SmartwatchApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      device: null,
      connected: false,
      batteryLevel: null,
      steps: 0,
      heartRate: null,
      notifications: [],
      status: 'Desconectado'
    };
  }

  // Conectar al smartwatch usando Web Bluetooth API (solo pide permiso Bluetooth)
  connectToWatch = async () => {
    try {
      this.setState({ status: 'Buscando dispositivo...' });

      // Solicitar dispositivo Bluetooth - ÚNICO PERMISO NECESARIO
      const device = await navigator.bluetooth.requestDevice({
        filters: [
          { namePrefix: 'X3' },
          { namePrefix: 'Watch' }
        ],
        optionalServices: [
          'battery_service',
          'heart_rate',
          'device_information'
        ]
      });

      this.setState({ status: 'Conectando...' });

      const server = await device.gatt.connect();

      this.setState({
        device: device,
        connected: true,
        status: 'Conectado a ' + device.name
      });

      // Obtener nivel de batería
      await this.getBatteryLevel(server);

      // Escuchar desconexión
      device.addEventListener('gattserverdisconnected', this.onDisconnected);

    } catch (error) {
      console.error('Error al conectar:', error);
      this.setState({
        status: 'Error: ' + error.message,
        connected: false
      });
    }
  };

  // Obtener nivel de batería
  getBatteryLevel = async (server) => {
    try {
      const service = await server.getPrimaryService('battery_service');
      const characteristic = await service.getCharacteristic('battery_level');
      const value = await characteristic.readValue();
      const batteryLevel = value.getUint8(0);

      this.setState({ batteryLevel: batteryLevel });
    } catch (error) {
      console.error('No se pudo leer la batería:', error);
    }
  };

  // Desconectar del smartwatch
  disconnect = () => {
    if (this.state.device && this.state.device.gatt.connected) {
      this.state.device.gatt.disconnect();
    }
    this.setState({
      device: null,
      connected: false,
      status: 'Desconectado',
      batteryLevel: null
    });
  };

  onDisconnected = () => {
    this.setState({
      connected: false,
      status: 'Dispositivo desconectado',
      batteryLevel: null
    });
  };

  // Sincronizar datos (simulado - depende de las características específicas del X3)
  syncData = async () => {
    if (!this.state.connected) {
      alert('Primero conecta el smartwatch');
      return;
    }

    this.setState({ status: 'Sincronizando datos...' });

    // Simular sincronización de pasos
    setTimeout(() => {
      this.setState({
        steps: Math.floor(Math.random() * 10000),
        status: 'Datos sincronizados'
      });
    }, 1000);
  };

  componentWillUnmount() {
    this.disconnect();
  }

  render() {
    const { connected, status, batteryLevel, steps } = this.state;

    return (
      <div className="smartwatch-app">
        <header className="app-header">
          <h1>🏃 Smartwatch X3 Lite</h1>
          <p className="subtitle">Aplicación minimalista - Solo permiso Bluetooth</p>
        </header>

        <div className="status-card">
          <div className={`status-indicator ${connected ? 'connected' : 'disconnected'}`}>
            {connected ? '🟢' : '🔴'}
          </div>
          <p className="status-text">{status}</p>
        </div>

        <div className="controls">
          {!connected ? (
            <button
              className="btn btn-primary"
              onClick={this.connectToWatch}
            >
              Conectar Smartwatch
            </button>
          ) : (
            <>
              <button
                className="btn btn-secondary"
                onClick={this.syncData}
              >
                Sincronizar Datos
              </button>
              <button
                className="btn btn-danger"
                onClick={this.disconnect}
              >
                Desconectar
              </button>
            </>
          )}
        </div>

        {connected && (
          <div className="data-grid">
            <div className="data-card">
              <div className="data-icon">🔋</div>
              <div className="data-label">Batería</div>
              <div className="data-value">
                {batteryLevel !== null ? `${batteryLevel}%` : 'N/A'}
              </div>
            </div>

            <div className="data-card">
              <div className="data-icon">👟</div>
              <div className="data-label">Pasos</div>
              <div className="data-value">{steps.toLocaleString()}</div>
            </div>

            <div className="data-card">
              <div className="data-icon">⌚</div>
              <div className="data-label">Dispositivo</div>
              <div className="data-value">{this.state.device?.name || 'X3'}</div>
            </div>
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
}

export default SmartwatchApp;
