// ==========================================
// 1. BASE DE DATOS DE SITUACIONES (Castellano / Euskera)
// ==========================================
const situacionesDB = [
    {
        id: 1,
        tipo: "Entrada Brusca",
        tipoEu: "Sarrera Gogorra",
        descripcion: "Un defensor se lanza al suelo a destiempo con fuerza excesiva en la medular, impactando claramente en la espinilla del rival.",
        descripcionEu: "Defentsa bat zelai erdian denboraz kanpo lurrera botatzen da indar handiegiarekin, aurkariaren tibia kolpatuz.",
        posX: 180,
        posY: 140,
        decisionCorrecta: "Falta + Tarjeta Roja",
        explicacion: "Regla 12: Una entrada que pone en peligro la integridad física del adversario debe ser sancionada con expulsión (tarjeta roja).",
        explicacionEu: "12. Araua: Aurkariaren osotasun fisikoa arriskuan jartzen duen sarrera bat kanporaketarekin (txartel gorria) zigortu behar da."
    },
    {
        id: 2,
        tipo: "Mano en el Área",
        tipoEu: "Eskua Área Barruan",
        descripcion: "Un remate a puerta golpea claramente en la mano separada y 'antinatural' de un defensa dentro del área penalti.",
        descripcionEu: "Ateeratako jaurtiketa batek argi eta garbi jotzen du área barruan dagoen defentsa baten esku banandu eta 'naturalki kanpoko' batean.",
        posX: 85,
        posY: 110,
        decisionCorrecta: "Penalti",
        explicacion: "Regla 12: Se sanciona mano cuando el jugador hace su cuerpo artificialmente más grande o intercepta el balón con la mano separada del cuerpo.",
        explicacionEu: "12. Araua: Eskua zigortzen da jokalariak bere gorputza artifizialki handiago egiten duenean edo baloia gorputzetik banandutako eskuarekin mozten duenean."
    },
    {
        id: 3,
        tipo: "Cortar Contraataque",
        tipoEu: "Kontraerasoa Moztu",
        descripcion: "Un centrocampista agarra descaradamente de la camiseta a un atacante que se marchaba completamente solo hacia el portero.",
        descripcionEu: "Erdilari batek argi eta garbi heltzen dio kamisetatik bakar-bakarrik atezainagatik zihoan erasotzaile bati.",
        posX: 220,
        posY: 190,
        decisionCorrecta: "Falta + Tarjeta Amarilla",
        explicacion: "Regla 12: Cortar un ataque prometedor mediante una acción antirreglamentaria (como un agarrón) se sanciona con amonestación.",
        explicacionEu: "12. Araua: Eraso promesgarri bat legez kanpoko ekintza baten bidez moztea (heldu bat bezala) txartel horiarekin zigortzen da."
    },
    {
        id: 4,
        tipo: "Simulación en el Área",
        tipoEu: "Simulazioa Área Barruan",
        descripcion: "Un delantero se deja caer teatralmente dentro del área pequeña sin que ningún defensa le haya hecho ningún tipo de contacto.",
        descripcionEu: "Aurrelari bat modu teatralean erortzen da área txikian, inongo defentsak ukipenik egin gabe.",
        posX: 60,
        posY: 130,
        decisionCorrecta: "Tarjeta Amarilla por Simulación",
        explicacion: "Regla 12: Engañar deliberadamente al árbitro fingiendo una falta o un contacto inexistente se castiga con tarjeta amarilla por simulación.",
        explicacionEu: "12. Araua: Epailea nahita iruzurtzea falta edo ukipen faltsu bat simulatuz txartel horiarekin zigortzen da."
    },
    {
        id: 5,
        tipo: "Carga Legal",
        tipoEu: "Karga Legala",
        descripcion: "Dos jugadores luchan cuerpo a cuerpo por el balón usando el hombro de forma justa, sin emplear fuerza desmedida.",
        descripcionEu: "Bi jokalari gorputzez gorputz borrokatzen dira baloiarako sorbalda modu zuzenean erabiliz, gehiegizko indarrik gabe.",
        posX: 140,
        posY: 80,
        decisionCorrecta: "No hay falta",
        explicacion: "Regla 12: Una carga disputada hombro con hombro dentro de los límites de una lucha justa por el balón es un contacto totalmente lícito.",
        explicacionEu: "12. Araua: Baloiarako borroka zuzen baten barruan sorbalda-sorbalda egindako karga erabat legezkotzat jotzen da."
    }
];

