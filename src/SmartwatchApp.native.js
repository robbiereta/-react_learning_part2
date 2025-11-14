import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  PermissionsAndroid,
  Platform,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
import BleManager from 'react-native-ble-manager';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

class SmartwatchApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scanning: false,
      peripherals: new Map(),
      connectedDevice: null,
      batteryLevel: null,
      steps: 0,
      heartRate: null,
      status: 'Desconectado',
    };

    this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
    this.handleStopScan = this.handleStopScan.bind(this);
    this.handleUpdateValueForCharacteristic = this.handleUpdateValueForCharacteristic.bind(this);
    this.handleDisconnectedPeripheral = this.handleDisconnectedPeripheral.bind(this);
  }

  componentDidMount() {
    // Inicializar BLE Manager
    BleManager.start({showAlert: false});

    // Registrar listeners
    this.handlerDiscover = bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      this.handleDiscoverPeripheral,
    );
    this.handlerStop = bleManagerEmitter.addListener(
      'BleManagerStopScan',
      this.handleStopScan,
    );
    this.handlerDisconnect = bleManagerEmitter.addListener(
      'BleManagerDisconnectPeripheral',
      this.handleDisconnectedPeripheral,
    );
    this.handlerUpdate = bleManagerEmitter.addListener(
      'BleManagerDidUpdateValueForCharacteristic',
      this.handleUpdateValueForCharacteristic,
    );

    // Verificar estado de Bluetooth
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      this.requestPermissions();
    }
  }

  componentWillUnmount() {
    this.handlerDiscover.remove();
    this.handlerStop.remove();
    this.handlerDisconnect.remove();
    this.handlerUpdate.remove();
  }

  // Solicitar permisos de Bluetooth (Android)
  requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const apiLevel = parseInt(Platform.Version.toString(), 10);

      if (apiLevel < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Permiso de Bluetooth',
            message: 'La app necesita acceso a Bluetooth para conectar con tu smartwatch X3',
            buttonNeutral: 'Preguntar después',
            buttonNegative: 'Cancelar',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const result = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        ]);

        return (
          result['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.GRANTED
        );
      }
    }
    return true;
  };

  handleDiscoverPeripheral(peripheral) {
    const peripherals = this.state.peripherals;
    // Solo mostrar dispositivos que parecen ser smartwatches X3
    if (
      peripheral.name &&
      (peripheral.name.includes('X3') ||
        peripheral.name.includes('Watch') ||
        peripheral.name.includes('Band'))
    ) {
      peripherals.set(peripheral.id, peripheral);
      this.setState({peripherals});
    }
  }

  handleStopScan() {
    console.log('Scan stopped');
    this.setState({scanning: false, status: 'Escaneo completado'});
  }

  handleUpdateValueForCharacteristic(data) {
    console.log('Received data:', data);
  }

  handleDisconnectedPeripheral(data) {
    const peripherals = this.state.peripherals;
    let peripheral = peripherals.get(data.peripheral);
    if (peripheral) {
      peripheral.connected = false;
      peripherals.set(peripheral.id, peripheral);
      this.setState({
        peripherals,
        connectedDevice: null,
        status: 'Dispositivo desconectado',
        batteryLevel: null,
      });
    }
  }

  // Escanear dispositivos Bluetooth
  startScan = async () => {
    const hasPermission = await this.requestPermissions();
    if (!hasPermission) {
      Alert.alert(
        'Permiso denegado',
        'Necesitas otorgar permisos de Bluetooth para usar esta app',
      );
      return;
    }

    this.setState({
      peripherals: new Map(),
      scanning: true,
      status: 'Buscando dispositivos...',
    });

    BleManager.scan([], 5, true)
      .then(() => {
        console.log('Scanning...');
      })
      .catch(err => {
        console.error('Scan error:', err);
        this.setState({status: 'Error al escanear: ' + err.message});
      });
  };

  // Conectar a un dispositivo
  connectToDevice = async peripheral => {
    try {
      this.setState({status: 'Conectando...'});

      await BleManager.connect(peripheral.id);
      console.log('Connected to ' + peripheral.id);

      // Obtener servicios y características
      const peripheralData = await BleManager.retrieveServices(peripheral.id);
      console.log('Retrieved peripheral services', peripheralData);

      this.setState({
        connectedDevice: peripheral,
        status: 'Conectado a ' + peripheral.name,
      });

      // Intentar leer batería
      this.readBatteryLevel(peripheral.id);
    } catch (error) {
      console.error('Connection error', error);
      this.setState({status: 'Error al conectar: ' + error.message});
    }
  };

  // Leer nivel de batería
  readBatteryLevel = async peripheralId => {
    try {
      // UUIDs estándar de Battery Service
      const batteryServiceUUID = '0000180F-0000-1000-8000-00805F9B34FB';
      const batteryLevelUUID = '00002A19-0000-1000-8000-00805F9B34FB';

      const data = await BleManager.read(
        peripheralId,
        batteryServiceUUID,
        batteryLevelUUID,
      );

      const batteryLevel = data[0];
      this.setState({batteryLevel});
    } catch (error) {
      console.log('Could not read battery level:', error);
    }
  };

  // Desconectar dispositivo
  disconnect = async () => {
    if (this.state.connectedDevice) {
      try {
        await BleManager.disconnect(this.state.connectedDevice.id);
        this.setState({
          connectedDevice: null,
          status: 'Desconectado',
          batteryLevel: null,
        });
      } catch (error) {
        console.error('Disconnect error', error);
      }
    }
  };

  // Sincronizar datos (simulado)
  syncData = () => {
    if (!this.state.connectedDevice) {
      Alert.alert('Error', 'Primero conecta el smartwatch');
      return;
    }

    this.setState({status: 'Sincronizando datos...'});

    // Simular sincronización
    setTimeout(() => {
      this.setState({
        steps: Math.floor(Math.random() * 10000),
        heartRate: Math.floor(Math.random() * 40) + 60,
        status: 'Datos sincronizados',
      });
    }, 1000);
  };

  render() {
    const {
      scanning,
      peripherals,
      connectedDevice,
      status,
      batteryLevel,
      steps,
      heartRate,
    } = this.state;

    return (
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>🏃 Smartwatch X3 Lite</Text>
          <Text style={styles.subtitle}>
            Aplicación minimalista - Solo Bluetooth
          </Text>
        </View>

        {/* Status Card */}
        <View style={styles.statusCard}>
          <Text style={styles.statusIndicator}>
            {connectedDevice ? '🟢' : '🔴'}
          </Text>
          <Text style={styles.statusText}>{status}</Text>
        </View>

        {/* Botones de control */}
        <View style={styles.controls}>
          {!connectedDevice ? (
            <TouchableOpacity
              style={[styles.button, styles.buttonPrimary]}
              onPress={this.startScan}
              disabled={scanning}>
              <Text style={styles.buttonText}>
                {scanning ? 'Escaneando...' : 'Buscar Smartwatch'}
              </Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                style={[styles.button, styles.buttonSecondary]}
                onPress={this.syncData}>
                <Text style={styles.buttonText}>Sincronizar Datos</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonDanger]}
                onPress={this.disconnect}>
                <Text style={styles.buttonText}>Desconectar</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Lista de dispositivos encontrados */}
        {scanning && peripherals.size === 0 && (
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>
              Buscando dispositivos cercanos...
            </Text>
          </View>
        )}

        {!connectedDevice && peripherals.size > 0 && (
          <View style={styles.deviceList}>
            <Text style={styles.sectionTitle}>Dispositivos encontrados:</Text>
            {Array.from(peripherals.values()).map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.deviceItem}
                onPress={() => this.connectToDevice(item)}>
                <Text style={styles.deviceName}>
                  {item.name || 'Dispositivo desconocido'}
                </Text>
                <Text style={styles.deviceId}>{item.id}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Tarjetas de datos */}
        {connectedDevice && (
          <View style={styles.dataGrid}>
            <View style={styles.dataCard}>
              <Text style={styles.dataIcon}>🔋</Text>
              <Text style={styles.dataLabel}>Batería</Text>
              <Text style={styles.dataValue}>
                {batteryLevel !== null ? `${batteryLevel}%` : 'N/A'}
              </Text>
            </View>

            <View style={styles.dataCard}>
              <Text style={styles.dataIcon}>👟</Text>
              <Text style={styles.dataLabel}>Pasos</Text>
              <Text style={styles.dataValue}>{steps.toLocaleString()}</Text>
            </View>

            <View style={styles.dataCard}>
              <Text style={styles.dataIcon}>❤️</Text>
              <Text style={styles.dataLabel}>BPM</Text>
              <Text style={styles.dataValue}>
                {heartRate !== null ? heartRate : '--'}
              </Text>
            </View>

            <View style={styles.dataCard}>
              <Text style={styles.dataIcon}>⌚</Text>
              <Text style={styles.dataLabel}>Dispositivo</Text>
              <Text style={styles.dataValue}>
                {connectedDevice?.name || 'X3'}
              </Text>
            </View>
          </View>
        )}

        {/* Info de permisos */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Permisos requeridos</Text>
          <View style={styles.permissionItem}>
            <Text style={styles.permissionIcon}>✅</Text>
            <View style={styles.permissionText}>
              <Text style={styles.permissionTitle}>Bluetooth</Text>
              <Text style={styles.permissionDesc}>
                Para conectar con el smartwatch
              </Text>
            </View>
          </View>
          <Text style={styles.infoText}>
            Esta aplicación solo requiere acceso a Bluetooth, sin permisos
            invasivos como ubicación precisa, contactos, almacenamiento, o
            llamadas telefónicas.
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#764ba2',
  },
  header: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  statusCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusIndicator: {
    fontSize: 32,
    marginRight: 15,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  controls: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonPrimary: {
    backgroundColor: '#667eea',
  },
  buttonSecondary: {
    backgroundColor: '#f5576c',
  },
  buttonDanger: {
    backgroundColor: '#fa709a',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  deviceList: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  deviceItem: {
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 10,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  deviceId: {
    fontSize: 12,
    color: '#666',
  },
  dataGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  dataCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    margin: 5,
    width: '47%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dataIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  dataLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  dataValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  infoSection: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    marginHorizontal: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  permissionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 15,
  },
  permissionIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  permissionText: {
    flex: 1,
  },
  permissionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  permissionDesc: {
    fontSize: 14,
    color: '#666',
  },
  infoText: {
    color: '#666',
    lineHeight: 22,
    fontSize: 14,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default SmartwatchApp;
