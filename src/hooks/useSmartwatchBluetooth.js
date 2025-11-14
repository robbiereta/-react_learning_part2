import { useState, useEffect, useCallback } from 'react';

function useSmartwatchBluetooth() {
  const [device, setDevice] = useState(null);
  const [connected, setConnected] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(null);
  const [steps, setSteps] = useState(0);
  const [heartRate, setHeartRate] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [status, setStatus] = useState('Desconectado');
  const [isBluetoothAvailable, setIsBluetoothAvailable] = useState(false);

  // Check if Web Bluetooth API is available and we're in a secure context
  useEffect(() => {
    const isSecure = window.isSecureContext;
    const hasBluetooth = 'bluetooth' in navigator;
    
    if (!isSecure) {
      setStatus('Error: Se requiere una conexión segura (HTTPS o localhost)');
      setIsBluetoothAvailable(false);
      return;
    }
    
    if (!hasBluetooth) {
      setStatus('Error: La API de Bluetooth no está soportada en este navegador');
      setIsBluetoothAvailable(false);
      return;
    }
    
    setIsBluetoothAvailable(true);
    setStatus('Listo para conectar');
  }, []);

  // Obtener nivel de batería
  const getBatteryLevel = useCallback(async (server) => {
    try {
      const service = await server.getPrimaryService('battery_service');
      const characteristic = await service.getCharacteristic('battery_level');
      const value = await characteristic.readValue();
      const batteryLevel = value.getUint8(0);
      setBatteryLevel(batteryLevel);
    } catch (error) {
      console.error('No se pudo leer la batería:', error);
    }
  }, []);

  // Manejar desconexión
  const handleDisconnected = useCallback(() => {
    setConnected(false);
    setStatus('Dispositivo desconectado');
    setBatteryLevel(null);
  }, []);

  // Conectar al smartwatch usando Web Bluetooth API
  const connectToWatch = useCallback(async () => {
    if (!isBluetoothAvailable) {
      setStatus('Error: Bluetooth no está disponible');
      return;
    }

    try {
      setStatus('Buscando dispositivo...');

      // Solicitar dispositivo Bluetooth - ÚNICO PERMISO NECESARIO
      const selectedDevice = await navigator.bluetooth.requestDevice({
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

      setStatus('Conectando...');

      const server = await selectedDevice.gatt.connect();

      setDevice(selectedDevice);
      setConnected(true);
      setStatus('Conectado a ' + selectedDevice.name);

      // Obtener nivel de batería
      await getBatteryLevel(server);

      // Escuchar desconexión
      selectedDevice.addEventListener('gattserverdisconnected', handleDisconnected);

    } catch (error) {
      console.error('Error al conectar:', error);
      setStatus('Error: ' + error.message);
      setConnected(false);
    }
  }, [getBatteryLevel, handleDisconnected]);

  // Desconectar del smartwatch
  const disconnect = useCallback(() => {
    if (device && device.gatt.connected) {
      device.gatt.disconnect();
    }
    setDevice(null);
    setConnected(false);
    setStatus('Desconectado');
    setBatteryLevel(null);
  }, [device]);

  // Sincronizar datos (simulado - depende de las características específicas del X3)
  const syncData = useCallback(async () => {
    if (!connected) {
      alert('Primero conecta el smartwatch');
      return;
    }

    setStatus('Sincronizando datos...');

    // Simular sincronización de pasos
    setTimeout(() => {
      setSteps(Math.floor(Math.random() * 10000));
      setStatus('Datos sincronizados');
    }, 1000);
  }, [connected]);

  // Limpiar al desmontar
  useEffect(() => {
    return () => {
      if (device && device.gatt.connected) {
        device.gatt.disconnect();
      }
    };
  }, [device]);

  return {
    device,
    connected,
    batteryLevel,
    steps,
    heartRate,
    notifications,
    status,
    isBluetoothAvailable,
    connectToWatch,
    disconnect,
    syncData
  };
}

export default useSmartwatchBluetooth;