let situacionActual = null;
let puntos = 0;
let aciertosTotales = 0;
let jugadasTotales = 0;
let rachaActual = 0;
let idiomaActual = "es"; // Idioma por defecto

// ==========================================
// 2. DICCIONARIO MULTIDIOMA DE LA INTERFAZ
// ==========================================
const traducciones = {
    es: {
        tagSimulador: "Simulador arbitral · Reglas del Juego IFAB",
        lblPuntos: "Puntos",
        lblPrecision: "Precisión",
        lblRacha: "Racha",
        btnAcceso: "Acceso",
        varRepeticion: "VAR · Repetición de la jugada",
        btnNoFalta: "No hay falta",
        btnFalta: "Falta",
        btnAmarilla: "Falta + Amarilla",
        btnRoja: "Falta + Roja",
        btnSiguiente: "Siguiente jugada",
        decisionOficial: "Decisión oficial:",
        aciertoMsg: "¡DECISIÓN CORRECTA! 👏",
        falloMsg: "INCORRECTO ❌"
    },
    eu: {
        tagSimulador: "Epaile simulatzailea · IFAB Joko Arauak",
        lblPuntos: "Puntuak",
        lblPrecision: "Zehaztasuna",
        lblRacha: "Bolada",
        btnAcceso: "Sartu",
        varRepeticion: "VAR · Jokaldiaren errepikapena",
        btnNoFalta: "Ez da falta",
        btnFalta: "Falta",
        btnAmarilla: "Falta + Txartel horia",
        btnRoja: "Falta + Txartel gorria",
        btnSiguiente: "Hurrengo jokaldia",
        decisionOficial: "Erabaki ofiziala:",
        aciertoMsg: "ERABAKI ZUZENA! 👏",
        falloMsg: "OKERRA ❌"
    }
};

// ==========================================
// 3. INICIALIZACIÓN Y EVENTOS
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // Selector de idioma mediante clics en las banderas
    const contenedorBanderas = document.getElementById("selector-idioma");
    if (contenedorBanderas) {
        contenedorBanderas.addEventListener("click", (e) => {
            const boton = e.target.closest("button");
            if (!boton) return;
            
            idiomaActual = boton.getAttribute("data-lang");
            aplicarTraduccionesFijas();
            if (situacionActual) {
                mostrarSituacionActualEnInterfaz();
            }
        });
    }

    // Cargar la primera jugada al iniciar
    cargarNuevaSituacion();
    
    // Botón siguiente jugada
    const btnSiguiente = document.getElementById("btn-nueva-situacion");
    if (btnSiguiente) {
        btnSiguiente.addEventListener("click", cargarNuevaSituacion);
    }

    // Configurar botones de opciones de arbitraje
    const botonesOpcion = document.querySelectorAll(".btn-opcion");
    botonesOpcion.forEach(btn => {
        btn.addEventListener("click", () => {
            evaluarDecision(btn.getAttribute("data-decision"));
        });
    });
});

function cargarNuevaSituacion() {
    const indiceAleatorio = Math.floor(Math.random() * situacionesDB.length);
    situacionActual = situacionesDB[indiceAleatorio];
    mostrarSituacionActualEnInterfaz();
}

function mostrarSituacionActualEnInterfaz() {
    if (!situacionActual) return;

    // Seleccionar texto según el idioma actual (con respaldo en castellano)
    const titulo = (idiomaActual === 'eu' && situacionActual.tipoEu) ? situacionActual.tipoEu : situacionActual.tipo;
    const desc = (idiomaActual === 'eu' && situacionActual.descripcionEu) ? situacionActual.descripcionEu : situacionActual.descripcion;

    const elementoTitulo = document.getElementById("situacion-titulo");
    const elementoDesc = document.getElementById("situacion-descripcion");
    
    if (elementoTitulo) elementoTitulo.textContent = titulo;
    if (elementoDesc) elementoDesc.textContent = desc;

    // Posicionar el marcador en el campo mini
    const marcador = document.getElementById("marcador-jugada");
    if (marcador) {
        marcador.style.left = `${situacionActual.posX}px`;
        marcador.style.top = `${situacionActual.posY}px`;
    }

    // Ocultar panel de explicación anterior y habilitar botones
    const panelExplicacion = document.getElementById("panel-explicacion");
    if (panelExplicacion) panelExplicacion.style.display = "none";

    activarBotonesOpcion(true);
}

