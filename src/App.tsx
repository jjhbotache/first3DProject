import DeviceRow from "./components/DeviceRow"

function App() {

  return (
    <>
    <DeviceRow 
      title="Arduino Nano" 
      text="El Arduino Nano utiliza el microcontrolador ATmega328, el cual ofrece 32 KB de memoria flash y 2 KB de SRAM. Este microcontrolador de 8 bits es ideal para proyectos de control de sistemas, robótica, y sensores, permitiendo programar en C/C++ a través del entorno de desarrollo Arduino IDE. Su tamaño compacto lo hace perfecto para aplicaciones donde el espacio es limitado, mientras mantiene todas las funcionalidades de un Arduino estándar." 
      modelPath="/3dModels/arduinoNano.glb"
    />
    <DeviceRow 
      title="ESP32" 
      text="El ESP32 es un microcontrolador de 32 bits que integra conectividad Wi-Fi y Bluetooth, basado en el procesador Xtensa dual-core. Con una frecuencia de reloj de hasta 240 MHz y 520 KB de SRAM, el ESP32 es capaz de ejecutar aplicaciones complejas de IoT, redes inalámbricas y sistemas embebidos. Su capacidad de bajo consumo de energía, junto con su soporte para modos de suspensión profunda, lo convierte en una excelente opción para proyectos de monitoreo remoto y automatización." 
      modelPath="/3dModels/esp32.glb"
    />
    <DeviceRow 
      title="Raspberry Pi Pico" 
      text="El Raspberry Pi Pico está impulsado por el microcontrolador RP2040, diseñado por Raspberry Pi. Este chip cuenta con un procesador dual-core ARM Cortex-M0+ que corre a 133 MHz, 264 KB de SRAM y soporte para hasta 16 MB de memoria flash externa. A pesar de ser eficiente en consumo de energía, el RP2040 ofrece gran flexibilidad para aplicaciones en tiempo real y control de periféricos. Es una excelente opción para proyectos de sistemas embebidos, gracias a su capacidad para manejar múltiples tareas simultáneamente." 
      modelPath="/3dModels/raspberrypipico.glb" 
    />

    </>
  )
}

export default App
