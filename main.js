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
  baseDeDatos.forEach((el) => {
    let $clon = d.importNode($plantilla, true);
    $clon.querySelector(".nombre").textContent = el.nombre;
    $clon.querySelector(".monto").textContent = el.cantidad;
    $clon.querySelector(".btn-editar").dataset.id = el.id;
    $clon.querySelector(".btn-eliminar").dataset.id = el.id;
    $fragmento.appendChild($clon);
  });

  $tabla.querySelector("tbody").appendChild($fragmento);
};
// Arrow function: pase de elementos al formulario con su respectivo id para editar
const editarGasto = (e) => {
  if (e.target.matches(".btn-editar")) {
    d.querySelector("h2").textContent = "Editar Gasto";

    // Obteniendo id del dataset que le pasmos al botón "Editar"
    const ID = e.target.dataset.id;
    console.log(ID);

    baseDeDatosInicial.find((el) => {
      console.log(el.id);
      console.log(el);
      if (el.id === Number(ID)) {
        // .nombre, .monto, .id. No esta accediendo a la clase, esta obteniendo como referencia el atributo "name", para agregarle el valor
        $form.nombre.value = el.nombre;
        $form.monto.value = el.cantidad;
        $form.id.value = el.id;
      }
    });
  }
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

d.addEventListener("click", (e) => {
  editarGasto(e);
});
