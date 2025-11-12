# 🏃 Smartwatch X3 Lite

## Aplicación Minimalista para Smartwatch X3

Una alternativa ligera y respetuosa con la privacidad a GL Wear, diseñada específicamente para smartwatches X3.

---

## ✨ Características Principales

### 🔒 **Permisos Mínimos**
- ✅ **Solo requiere Bluetooth** para conectar con tu smartwatch
- ❌ **NO requiere**:
  - Ubicación GPS
  - Acceso a contactos
  - Acceso a llamadas telefónicas
  - Acceso a SMS
  - Almacenamiento externo
  - Cámara
  - Micrófono
  - Historial de navegación

### 🚀 **Funcionalidades**

- **Conexión Bluetooth Simple**: Conecta tu smartwatch X3 con un solo clic
- **Monitor de Batería**: Visualiza el nivel de batería del reloj en tiempo real
- **Sincronización de Datos**: Obtén tus pasos y datos de actividad
- **Interfaz Moderna**: Diseño limpio y fácil de usar
- **Progressive Web App (PWA)**: Instálala en tu teléfono como una app nativa

---

## 📱 Requisitos

- Navegador web moderno con soporte para Web Bluetooth API:
  - Chrome/Chromium 56+ (Android/Desktop)
  - Edge 79+
  - Opera 43+
  - Samsung Internet 6.0+
- Smartwatch X3 compatible con Bluetooth LE
- Android 6.0+ o iOS no soporta Web Bluetooth (requiere Chrome en Android)

---

## 🚀 Instalación y Uso

### Opción 1: Ejecutar localmente

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

3. **Iniciar la aplicación**:
   ```bash
   npm start
   # o
   yarn start
   ```

4. **Abrir en el navegador**:
   - La aplicación se abrirá automáticamente en `http://localhost:3000`
   - **IMPORTANTE**: Para usar Bluetooth, necesitas acceder desde HTTPS o localhost

### Opción 2: Instalar como PWA

1. Abre la aplicación en Chrome (Android)
2. Toca el menú (⋮) → "Añadir a pantalla de inicio"
3. La app se instalará como una aplicación nativa

---

## 📖 Cómo Usar

### Conectar tu Smartwatch

1. **Enciende el Bluetooth** en tu teléfono
2. **Asegúrate** de que tu smartwatch X3 esté encendido y cerca
3. Haz clic en **"Conectar Smartwatch"**
4. Selecciona tu dispositivo X3 de la lista
5. ¡Listo! Verás el estado de conexión y la batería

### Sincronizar Datos

1. Una vez conectado, haz clic en **"Sincronizar Datos"**
2. La app obtendrá tus pasos y otra información del smartwatch
3. Los datos se mostrarán en las tarjetas de información

### Desconectar

- Haz clic en **"Desconectar"** cuando termines de usar la app
- Esto ahorrará batería tanto en tu teléfono como en el smartwatch

---

## 🔐 Comparativa de Permisos: X3 Lite vs GL Wear

| Permiso                    | GL Wear | X3 Lite |
|----------------------------|---------|---------|
| Bluetooth                  | ✅      | ✅      |
| Ubicación GPS              | ✅      | ❌      |
| Contactos                  | ✅      | ❌      |
| Llamadas telefónicas       | ✅      | ❌      |
| SMS                        | ✅      | ❌      |
| Almacenamiento             | ✅      | ❌      |
| Cámara                     | ✅      | ❌      |
| Micrófono                  | ✅      | ❌      |
| Historial de navegación    | ✅      | ❌      |

**Resultado**: X3 Lite requiere **1 permiso** vs **9+ permisos** de GL Wear

---

## 🛠️ Tecnologías Utilizadas

- **React 15.6.1** - Framework UI
- **Web Bluetooth API** - Conexión con smartwatch
- **Progressive Web App (PWA)** - Instalación nativa
- **CSS3** - Diseño moderno y responsivo

---

## ⚠️ Limitaciones Conocidas

- **iOS no soporta Web Bluetooth**: Requiere Android con Chrome
- **Funcionalidades específicas del X3**: Algunas características pueden variar según el modelo exacto de tu smartwatch
- **Sincronización de notificaciones**: Actualmente no soportada (requeriría permisos adicionales)

---

## 🔮 Funcionalidades Futuras

- [ ] Monitor de frecuencia cardíaca en tiempo real
- [ ] Registro histórico de actividad
- [ ] Configuración de alarmas
- [ ] Personalización de watchfaces (carátulas)
- [ ] Modo oscuro/claro
- [ ] Múltiples idiomas

---

## 🐛 Solución de Problemas

### "No se encuentra el dispositivo"
- Asegúrate de que el Bluetooth esté activado
- Verifica que el smartwatch esté encendido y cerca
- Intenta reiniciar el Bluetooth en tu teléfono

### "Error al conectar"
- Desvincula el dispositivo de la configuración Bluetooth de Android
- Reinicia la aplicación
- Reinicia el smartwatch

### "La batería no se muestra"
- Algunos modelos X3 pueden no reportar la batería correctamente
- Intenta desconectar y reconectar

---

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo licencia MIT.

---

## 🤝 Contribuciones

¿Encontraste un bug? ¿Tienes una idea para mejorar la app?

1. Abre un issue describiendo el problema o mejora
2. Haz un fork del proyecto
3. Crea una rama para tu feature (`git checkout -b feature/MejorFeature`)
4. Commit tus cambios (`git commit -m 'Añadir MejorFeature'`)
5. Push a la rama (`git push origin feature/MejorFeature`)
6. Abre un Pull Request

---

## 📞 Soporte

Si tienes preguntas o problemas:
- Abre un issue en GitHub
- Revisa la sección de problemas comunes arriba

---

## ⭐ Agradecimientos

Gracias por elegir X3 Lite - una aplicación que respeta tu privacidad mientras te mantiene conectado con tu smartwatch.

**¡Disfruta de tu experiencia libre de permisos invasivos!** 🎉
