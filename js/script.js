let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
document.getElementById('contador').textContent = carrito.length;

function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  guardarCarrito();
  document.getElementById('contador').textContent = carrito.length;
  mostrarToast();
}

function mostrarCarrito() {
  const modal = document.getElementById('modalCarrito');
  const lista = document.getElementById('listaCarrito');
  const btnAccion = document.getElementById('btnCarritoAccion');
  const totalSpan = document.getElementById('totalCarrito');

  lista.innerHTML = '';
  let total = 0;

  if (carrito.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'Tu carrito está vacío.';
    lista.appendChild(li);
    totalSpan.textContent = "$0.00";

    btnAccion.textContent = 'Agregar';
    btnAccion.onclick = () => cambiarSeccion('comprar');
  } else {
    carrito.forEach((item, index) => {
  const precio = parseFloat(item.precio);
  if (isNaN(precio)) return; // Si no es número, lo ignora

  total += precio;
  const li = document.createElement('li');
  li.innerHTML = `${item.nombre} - $${precio.toFixed(2)} 
    <button onclick="quitar(${index})" class="pop">Quitar</button>`;
  lista.appendChild(li);
});

    totalSpan.textContent = `$${total.toFixed(2)}`;
    btnAccion.textContent = 'Pagar ahora';
    btnAccion.onclick = pagarAhora;
  }

  modal.classList.add('active');
}

function quitar(i) {
  carrito.splice(i, 1);
  guardarCarrito();
  document.getElementById('contador').textContent = carrito.length;
  mostrarCarrito();
}

function cerrarCarrito() {
  document.getElementById('modalCarrito').classList.remove('active');
}

function pagarAhora() {
  alert("En este momento no se puede proceder al pago. Por favor, inténtalo más tarde.");
}

  function cambiarSeccion(id) {
    document.querySelectorAll('.seccion').forEach(sec => sec.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(tab => {
      if (tab.textContent.toLowerCase() === id) tab.classList.add('active');
    });
  }

    function autoScrollCarrusel(id) {
    const carrusel = document.getElementById(id);
    let scrollPos = 0;
    setInterval(() => {
      scrollPos += carrusel.offsetWidth + 20;
      if (scrollPos >= carrusel.scrollWidth - carrusel.clientWidth) scrollPos = 0;
      carrusel.scrollTo({ left: scrollPos, behavior: 'smooth' });
    }, 4000);
  }
  autoScrollCarrusel('galeria1');
  autoScrollCarrusel('galeria2');

  document.getElementById('abrirTerminos').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('modalTerminos').style.display = 'block';
  });

  document.getElementById('abrirPrivacidad').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('modalPrivacidad').style.display = 'block';
  });

  function cerrarModal(id) {
    document.getElementById(id).style.display = 'none';
  }

  // Cerrar al hacer clic fuera del modal
  window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
      e.target.style.display = 'none';
    }
  });

  function mostrarToast() {
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000); // Desaparece en 2 segundos
}
