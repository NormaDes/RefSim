// ==========================================
// 1. BASE DE DATOS DE SITUACIONES (IFAB - Bilingüe)
// ==========================================
const situacionesDB = [
    {
        id: 1,
        tipo: "Entrada Brusca",
        tipoEu: "Sarrera Zakarra",
        descripcion: "Un defensor se tira al suelo a destiempo para disputar el balón y golpea fuertemente con los tacos en la espinilla del rival con fuerza desmedida.",
        descripcionEu: "Defentsa bat lurrera botatzen da berandu baloia lehiatzeko eta gogor kolpatzen ditu takoekin aurkariaren tibilean gehiegizko indarrarekin.",
        posX: 150,
        posY: 90,
        decisionCorrecta: "Falta + Tarjeta Roja",
        explicacion: "Regla 12: Las entradas que pongan en peligro la integridad física de un adversario o con fuerza desmedida deben ser sancionadas como juego brusco grave (Tarjeta Roja).",
        explicacionEu: "12. Araua: Aurkariaren osotasun fisikoa arriskuan jartzen duten sarrerak edo gehiegizko indarra daramatzatenak joko zakar larritzat zigortu behar dira (Txartel Gorria)."
    },
    {
        id: 2,
        tipo: "Agarrón Táctico",
        tipoEu: "Helduketa Taktikoa",
        descripcion: "Un delantero avanza en un contraataque prometedor hacia el área rival y el defensor lo agarra persistentemente de la camiseta para frenarlo.",
        descripcionEu: "Erasotzaile bat kontraeraso promesgarri batean aurrera doa aurkariaren áriarantz eta defentsak etengabe helduketa egiten dio kamisetatik gelditzeko.",
        posX: 210,
        posY: 200,
        decisionCorrecta: "Falta + Tarjeta Amarilla",
        explicacion: "Regla 12: Cometer una infracción por contacto (agarrón) para interferir o cortar un ataque prometedor se sancionará con Tarjeta Amarilla.",
        explicacionEu: "12. Araua: Ukipenezko arau-hauste bat egitea (helduketa) eraso promesgarri bat mozteko edo oztopatzeko Txartel Horiarekin zigortuko da."
    },
    {
        id: 3,
        tipo: "Carga Reglamentaria",
        tipoEu: "Karga Arauduna",
        descripcion: "Dos jugadores disputan un balón dividido hombro con hombro de manera reglamentaria, usando fuerza moderada y sin emplear los codos.",
        descripcionEu: "Bi jokalarik baloi banatu bat lehiatzen dute sorbalda sorbaldaz modu araudunean, indar moderatua erabiliz eta ukondoak erabili gabe.",
        posX: 100,
        posY: 230,
        decisionCorrecta: "No hay falta",
        explicacion: "Regla 12: La carga hombro con hombro está permitida siempre que se realice disputando la posición del balón de manera legal y sin fuerza desproporcionada.",
        explicacionEu: "12. Araua: Sorbalda sorbaldako karga baimenduta dago betiere baloiaren posizioa legez eta gehiegizko indarrik gabe lehiatzen bada."
    },
    {
        id: 4,
        tipo: "Mano en el Área",
        tipoEu: "Eskua Área Barruan",
        descripcion: "Un defensor salta a bloquear un centro con los brazos abiertos de forma antinatural, ocupando más espacio. El balón impacta directamente en su mano.",
        descripcionEu: "Defentsa batek erdiraketa bat blokeatzeko salto egiten du besoak modu ez-natural batean irekita, espazio gehiago okupatuz. Baloiak zuzenean jotzen du eskua.",
        posX: 300,
        posY: 180,
        decisionCorrecta: "Penalti + Tarjeta Amarilla",
        explicacion: "Regla 12: Se considera infracción si un jugador toca el balón con la mano/brazo haciendo que su cuerpo ocupe más espacio de manera antinatural.",
        explicacionEu: "12. Araua: Arau-hausteretzat hartzen da jokalari batek baloia eskuz/besoz ukitzen badu bere gorputzak espazio gehiago modu ez-naturalean okupatzea eraginez."
    }
];

// ==========================================
// 2. ESTADO Y TRADUCCIONES DE LA INTERFAZ
// ==========================================
let usuarioState = { puntos: 0, aciertos: 0, totalJugadas: 0, racha: 0, maxRacha: 0 };
let marcadorActual = null;
let situacionActual = null;
let usuarioFirebaseActual = null;
let idiomaActual = "es";

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
        btnPenalti: "Penalti",
        btnPenaltiAmarilla: "Penalti + Amarilla",
        btnGol: "Gol",
        btnFueraDeJuego: "Fuera de juego",
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
        btnPenalti: "Penaltia",
        btnPenaltiAmarilla: "Penaltia + Horia",
        btnGol: "Gola",
        btnFueraDeJuego: "Jokoz kanpo",
        btnSiguiente: "Hurrengo jokaldia",
        decisionOficial: "Erabaki ofiziala:",
        aciertoMsg: "ERABAKI ZUZENA! 👏",
        falloMsg: "OKERRA ❌"
    }
};

