# 🏃 Smartwatch X3 Lite

## Aplicación Nativa Minimalista para Smartwatch X3 (React Native)

Una alternativa ligera y respetuosa con la privacidad a GL Wear, diseñada específicamente para smartwatches X3. **Ahora como aplicación nativa Android** para mejor rendimiento y acceso directo a Bluetooth.

---

## ✨ Características Principales

### 🔒 **Permisos Mínimos**
- ✅ **Solo requiere Bluetooth** para conectar con tu smartwatch
- ❌ **NO requiere**:
  - Ubicación GPS (excepto requisito del sistema Android <12)
  - Acceso a contactos
  - Acceso a llamadas telefónicas
  - Acceso a SMS
  - Almacenamiento externo
  - Cámara
  - Micrófono
  - Historial de navegación
  - Ningún dato personal

### 🚀 **Funcionalidades**

- **Escaneo Automático**: Encuentra automáticamente tu smartwatch X3
- **Conexión Bluetooth Nativa**: Utiliza Bluetooth LE nativo de Android
- **Monitor de Batería**: Visualiza el nivel de batería del reloj en tiempo real
- **Sincronización de Datos**: Obtén tus pasos, frecuencia cardíaca y datos de actividad
- **Interfaz Moderna**: Diseño nativo con Material Design
- **Rendimiento Superior**: Aplicación nativa, sin overhead del navegador
- **Lista de Dispositivos**: Muestra todos los dispositivos X3 cercanos

---

## 📱 Requisitos

- **Android 6.0 (API 23)** o superior
- **Bluetooth LE** (todos los dispositivos modernos lo tienen)
- Smartwatch X3 compatible con Bluetooth LE
- **~15MB** de espacio en el dispositivo

---

## 🚀 Instalación y Compilación

### Requisitos de desarrollo:

```bash
# Node.js 18 o superior
node --version

# React Native CLI
npm install -g react-native-cli

# Android Studio con SDK (para compilar)
```

### Pasos para compilar:

1. **Clonar el repositorio**:
   ```bash
   git clone <repo-url>
   cd -react_learning_part2
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Iniciar Metro Bundler**:
   ```bash
   npm start
   # o
   yarn start
   ```

4. **Compilar y ejecutar en Android** (en otra terminal):
   ```bash
   npm run android
   # o
   yarn android
   ```

### Generar APK de producción:

```bash
cd android
./gradlew assembleRelease

