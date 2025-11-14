import React from 'react';
import './ControlButtons.css';

function ControlButtons({ connected, onConnect, onSync, onDisconnect }) {
  return (
    <div className="controls">
      {!connected ? (
        <button
          className="btn btn-primary"
          onClick={onConnect}
        >
          Conectar Smartwatch
        </button>
      ) : (
        <>
          <button
            className="btn btn-secondary"
            onClick={onSync}
          >
            Sincronizar Datos
          </button>
          <button
            className="btn btn-danger"
            onClick={onDisconnect}
          >
            Desconectar
          </button>
        </>
      )}
    </div>
  );
}

export default ControlButtons;