// ==========================================
// 3. LÓGICA DEL JUEGO
// ==========================================
function cargarNuevaSituacion() {
    if (marcadorActual) {
        marcadorActual.remove();
        marcadorActual = null;
    }
    
    const panelFeedback = document.getElementById('panel-feedback');
    if (panelFeedback) {
        panelFeedback.classList.add('oculto');
        panelFeedback.classList.remove('acierto', 'fallo');
    }

    const botonesOpcion = document.querySelectorAll('.btn-opcion');
    botonesOpcion.forEach(btn => btn.disabled = false);

    if (situacionesDB.length === 0) return;
    const indiceAleatorio = Math.floor(Math.random() * situacionesDB.length);
    situacionActual = situacionesDB[indiceAleatorio];

    const idSituacion = document.getElementById('situacion-id');
    const tituloSituacion = document.getElementById('situacion-titulo');
    const descripcionSituacion = document.getElementById('situacion-descripcion');

    if (idSituacion) idSituacion.textContent = `Jugada #${situacionActual.id}`;
    
    if (tituloSituacion) {
        tituloSituacion.textContent = (idiomaActual === 'eu' && situacionActual.tipoEu) ? situacionActual.tipoEu : situacionActual.tipo;
    }
    if (descripcionSituacion) {
        descripcionSituacion.textContent = (idiomaActual === 'eu' && situacionActual.descripcionEu) ? situacionActual.descripcionEu : situacionActual.descripcion;
    }

    colocarMarcador(situacionActual.posX, situacionActual.posY);
}

function colocarMarcador(x, y) {
    const campo = document.getElementById('campo');
    if (!campo) return;
    
    marcadorActual = document.createElement('div');
    marcadorActual.classList.add('marcador-accion');
    marcadorActual.style.left = `${x}px`;
    marcadorActual.style.top = `${y}px`;
    campo.appendChild(marcadorActual);
}

function evaluarDecision(event) {
    if (!situacionActual) return;

    const decisionElegida = event.currentTarget.getAttribute('data-decision');
    const t = traducciones[idiomaActual];
    const botonesOpcion = document.querySelectorAll('.btn-opcion');
    
    // --- AQUÍ ESTÁN LAS CLAVES ---
    const panelFeedback = document.getElementById('panel-feedback'); // Asegúrate que el id en HTML sea id="panel-feedback"
    const resultadoFeedback = document.getElementById('feedback-resultado'); // id="feedback-resultado"
    const explicacionFeedback = document.getElementById('feedback-explicacion'); // id="feedback-explicacion"

    botonesOpcion.forEach(btn => btn.disabled = true);
    
    // 1. Mostrar el panel quitando la clase oculto
    if (panelFeedback) {
        panelFeedback.classList.remove('oculto');
        panelFeedback.classList.remove('acierto', 'fallo');
    }

    usuarioState.totalJugadas++;

    if (decisionElegida.trim() === situacionActual.decisionCorrecta.trim()) {
        usuarioState.aciertos++;
        usuarioState.racha++;
        if (usuarioState.racha > usuarioState.maxRacha) {
            usuarioState.maxRacha = usuarioState.racha;
        }

        const puntosGanados = 100 + (usuarioState.racha > 1 ? (usuarioState.racha - 1) * 20 : 0);
        usuarioState.puntos += puntosGanados;

        if (panelFeedback) panelFeedback.classList.add('acierto');
        if (resultadoFeedback) resultadoFeedback.textContent = `${t.aciertoMsg} (+${puntosGanados} pts)`;
    } else {
        usuarioState.racha = 0;
        if (panelFeedback) panelFeedback.classList.add('fallo');
        if (resultadoFeedback) resultadoFeedback.textContent = `${t.falloMsg} (${t.decisionOficial} ${situacionActual.decisionCorrecta})`;
    }

    // 2. Pintar la explicación oficial correspondiente
    const explicacionFinal = (idiomaActual === 'eu' && situacionActual.explicacionEu) ? situacionActual.explicacionEu : situacionActual.explicacion;
    if (explicacionFeedback) {
        explicacionFeedback.textContent = explicacionFinal;
    }

    actualizarMarcadorInterfaz();
    guardarProgresoNubeAuto();
}

