// ==========================================
// 1. BASE DE DATOS DE SITUACIONES (IFAB)
// ==========================================
const situacionesDB = [
    {
        id: 1,
        tipo: "Entrada Brusca",
        descripcion: "Un defensor se tira al suelo a destiempo para disputar el balón y golpea fuertemente con los tacos en la espinilla del rival con fuerza desmedida.",
        posX: 150,
        posY: 90,
        decisionCorrecta: "Falta + Tarjeta Roja",
        explicacion: "Regla 12: Las entradas que pongan en peligro la integridad física de un adversario o con fuerza desmedida deben ser sancionadas como juego brusco grave (Tarjeta Roja)."
    },
    {
        id: 2,
        tipo: "Agarrón Táctico",
        descripcion: "Un delantero avanza en un contraataque prometedor hacia el área rival y el defensor lo agarra persistentemente de la camiseta para frenarlo.",
        posX: 210,
        posY: 200,
        decisionCorrecta: "Falta + Tarjeta Amarilla",
        explicacion: "Regla 12: Cometer una infracción por contacto (agarrón) para interferir o cortar un ataque prometedor se sancionará con Tarjeta Amarilla."
    },
    {
        id: 3,
        tipo: "Carga Reglamentaria",
        descripcion: "Dos jugadores disputan un balón dividido hombro con hombro de manera reglamentaria, usando fuerza moderada y sin emplear los codos.",
        posX: 100,
        posY: 230,
        decisionCorrecta: "No hay falta",
        explicacion: "Regla 12: La carga hombro con hombro está permitida siempre que se realice disputando la posición del balón de manera legal y sin fuerza desproporcionada."
    },
    {
        id: 4,
        tipo: "Mano en el Área",
        descripcion: "Un defensor salta a bloquear un centro con los brazos abiertos de forma antinatural, ocupando más espacio. El balón impacta directamente en su mano.",
        posX: 300,
        posY: 180,
        decisionCorrecta: "Falta + Tarjeta Amarilla",
        explicacion: "Regla 12: Se considera infracción si un jugador toca el balón con la mano/brazo haciendo que su cuerpo ocupe más espacio de manera antinatural. Al cortar un tiro/centro peligroso en el área, sanciona penal y amonestación."
    },
    {
        id: 5,
        tipo: "Mano Accidental en Apoyo",
        descripcion: "Un jugador cae al suelo tras una entrada y apoya su mano para amortiguar la caída. El balón rueda y toca accidentalmente su mano apoyada.",
        posX: 250,
        posY: 120,
        decisionCorrecta: "No hay falta",
        explicacion: "Regla 12: No se considerará infracción si la mano o el brazo están entre el cuerpo y el suelo para apoyar el cuerpo durante la caída de forma natural."
    },
    {
        id: 6,
        tipo: "Fuera de Juego Pasivo",
        descripcion: "Un atacante está en posición de fuera de juego pero permanece inmóvil. Su compañero dispara a puerta desde lejos y marca gol directamente.",
        posX: 280,
        posY: 80,
        decisionCorrecta: "No hay falta",
        explicacion: "Regla 11: Estar en posición de fuera de juego no es infracción por sí solo si el jugador no interviene en el juego, no interfiere a un adversario ni saca ventaja de su posición."
    },
    {
        id: 7,
        tipo: "Uso de Codos en Salto",
        descripcion: "Dos jugadores saltan por un balón aéreo. Uno de ellos abre voluntariamente el codo golpeando la cara del adversario sin disputa limpia.",
        posX: 180,
        posY: 150,
        decisionCorrecta: "Falta + Tarjeta Roja",
        explicacion: "Regla 12: El uso de los brazos/codos como arma contra la cabeza o cara de un rival se considera conducta violenta o juego brusco grave (Tarjeta Roja)."
    },
    {
        id: 8,
        tipo: "Zancadilla Leve",
        descripcion: "En el medio campo, un mediocentro mete el pie tarde tropezando involuntariamente al rival, en una jugada sin peligro inminente de gol.",
        posX: 160,
        posY: 220,
        decisionCorrecta: "Falta",
        explicacion: "Regla 12: La impudencia al disputar el balón mediante una zancadilla se sanciona con libre directo sin necesidad de tarjeta disciplinaria si no corta un ataque prometedor."
    },
    {
        id: 9,
        tipo: "Sustituto en el Campo",
        descripcion: "Un jugador sustituto entra al terreno de juego sin permiso del árbitro e intercepta un pase antes de que el balón salga del campo.",
        posX: 220,
        posY: 100,
        decisionCorrecta: "Falta + Tarjeta Amarilla",
        explicacion: "Regla 3: Si un sustituto entra al campo sin autorización e interfiere en el juego, se sancionará con libre directo/penal y amonestación (Tarjeta Amarilla)."
    },
    {
        id: 10,
        tipo: "Interferencia al Guardameta",
        descripcion: "Un atacante se coloca justo delante del portero rival e impide que este saque rápidamente con las manos interponiéndose en su trayectoria.",
        posX: 320,
        posY: 210,
        decisionCorrecta: "Falta + Tarjeta Amarilla",
        explicacion: "Regla 12: Se sancionará con amonestación (Tarjeta Amarilla) e libre indirecto al jugador que impida al guardameta sacar el balón con las manos."
    }
];

