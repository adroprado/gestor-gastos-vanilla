// Variables que referencían elementos del DOM
const d = document,
  $form = d.querySelector(".form"),
  $tabla = d.querySelector(".tabla"),
  $total = d.querySelector(".monto-total"),
  $plantilla = d.querySelector(".plantilla").content,
  $fragmento = d.createDocumentFragment();

// Variables globales
const ls = localStorage;
let baseDeDatosInicial = [];

// Arrow function (función expresada): almacena elementos en la DB. Y limpia formulario
const crearGasto = () => {
  const informacionDelUsuario = {
    id: Date.now(),
    nombre: $form.querySelector(".nombre").value,
    cantidad: $form.querySelector(".monto").value,
  };

  const nuevoGasto = [...baseDeDatosInicial, informacionDelUsuario];
  baseDeDatosInicial = nuevoGasto;

  $form.reset();
};

// Arrow function: manejo de persistencia de datos en localStorage
const gastosSet = () =>
  ls.setItem("gastos", JSON.stringify(baseDeDatosInicial));

// Arrow function: extracción de datos del localStorage
const gastosGet = () => {
  let datosDeLS = JSON.parse(ls.getItem("gastos"));
  baseDeDatosInicial = datosDeLS || [];
};

gastosGet();

// Arrow function: lectura de DB y agregando elementos al DOM
const leerGastos = (baseDeDatos) => {
  console.log(baseDeDatos);
  baseDeDatos.forEach((el) => {
    let $clon = d.importNode($plantilla, true);
    $clon.querySelector(".nombre").textContent = el.nombre;
    $clon.querySelector(".monto").textContent = el.cantidad;

    $fragmento.appendChild($clon);
  });

  $tabla.querySelector("tbody").appendChild($fragmento);
};

d.addEventListener("DOMContentLoaded", () => {
  leerGastos(baseDeDatosInicial);
});

// Manejo de delegación de eventos
d.addEventListener("submit", (e) => {
  if (e.target === $form) {
    e.preventDefault();
    crearGasto();
    gastosSet();
  }
});
