export default function menuNavegacion(
  btnGastos,
  btnEstadisticas,
  tablaGastos,
  tablaEstadisticas,
) {
  const d = document;

  d.addEventListener('click', (e) => {
    if (e.target.matches(btnGastos)) {
      // Acción de botón "Gastos"
      d.querySelector(btnGastos).classList.add('activo');
      d.querySelector(btnEstadisticas).classList.remove('activo');
      // Acción de tabla "Gastos"
      d.querySelector(tablaGastos).classList.add('activo');
      d.querySelector(tablaEstadisticas).classList.remove('activo');
    }

    if (e.target.matches(btnEstadisticas)) {
      // Acción de botón "Estadísticas"
      d.querySelector(btnEstadisticas).classList.add('activo');
      d.querySelector(btnGastos).classList.remove('activo');
      // Acción de tabla "Estadísticas"
      d.querySelector(tablaEstadisticas).classList.add('activo');
      d.querySelector(tablaGastos).classList.remove('activo');
    }
  });
}
