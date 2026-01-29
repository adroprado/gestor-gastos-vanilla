// --- Importación de Módulos ---
import {
  registrarGastoEnMemoria,
  actualizarInterfazGastos,
  cargarGastosEnLocal,
} from "./js/formulario.js";

// --- Ejecución de Código ---
(registrarGastoEnMemoria(),
  document.addEventListener(
    "DOMContentLoaded",
    actualizarInterfazGastos,
    cargarGastosEnLocal(),
  ));