# El APK estará en:
# android/app/build/outputs/apk/release/app-release.apk
```

---

## 📖 Cómo Usar

### Primera vez - Dar permisos

1. **Instala la app** en tu dispositivo Android
2. Al abrir, la app solicitará **solo permisos de Bluetooth**
3. Acepta los permisos (son necesarios para conectar con el smartwatch)

### Conectar tu Smartwatch

1. **Enciende el Bluetooth** en tu teléfono
2. **Asegúrate** de que tu smartwatch X3 esté encendido y cerca (máximo 2 metros)
3. Toca **"Buscar Smartwatch"**
4. La app escaneará automáticamente dispositivos cercanos
5. Verás una lista de dispositivos X3 encontrados
6. Toca el nombre de tu smartwatch en la lista
7. ¡Listo! Verás el estado "Conectado" y la batería

### Sincronizar Datos

1. Una vez conectado, toca **"Sincronizar Datos"**
2. La app obtendrá:
   - 👟 **Pasos del día**
   - ❤️ **Frecuencia cardíaca** (BPM)
   - 🔋 **Nivel de batería**
   - ⌚ **Nombre del dispositivo**
3. Los datos se mostrarán en tarjetas visuales

### Desconectar

- Toca **"Desconectar"** cuando termines de usar la app
- Esto ahorrará batería tanto en tu teléfono como en el smartwatch
- El smartwatch se desconectará automáticamente también

---

## 🔐 Comparativa de Permisos: X3 Lite vs GL Wear

| Permiso                    | GL Wear | X3 Lite |
|----------------------------|---------|---------|
| Bluetooth Scan             | ✅      | ✅      |
| Bluetooth Connect          | ✅      | ✅      |
| Ubicación GPS precisa      | ✅      | ❌*     |
| Ubicación en segundo plano | ✅      | ❌      |
| Contactos                  | ✅      | ❌      |
| Llamadas telefónicas       | ✅      | ❌      |
| SMS                        | ✅      | ❌      |
| Almacenamiento             | ✅      | ❌      |
| Cámara                     | ✅      | ❌      |
| Micrófono                  | ✅      | ❌      |
| Historial de navegación    | ✅      | ❌      |
| Cuentas del dispositivo    | ✅      | ❌      |

**\*Nota sobre ubicación**: En Android 10 y anteriores, el sistema requiere permiso de ubicación para escanear Bluetooth LE. **X3 Lite NO usa tu ubicación** - es solo un requisito del sistema operativo. En Android 12+, X3 Lite usa el flag `neverForLocation` para aclarar que NO necesita ubicación.

**Resultado**: X3 Lite requiere **2 permisos reales** vs **12+ permisos** de GL Wear

---

## 🛠️ Tecnologías Utilizadas

- **React Native 0.73** - Framework para apps nativas
- **react-native-ble-manager 11.5.0** - Librería Bluetooth LE nativa
- **react-native-permissions 4.1.0** - Gestión de permisos
- **Android Bluetooth LE API** - Conexión nativa con el smartwatch

---

## 🏗️ Arquitectura del Proyecto

```
smartwatch-x3-lite/
├── App.js                          # Componente raíz
├── src/
│   └── SmartwatchApp.native.js    # Componente principal con lógica BLE
├── android/
│   ├── app/
│   │   ├── src/main/
│   │   │   └── AndroidManifest.xml # ⭐ Solo permisos Bluetooth
│   │   └── build.gradle
│   └── build.gradle
├── index.js                        # Punto de entrada
├── app.json                        # Configuración de la app
├── package.json                    # Dependencias
└── SMARTWATCH_X3_LITE.md          # Esta documentación
```

---

## ⚠️ Limitaciones Conocidas

- **Solo Android**: React Native también soporta iOS, pero Apple restringe mucho el acceso a Bluetooth en segundo plano
- **Funcionalidades específicas del X3**: Algunas características pueden variar según el modelo exacto de tu smartwatch (el protocolo Bluetooth puede ser diferente)
- **Sincronización de notificaciones**: Actualmente no soportada (requeriría permisos de notificaciones)
- **UUIDs de servicios**: Los UUIDs usados son estándar (Battery Service, Heart Rate, etc.). Algunos smartwatches X3 pueden usar UUIDs propietarios

---

## 🔮 Funcionalidades Futuras

- [ ] Monitor de frecuencia cardíaca en tiempo real (gráfica en vivo)
- [ ] Registro histórico de actividad con gráficas
- [ ] Configuración de alarmas del smartwatch
- [ ] Personalización de watchfaces (carátulas)
- [ ] Modo oscuro/claro
- [ ] Múltiples idiomas (inglés, español, etc.)
- [ ] Notificaciones de batería baja
- [ ] Exportar datos a CSV/JSON
- [ ] Soporte para iOS (si es posible)

---

## 🐛 Solución de Problemas

### "No se encuentra ningún dispositivo"
- **Solución**:
  - Asegúrate de que el Bluetooth esté activado en el teléfono
  - Verifica que el smartwatch esté encendido y cerca (máximo 2 metros)
  - En el smartwatch, ve a configuración → Bluetooth y asegúrate de que esté visible
  - Reinicia el smartwatch
  - Cierra y vuelve a abrir la app

### "Error al conectar / Conexión fallida"
- **Solución**:
  - Desvincula el dispositivo de **Configuración → Bluetooth de Android** (olvídalo)
  - Reinicia el Bluetooth del teléfono
  - Reinicia la app
  - Si el problema persiste, reinicia tanto el teléfono como el smartwatch

### "La batería no se muestra (N/A)"
- **Solución**:
  - Es normal en algunos modelos X3 que no implementan el Battery Service estándar
  - La conexión Bluetooth sigue funcionando correctamente
  - Puedes sincronizar otros datos igualmente

### "Permisos denegados"
- **Solución**:
  - Ve a **Configuración → Apps → Smartwatch X3 Lite → Permisos**
  - Activa los permisos de Bluetooth
  - Reinicia la app

### "La app se cierra al escanear"
- **Solución**:
  - Verifica que tengas Android 6.0 o superior
  - Asegúrate de haber otorgado los permisos necesarios
  - Revisa los logs: `adb logcat | grep "X3Lite"`

---

## 🔧 Desarrollo y Debugging

### Ver logs en tiempo real:

```bash
# Todos los logs
npx react-native log-android