// ==========================================
// 2. ESTADO DEL USUARIO (Con localStorage)
// ==========================================
let usuarioState = JSON.parse(localStorage.getItem('refsim_user')) || {
    puntos: 0,
    aciertos: 0,
    totalJugadas: 0,
    racha: 0,
    maxRacha: 0
};

let marcadorActual = null;
let situacionActual = null;

// ==========================================
// 3. REFERENCIAS AL DOM
// ==========================================
const campo = document.getElementById('campo');
const botonNuevaSituacion = document.getElementById('btn-nueva-situacion');

const idSituacion = document.getElementById('situacion-id');
const tituloSituacion = document.getElementById('situacion-titulo');
const descripcionSituacion = document.getElementById('situacion-descripcion');

const panelFeedback = document.getElementById('panel-feedback');
const resultadoFeedback = document.getElementById('feedback-resultado');
const explicacionFeedback = document.getElementById('feedback-explicacion');

const botonesOpcion = document.querySelectorAll('.btn-opcion');

const statPuntos = document.getElementById('stat-puntos');
const statPrecision = document.getElementById('stat-precision');
const statRacha = document.getElementById('stat-racha');

// ==========================================
// 4. FUNCIONES PRINCIPALES
// ==========================================

function guardarProgreso() {
    localStorage.setItem('refsim_user', JSON.stringify(usuarioState));
}

function cargarNuevaSituacion() {
    if (marcadorActual) {
        marcadorActual.remove();
        marcadorActual = null;
    }
    
    panelFeedback.classList.add('oculto');
    panelFeedback.classList.remove('acierto', 'fallo');

    botonesOpcion.forEach(btn => btn.disabled = false);

    const indiceAleatorio = Math.floor(Math.random() * situacionesDB.length);
    situacionActual = situacionesDB[indiceAleatorio];

    idSituacion.textContent = `Jugada #${situacionActual.id}`;
    tituloSituacion.textContent = situacionActual.tipo;
    descripcionSituacion.textContent = situacionActual.descripcion;

    colocarMarcador(situacionActual.posX, situacionActual.posY);
}

function colocarMarcador(x, y) {
    marcadorActual = document.createElement('div');
    marcadorActual.classList.add('marcador-accion');
    marcadorActual.style.left = `${x}px`;
    marcadorActual.style.top = `${y}px`;
    campo.appendChild(marcadorActual);
}