function evaluarDecision(decisionUsuario) {
    if (!situacionActual) return;

    jugadasTotales++;
    const esAcertado = decisionUsuario === situacionActual.decisionCorrecta;

    const t = traducciones[idiomaActual];
    const panelExplicacion = document.getElementById("panel-explicacion");
    const resultadoTexto = document.getElementById("resultado-texto");
    const explicacionTexto = document.getElementById("explicacion-texto");

    if (esAcertado) {
        puntos += 100;
        aciertosTotales++;
        rachaActual++;
        if (resultadoTexto) {
            resultadoTexto.textContent = t.aciertoMsg;
            resultadoTexto.style.color = "#2ecc71";
        }
    } else {
        rachaActual = 0;
        if (resultadoTexto) {
            resultadoTexto.textContent = t.falloMsg;
            resultadoTexto.style.color = "#e74c3c";
        }
    }

    const explicacionFinal = (idiomaActual === 'eu' && situacionActual.explicacionEu) ? situacionActual.explicacionEu : situacionActual.explicacion;
    if (explicacionTexto) {
        explicacionTexto.innerHTML = `<strong>${t.decisionOficial}</strong> ${situacionActual.decisionCorrecta}<br><br>${explicacionFinal}`;
    }

    if (panelExplicacion) panelExplicacion.style.display = "block";
    
    actualizarEstadisticasInterfaz();
    activarBotonesOpcion(false);
}

function actualizarEstadisticasInterfaz() {
    const elPuntos = document.getElementById("stat-puntos");
    const elPrecision = document.getElementById("stat-precision");
    const elRacha = document.getElementById("stat-racha");

    if (elPuntos) elPuntos.textContent = puntos;
    
    const precision = jugadasTotales > 0 ? Math.round((aciertosTotales / jugadasTotales) * 100) : 0;
    if (elPrecision) elPrecision.textContent = `${precision}%`;
    
    if (elRacha) elRacha.textContent = rachaActual;
}

function activarBotonesOpcion(activar) {
    const botones = document.querySelectorAll(".btn-opcion");
    botones.forEach(btn => {
        btn.disabled = !activar;
    });
}

function aplicarTraduccionesFijas() {
    const t = traducciones[idiomaActual];
    
    const tag = document.querySelector('.scorebug__tag');
    if (tag) tag.textContent = t.tagSimulador;

    const lblP = document.getElementById('label-puntos');
    const lblPrec = document.getElementById('label-precision');
    const lblR = document.getElementById('label-racha');
    if (lblP) lblP.textContent = t.lblPuntos;
    if (lblPrec) lblPrec.textContent = t.lblPrecision;
    if (lblR) lblR.textContent = t.lblRacha;

    const btnAcceso = document.getElementById('btn-abrir-auth');
    if (btnAcceso && !window.usuarioFirebaseActual) btnAcceso.textContent = t.btnAcceso;

    const varText = document.querySelector('.monitor__bar span:last-child');
    if (varText) varText.textContent = t.varRepeticion;

    const botones = document.querySelectorAll('.btn-opcion');
    if (botones.length >= 4) {
        botones[0].innerHTML = `<span class="decision__glyph" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 12.5L10 17.5L19 6.5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span> ${t.btnNoFalta}`;
        botones[1].innerHTML = `<span class="decision__glyph" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2.2"/><path d="M12 7v6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><circle cx="12" cy="16.3" r="1.15" fill="currentColor"/></svg></span> ${t.btnFalta}`;
        botones[2].innerHTML = `<span class="decision__card" aria-hidden="true"></span> ${t.btnAmarilla}`;
        botones[3].innerHTML = `<span class="decision__card" aria-hidden="true"></span> ${t.btnRoja}`;
    }

    const btnSig = document.getElementById('btn-nueva-situacion');
    if (btnSig) btnSig.textContent = t.btnSiguiente;
}