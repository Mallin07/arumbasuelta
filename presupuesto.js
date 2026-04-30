const PRECIO_BASE = 300;

const totalElemento = document.getElementById("total");
const totalBaseEl = document.getElementById("total-base");
const ivaEl = document.getElementById("iva");
const ivaLinea = document.getElementById("iva-linea");
const factura = document.getElementById("factura");

const formacion = document.getElementById("formacion");
const provincia = document.getElementById("provincia");
const comarcaBarcelona = document.getElementById("comarca-barcelona");

const tipoEvento = document.getElementById("tipo-evento");
const equipoInstitucion = document.getElementById("equipo-institucion");

const duracion = document.getElementById("duracion");

const acepto = document.getElementById("acepto");
const botonEnviar = document.querySelector(".btn-enviar");

const verCondiciones = document.getElementById("ver-condiciones");
const overlay = document.getElementById("overlay-condiciones");
const cerrarOverlay = document.getElementById("cerrar-overlay");

function calcularPresupuesto() {
  let total = PRECIO_BASE;
  const musicos = Number(formacion.value);

  const selects = document.querySelectorAll("select");

  selects.forEach(select => {
    if (select.closest(".oculto")) return;

    const opcion = select.options[select.selectedIndex];

    const precio = Number(opcion.dataset.precio || 0);
    const precioMusico = Number(opcion.dataset.precioMusico || 0);

    total += precio;
    total += precioMusico * musicos;
  });

  totalBaseEl.textContent = `${total} €`;

  if (factura.checked) {
    const iva = total * 0.21;
    const totalFinal = total + iva;
  
    ivaEl.textContent = `${iva.toFixed(2)} €`;
    totalElemento.textContent = `${totalFinal.toFixed(2)} €`;
    ivaLinea.classList.remove("oculto");
  } else {
    ivaEl.textContent = `0 €`;
    totalElemento.textContent = `${total} €`;
    ivaLinea.classList.add("oculto");
  }
}

function controlarComarcaBarcelona() {
  if (provincia.value === "barcelona") {
    comarcaBarcelona.classList.remove("oculto");
  } else {
    comarcaBarcelona.classList.add("oculto");
  }
}

function controlarEquipoInstitucion() {
  if (tipoEvento.value === "institucion") {
    equipoInstitucion.classList.remove("oculto");
  } else {
    equipoInstitucion.classList.add("oculto");
  }
}

function controlarDuracionPorFormacion() {
  const esTrio = formacion.value === "3";

  const opcion1h40 = duracion.querySelector('option[value="100"]');
  const opcion2h = duracion.querySelector('option[value="120"]');

  opcion1h40.disabled = esTrio;
  opcion2h.disabled = esTrio;

  if (esTrio && (duracion.value === "100" || duracion.value === "120")) {
    duracion.value = "80";
  }
}

document.addEventListener("change", event => {
  if (event.target.tagName === "SELECT") {
    controlarComarcaBarcelona();
    controlarEquipoInstitucion();
    controlarDuracionPorFormacion();
    calcularPresupuesto();
  }
});

factura.addEventListener("change", calcularPresupuesto);

acepto.addEventListener("change", () => {
  botonEnviar.disabled = !acepto.checked;
});

verCondiciones.addEventListener("click", () => {
  overlay.classList.remove("oculto");
});

cerrarOverlay.addEventListener("click", () => {
  overlay.classList.add("oculto");
});

controlarComarcaBarcelona();
controlarEquipoInstitucion();
controlarDuracionPorFormacion();
calcularPresupuesto();