# Solo logs de la app
adb logcat | grep "X3Lite"

# Logs de Bluetooth
adb logcat | grep "BleManager"
```

### Limpiar caché:

```bash
# Limpiar Metro Bundler
npm start -- --reset-cache

# Limpiar build de Android
cd android && ./gradlew clean && cd ..
```

### Modo desarrollo:

- Agita el dispositivo para abrir el menú de desarrollo
- Activa **"Hot Reloading"** para ver cambios en tiempo real

---

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo licencia MIT.

---

## 🤝 Contribuciones

¿Encontraste un bug? ¿Tienes una idea para mejorar la app? ¿Conoces los UUIDs específicos del X3?

1. Abre un issue describiendo el problema o mejora
2. Haz un fork del proyecto
3. Crea una rama para tu feature (`git checkout -b feature/MejorFeature`)
4. Commit tus cambios (`git commit -m 'Añadir MejorFeature'`)
5. Push a la rama (`git push origin feature/MejorFeature`)
6. Abre un Pull Request

### Áreas donde necesitamos ayuda:

- **UUIDs específicos del X3**: Si tienes un smartwatch X3 y conoces los UUIDs exactos de sus servicios Bluetooth
- **Pruebas en diferentes modelos**: Probar en diferentes versiones del X3 (X3 Pro, X3 Plus, etc.)
- **Traducciones**: Agregar soporte para más idiomas
- **Iconos y diseño**: Mejorar la UI/UX

---

## 📞 Soporte

Si tienes preguntas o problemas:
- Abre un issue en GitHub con detalles de tu dispositivo (modelo de teléfono, versión de Android, modelo de smartwatch)
- Revisa la sección de **Solución de Problemas** arriba
- Incluye logs si es posible: `adb logcat | grep "X3Lite"`

---

## 📚 Referencias Técnicas

### Servicios Bluetooth LE usados:

- **Battery Service**: `0000180F-0000-1000-8000-00805F9B34FB`
  - Battery Level: `00002A19-0000-1000-8000-00805F9B34FB`
- **Heart Rate Service**: `0000180D-0000-1000-8000-00805F9B34FB`
  - Heart Rate Measurement: `00002A37-0000-1000-8000-00805F9B34FB`
- **Device Information**: `0000180A-0000-1000-8000-00805F9B34FB`

Estos son UUIDs estándar de Bluetooth SIG. Si tu X3 usa UUIDs propietarios, por favor repórtalos en un issue.

---

## ⭐ Agradecimientos

Gracias por elegir X3 Lite - una aplicación que respeta tu privacidad mientras te mantiene conectado con tu smartwatch.

**¡Disfruta de tu experiencia nativa y libre de permisos invasivos!** 🎉

---

## 🆚 Versiones

- **v1.0.0** (Actual) - Versión React Native con permisos mínimos
  - Escaneo y conexión Bluetooth LE
  - Monitor de batería
  - Sincronización de pasos y frecuencia cardíaca
  - Interfaz nativa Android

---

**Made with ❤️ for privacy-conscious smartwatch users**
