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
  console.log(baseDeDatosInicial);
};

// Arrow function: manejo de persistencia de datos en localStorage
const gastosSetItemLS = () =>
  ls.setItem("gastos", JSON.stringify(baseDeDatosInicial));

// Arrow function: extracción de datos del localStorage
const gastosGetItemLS = () => JSON.parse(ls.getItem("gastos"));

gastosGetItemLS();

// Manejo de delegación de eventos
d.addEventListener("submit", (e) => {
  if (e.target === $form) {
    e.preventDefault();

    crearGasto();
    gastosSetItemLS();
  }
});
