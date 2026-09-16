// ==========================================
// 1. BASE DE DATOS DE SITUACIONES (IFAB)
// ==========================================
const situacionesDB = [
    {
        id: 1,
        tipo: "Entrada",
        descripcion: "Un defensor se tira al suelo a destiempo para disputar el balón y golpea fuertemente con los tacos en la espinilla del rival con fuerza desmedida.",
        intensidad: "Muy alta",
        posX: 150,
        posY: 90,
        decisionCorrecta: "Falta + Tarjeta Roja",
        explicacion: "Regla 12 (Faltas y conducta incorrecta): Las entradas que pongan en peligro la integridad física de un adversario o con fuerza desmedida deben ser sancionadas como juego brusco grave (Tarjeta Roja)."
    },
    {
        id: 2,
        tipo: "Agarrón",
        descripcion: "Un delantero avanza hacia el área rival y el defensor lo agarra persistentemente de la camiseta cortando un ataque prometedor.",
        intensidad: "Moderada",
        posX: 210,
        posY: 200,
        decisionCorrecta: "Falta + Tarjeta Amarilla",
        explicacion: "Regla 12: Cometer una infracción por contacto (agarrón) con el fin de interferir o cortar un ataque prometedor se sancionará con amonestación (Tarjeta Amarilla)."
    },
    {
        id: 3,
        tipo: "Carga",
        descripcion: "Dos jugadores disputan un balón dividido hombro con hombro de manera reglamentaria, usando una fuerza moderada y sin usar los codos.",
        intensidad: "Leve",
        posX: 100,
        posY: 230,
        decisionCorrecta: "No hay falta",
        explicacion: "Regla 12: La carga hombro con hombro está permitida cuando se realiza disputando la posición del balón de manera legal y sin emplear una fuerza desproporcionada."
    }
];

// ==========================================
// 2. ESTADO DEL JUEGO (GAMIFICACIÓN)
// ==========================================
let puntos = 0;
let aciertos = 0;
let totalJugadas = 0;
let racha = 0;

let marcadorActual = null;
let situacionActual = null;

// ==========================================
// 3. REFERENCIAS A ELEMENTOS DEL HTML
// ==========================================
const campo = document.getElementById('campo');
const botonNuevaSituacion = document.getElementById('btn-nueva-situacion');

const tituloSituacion = document.getElementById('situacion-titulo');
const descripcionSituacion = document.getElementById('situacion-descripcion');

const panelFeedback = document.getElementById('panel-feedback');
const resultadoFeedback = document.getElementById('feedback-resultado');
const explicacionFeedback = document.getElementById('feedback-explicacion');

const botonesOpcion = document.querySelectorAll('.btn-opcion');

// Elementos del marcador
const statPuntos = document.getElementById('stat-puntos');
const statPrecision = document.getElementById('stat-precision');
const statRacha = document.getElementById('stat-racha');

// ==========================================
// 4. FUNCIONES
// ==========================================

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

    tituloSituacion.textContent = `Situación #${situacionActual.id}: ${situacionActual.tipo}`;
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

    // Incrementamos el total de situaciones evaluadas
    totalJugadas++;

    if (decisionElegida === situacionActual.decisionCorrecta) {
        aciertos++;
        racha++;
        // Calculamos puntos base (100) más un bono por racha acumulada
        const puntosGanados = 100 + (racha > 1 ? (racha - 1) * 20 : 0);
        puntos += puntosGanados;

        panelFeedback.classList.add('acierto');
        resultadoFeedback.textContent = `¡DECISIÓN CORRECTA! 👏 (+${puntosGanados} pts)`;
    } else {
        racha = 0; // Reiniciamos la racha si hay fallo
        panelFeedback.classList.add('fallo');
        resultadoFeedback.textContent = `INCORRECTO ❌ (Decisión oficial: ${situacionActual.decisionCorrecta})`;
    }

    explicacionFeedback.textContent = situacionActual.explicacion;

    // Actualizamos las estadísticas en el marcador
    actualizarMarcador();
}

function actualizarMarcador() {
    const precisionCalculada = totalJugadas > 0 
        ? Math.round((aciertos / totalJugadas) * 100) 
        : 0;

    statPuntos.textContent = puntos;
    statPrecision.textContent = `${precisionCalculada}%`;
    statRacha.textContent = `🔥 ${racha}`;
}

// ==========================================
// 5. ESCUCHADORES DE EVENTOS
// ==========================================
botonNuevaSituacion.addEventListener('click', cargarNuevaSituacion);

botonesOpcion.forEach(boton => {
    boton.addEventListener('click', evaluarDecision);
});

// Inicio
cargarNuevaSituacion();