function actualizarMarcadorInterfaz() {
    const statPuntos = document.getElementById('stat-puntos');
    const statPrecision = document.getElementById('stat-precision');
    const statRacha = document.getElementById('stat-racha');

    const precisionCalculada = usuarioState.totalJugadas > 0 
        ? Math.round((usuarioState.aciertos / usuarioState.totalJugadas) * 100) 
        : 0;

    if (statPuntos) statPuntos.textContent = usuarioState.puntos;
    if (statPrecision) statPrecision.textContent = `${precisionCalculada}%`;
    if (statRacha) statRacha.textContent = usuarioState.racha;
}

function aplicarTraducciones() {
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
    if (btnAcceso && !usuarioFirebaseActual) btnAcceso.textContent = t.btnAcceso;

    const varText = document.querySelector('.monitor__bar span:last-child');
    if (varText) varText.textContent = t.varRepeticion;

    const botonesOpcion = document.querySelectorAll('.btn-opcion');
    if (botonesOpcion.length >= 8) {
        botonesOpcion[0].innerHTML = `<span class="decision__glyph" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 12.5L10 17.5L19 6.5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span> ${t.btnNoFalta}`;
        botonesOpcion[1].innerHTML = `<span class="decision__glyph" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2.2"/><path d="M12 7v6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><circle cx="12" cy="16.3" r="1.15" fill="currentColor"/></svg></span> ${t.btnFalta}`;
        botonesOpcion[2].innerHTML = `<span class="decision__card" aria-hidden="true"></span> ${t.btnAmarilla}`;
        botonesOpcion[3].innerHTML = `<span class="decision__card" aria-hidden="true"></span> ${t.btnRoja}`;
        botonesOpcion[4].innerHTML = `<span class="decision__card" aria-hidden="true" style="background:var(--papel)"></span> ${t.btnPenalti}`;
        botonesOpcion[5].innerHTML = `<span class="decision__card" aria-hidden="true" style="background:var(--amarilla)"></span> ${t.btnPenaltiAmarilla}`;
        botonesOpcion[6].innerHTML = `<span class="decision__glyph" aria-hidden="true">⚽</span> ${t.btnGol}`;
        botonesOpcion[7].innerHTML = `<span class="decision__glyph" aria-hidden="true">🚩</span> ${t.btnFueraDeJuego}`;
    }

    const btnSig = document.getElementById('btn-nueva-situacion');
    if (btnSig) btnSig.textContent = t.btnSiguiente;

    if (situacionActual) {
        const tituloSituacion = document.getElementById('situacion-titulo');
        const descripcionSituacion = document.getElementById('situacion-descripcion');
        if (tituloSituacion) {
            tituloSituacion.textContent = (idiomaActual === 'eu' && situacionActual.tipoEu) ? situacionActual.tipoEu : situacionActual.tipo;
        }
        if (descripcionSituacion) {
            descripcionSituacion.textContent = (idiomaActual === 'eu' && situacionActual.descripcionEu) ? situacionActual.descripcionEu : situacionActual.descripcion;
        }
    }
}

// ==========================================
// 4. FIREBASE Y EVENTOS DOM
// ==========================================
async function guardarProgresoNubeAuto() {
    if (usuarioFirebaseActual && window.refSimFirebase) {
        const { db, doc, setDoc } = window.refSimFirebase;
        try {
            await setDoc(doc(db, "usuarios", usuarioFirebaseActual.uid), {
                email: usuarioFirebaseActual.email,
                puntos: usuarioState.puntos,
                aciertos: usuarioState.aciertos,
                totalJugadas: usuarioState.totalJugadas,
                racha: usuarioState.racha,
                maxRacha: usuarioState.maxRacha,
                ultimaActualizacion: new Date()
            }, { merge: true });
        } catch (e) {
            console.error("Error al guardar en Firestore:", e);
        }
    }
}