function evaluarDecision(event) {
    if (!situacionActual) return;

    const decisionElegida = event.target.getAttribute('data-decision');

    botonesOpcion.forEach(btn => btn.disabled = true);
    panelFeedback.classList.remove('oculto');

    usuarioState.totalJugadas++;

    if (decisionElegida === situacionActual.decisionCorrecta) {
        usuarioState.aciertos++;
        usuarioState.racha++;
        if (usuarioState.racha > usuarioState.maxRacha) {
            usuarioState.maxRacha = usuarioState.racha;
        }

        const puntosGanados = 100 + (usuarioState.racha > 1 ? (usuarioState.racha - 1) * 20 : 0);
        usuarioState.puntos += puntosGanados;

        panelFeedback.classList.add('acierto');
        resultadoFeedback.textContent = `¡DECISIÓN CORRECTA! 👏 (+${puntosGanados} pts)`;
    } else {
        usuarioState.racha = 0;
        panelFeedback.classList.add('fallo');
        resultadoFeedback.textContent = `INCORRECTO ❌ (Decisión oficial: ${situacionActual.decisionCorrecta})`;
    }

    explicacionFeedback.textContent = situacionActual.explicacion;

    actualizarMarcador();
    guardarProgreso();
}

function actualizarMarcador() {
    const precisionCalculada = usuarioState.totalJugadas > 0 
        ? Math.round((usuarioState.aciertos / usuarioState.totalJugadas) * 100) 
        : 0;

    statPuntos.textContent = usuarioState.puntos;
    statPrecision.textContent = `${precisionCalculada}%`;
    statRacha.textContent = usuarioState.racha;
}

// ==========================================
// 5. EVENTOS E INICIALIZACIÓN DEL JUEGO
// ==========================================
botonNuevaSituacion.addEventListener('click', cargarNuevaSituacion);

botonesOpcion.forEach(boton => {
    boton.addEventListener('click', evaluarDecision);
});

actualizarMarcador();
cargarNuevaSituacion();

// ==========================================
// 6. GESTIÓN DE LA VENTANA MODAL Y FIREBASE
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const modalAuth = document.getElementById("auth-modal");
  const btnAbrirAuth = document.getElementById("btn-abrir-auth");
  const btnCerrarAuth = document.getElementById("btn-cerrar-auth");

  // Abrir modal
  if (btnAbrirAuth && modalAuth) {
    btnAbrirAuth.addEventListener("click", () => {
      modalAuth.style.display = "flex";
    });
  }

  // Cerrar modal con la "X"
  if (btnCerrarAuth && modalAuth) {
    btnCerrarAuth.addEventListener("click", () => {
      modalAuth.style.display = "none";
    });
  }

  // Cerrar modal haciendo clic fuera de la caja
  window.addEventListener("click", (e) => {
    if (modalAuth && e.target === modalAuth) {
      modalAuth.style.display = "none";
    }
  });

  // Conexión con Firebase
  setTimeout(() => {
    const { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } = window.refSimFirebase || {};
    
    if (!auth) return;

    const emailInput = document.getElementById("user-email");
    const passwordInput = document.getElementById("user-password");
    const statusText = document.getElementById("auth-status");
    const btnLogin = document.getElementById("btn-login");
    const btnRegister = document.getElementById("btn-register");

    if (btnLogin && btnRegister && emailInput && passwordInput && statusText) {
      // Iniciar Sesión
      btnLogin.addEventListener("click", async () => {
        try {
          await signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
          statusText.style.color = "#2E9B5E"; // Verde césped
          statusText.innerText = "¡Inicio de sesión exitoso!";
          setTimeout(() => { 
            if (modalAuth) modalAuth.style.display = "none"; 
          }, 1500);
        } catch (error) {
          statusText.style.color = "#E63946"; // Roja
          statusText.innerText = "Error: " + error.message;
        }
      });

      // Registrarse
      btnRegister.addEventListener("click", async () => {
        try {
          await createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
          statusText.style.color = "#2E9B5E"; // Verde césped
          statusText.innerText = "¡Cuenta creada con éxito!";
          setTimeout(() => { 
            if (modalAuth) modalAuth.style.display = "none"; 
          }, 1500);
        } catch (error) {
          statusText.style.color = "#E63946"; // Roja
          statusText.innerText = "Error: " + error.message;
        }
      });
    }
  }, 1000);
});