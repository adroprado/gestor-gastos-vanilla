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
let opciones = { style: "currency", currency: "MXN" },
  formatoNumero = new Intl.NumberFormat("es-MX", opciones);

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
  // Limpia el contenido actual de la tabla para evitar duplicados
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

// Arrow function: elimina un elemento por medio del id
const eliminarGasto = (e) => {
  const ID = e.target.dataset.id;
  if (e.target.matches(".btn-eliminar")) {
    baseDeDatosInicial = baseDeDatosInicial.filter((el) => {
      if (el.id !== Number(ID)) {
        return el;
      }
    });
    gastosSet();
    leerGastos();
  }
};

// Suma el total de los gastos
const totalCalculado = baseDeDatosInicial.reduce((acumulador, el) => {
  let numero = parseFloat(el.cantidad);

  acumulador += numero;
  return acumulador;
}, 0);
$total.insertAdjacentText(
  "afterbegin",
  `Total de Gastos: ${formatoNumero.format(totalCalculado)}`
);

d.addEventListener("DOMContentLoaded", leerGastos, totalCalculado);

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  const ID = e.target.elements.id.value;

  //Si el id oculto no tiene valor, vamos a crearGasto, de lo contrario editarGasto.
  if (!ID) {
    crearGasto();
    gastosSet();
    leerGastos();
  } else {
    // Inmutabilidad al editar un elemento
    const elementoAEditar = baseDeDatosInicial.map((el) =>
      el.id === Number(ID)
        ? {
            ...el,
            nombre: d.querySelector(".nombre").value,
            cantidad: d.querySelector(".monto").value,
          }
        : el
    );
    baseDeDatosInicial = elementoAEditar;

    gastosSet();
    leerGastos();
    $form.reset();
    d.querySelector("h2").textContent = "Agregar Gasto";
    $form.querySelector("input[name='id']").value = "";
  }
});

d.addEventListener("click", (e) => {
  editarGasto(e);
  eliminarGasto(e);
});