async function cargarProgresoNube(uid) {
    if (!window.refSimFirebase) return;
    const { db, doc, getDoc } = window.refSimFirebase;
    try {
        const docRef = doc(db, "usuarios", uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            const datosCloud = docSnap.data();
            usuarioState.puntos = datosCloud.puntos || 0;
            usuarioState.aciertos = datosCloud.aciertos || 0;
            usuarioState.totalJugadas = datosCloud.totalJugadas || 0;
            usuarioState.racha = datosCloud.racha || 0;
            usuarioState.maxRacha = datosCloud.maxRacha || 0;
        } else {
            usuarioState = { puntos: 0, aciertos: 0, totalJugadas: 0, racha: 0, maxRacha: 0 };
            await guardarProgresoNubeAuto();
        }
        actualizarMarcadorInterfaz();
    } catch (e) {
        console.error("Error al cargar de Firestore:", e);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // 1. Inicializar jugada y eventos de botones principales
    actualizarMarcadorInterfaz();
    cargarNuevaSituacion();

    const botonNuevaSituacion = document.getElementById('btn-nueva-situacion');
    if (botonNuevaSituacion) {
        botonNuevaSituacion.addEventListener('click', cargarNuevaSituacion);
    }

    const botonesOpcion = document.querySelectorAll('.btn-opcion');
    botonesOpcion.forEach(boton => {
        boton.addEventListener('click', evaluarDecision);
    });

    // 2. Selector de idioma
    const contenedorBanderas = document.getElementById("selector-idioma");
    if (contenedorBanderas) {
        contenedorBanderas.addEventListener("click", (e) => {
            const boton = e.target.closest("button");
            if (!boton) return;
            idiomaActual = boton.getAttribute("data-lang");
            aplicarTraducciones();
        });
    }

    // 3. Modal de Autenticación y Firebase
    const modalAuth = document.getElementById("auth-modal");
    const btnAbrirAuth = document.getElementById("btn-abrir-auth");
    const btnCerrarAuth = document.getElementById("btn-cerrar-auth");

    if (btnAbrirAuth && modalAuth) {
        btnAbrirAuth.addEventListener("click", () => { modalAuth.style.display = "flex"; });
    }
    if (btnCerrarAuth && modalAuth) {
        btnCerrarAuth.addEventListener("click", () => { modalAuth.style.display = "none"; });
    }
    window.addEventListener("click", (e) => {
        if (modalAuth && e.target === modalAuth) { modalAuth.style.display = "none"; }
    });

    // Comprobación segura de Firebase
    const verificarFirebaseInterval = setInterval(() => {
        if (window.refSimFirebase) {
            clearInterval(verificarFirebaseInterval);
            configurarAuthFirebase(modalAuth, btnAbrirAuth);
        }
    }, 200);
});

function configurarAuthFirebase(modalAuth, btnAbrirAuth) {
    const { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } = window.refSimFirebase;
    if (!auth) return;

    const emailInput = document.getElementById("user-email");
    const passwordInput = document.getElementById("user-password");
    const statusText = document.getElementById("auth-status");
    const btnLogin = document.getElementById("btn-login");
    const btnRegister = document.getElementById("btn-register");

    onAuthStateChanged(auth, async (user) => {
        let authContainer = document.getElementById("auth-container-ui");
        if (!authContainer && btnAbrirAuth) {
            authContainer = document.createElement("div");
            authContainer.id = "auth-container-ui";
            authContainer.style.cssText = "display: flex; align-items: center; gap: 10px;";
            btnAbrirAuth.parentNode.appendChild(authContainer);
        }

        if (user) {
            usuarioFirebaseActual = user;
            if (btnAbrirAuth) btnAbrirAuth.style.display = "none";
            await cargarProgresoNube(user.uid);

            if (authContainer) {
                let nombreCorto = user.email.split('@')[0];
                authContainer.innerHTML = `
                    <span style="color: var(--amarilla); font-weight: 700; font-size: 0.85rem;">👤 ${nombreCorto}</span>
                    <button id="btn-cerrar-sesion" style="background: #E63946; color: white; border: none; padding: 6px 10px; border-radius: var(--radio-s); font-weight: 700; cursor: pointer; font-size: 0.8rem;">Cerrar sesión</button>
                `;
                document.getElementById("btn-cerrar-sesion").addEventListener("click", async () => {
                    await signOut(auth);
                    location.reload();
                });
            }
        } else {
            usuarioFirebaseActual = null;
            if (btnAbrirAuth) btnAbrirAuth.style.display = "block";
            if (authContainer) authContainer.innerHTML = "";
            usuarioState = { puntos: 0, aciertos: 0, totalJugadas: 0, racha: 0, maxRacha: 0 };
            actualizarMarcadorInterfaz();
        }
    });

    if (btnLogin && btnRegister && emailInput && passwordInput && statusText) {
        btnLogin.addEventListener("click", async () => {
            try {
                await signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
                statusText.style.color = "#2E9B5E";
                statusText.innerText = "¡Inicio de sesión exitoso!";
                setTimeout(() => { if (modalAuth) modalAuth.style.display = "none"; }, 1000);
            } catch (error) {
                statusText.style.color = "#E63946";
                statusText.innerText = "Error: " + error.message;
            }
        });

        btnRegister.addEventListener("click", async () => {
            try {
                await createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
                statusText.style.color = "#2E9B5E";
                statusText.innerText = "¡Cuenta creada con éxito!";
                setTimeout(() => { if (modalAuth) modalAuth.style.display = "none"; }, 1000);
            } catch (error) {
                statusText.style.color = "#E63946";
                statusText.innerText = "Error: " + error.message;
            }
        });
    }
}