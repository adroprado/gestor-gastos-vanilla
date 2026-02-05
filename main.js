// --- Importación de Módulos ---
import menuNavegacion from './js/menu-navegacion.js';

// --- Ejecución de Código ---
document.addEventListener('DOMContentLoaded', (e) => {
  menuNavegacion(
    '.btn-nav-gastos',
    '.btn-nav-estadisticas',
    '.contenedor-gastos ',
    '.contenedor-estadisticas',
  );
});
