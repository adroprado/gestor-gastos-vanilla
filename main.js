const d = document,
  $form = d.querySelector(".form"),
  $table = d.querySelector(".tabla"),
  $total = d.querySelector(".monto-total"),
  $template = d.querySelector(".plantilla").content,
  $fragment = d.createDocumentFragment();

const ls = localStorage;
let baseDeDatosInicial = [];

const crearGasto = () => {
  const informacionDelUsuario = {
    id: Date.now(),
    nombre: $form.querySelector(".nombre").value,
    cantidad: $form.querySelector(".monto").value,
  };

  const nuevoGasto = [...baseDeDatosInicial, informacionDelUsuario];
  baseDeDatosInicial = nuevoGasto;

  $form.reset();
  console.log(nuevoGasto);
};

d.addEventListener("submit", (e) => {
  if (e.target === $form) {
    e.preventDefault();

    crearGasto();
  }
});
console.log(baseDeDatosInicial);
