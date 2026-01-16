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
const leerGastos = () => {
  $tabla.querySelector("tbody").innerHTML = "";
  baseDeDatosInicial.forEach((el) => {
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

    baseDeDatosInicial.find((el) => {
      if (el.id === Number(ID)) {
        // .nombre, .monto, .id. No esta accediendo a la clase, esta obteniendo como referencia el atributo "name", para agregarle el valor
        $form.nombre.value = el.nombre;
        $form.monto.value = el.cantidad;
        $form.id.value = el.id;
      }
    });
  }
};

d.addEventListener("DOMContentLoaded", leerGastos);

// Manejo de delegación de eventos
$form.addEventListener("submit", (e) => {
  e.preventDefault();
  const ID = e.target.elements.id.value;

  if (!ID) {
    crearGasto();
    gastosSet();
    leerGastos();
  } else {
    baseDeDatosInicial = baseDeDatosInicial.map((el) => {
      if (el.id === Number(ID)) {
        el.nombre = d.querySelector(".nombre").value;
        el.cantidad = d.querySelector(".monto").value;
      }
      return el;
    });

    gastosSet();
    leerGastos();
    $form.reset();
    d.querySelector("h2").textContent = "Agregar Gasto";
    $form.querySelector("input[name='id']").value = "";
  }
});

d.addEventListener("click", (e) => {
  editarGasto(e);
});
