// ==========================================
// 1. BASE DE DATOS DE SITUACIONES (IFAB - Bilingüe)
// ==========================================
const situacionesDB = [
    {
        id: 1,
        tipo: "Entrada imprudente en el centro del campo",
        tipoEu: "Sarrera imprudentea zelai erdian",
        descripcion: "Un defensor llega tarde a un balón dividido y golpea la pierna del atacante de manera imprudente.",
        descripcionEu: "Defentsa bat berandu iritsi da baloi banatu batera eta erasotzailearen hanka modu imprudentean kolpatu du.",
        posX: 180,
        posY: 140,
        decisionCorrecta: "Falta",
        explicacion: "Regla 12: una entrada imprudente que implique contacto físico se sanciona con tiro libre directo. La acción imprudente no requiere tarjeta amarilla.",
        explicacionEu: "12. Araua: Ukipen fisikoa dakarren sarrera imprudente bat jaurtiketa libre zuzenarekin zigortzen da. Ekintza imprudenteak ez du txartel horirik eskatzen."
    },
    {
        id: 2,
        tipo: "Entrada temeraria",
        tipoEu: "Sarrera ausarta (temeraria)",
        descripcion: "Un jugador entra con fuerza considerable y sin tener suficientemente en cuenta el riesgo para el adversario.",
        descripcionEu: "Jokalari batek indar handiarekin eta aurkariarentzako arriskua nahikoa kontuan hartu gabe sartzen da.",
        posX: 300,
        posY: 180,
        decisionCorrecta: "Falta + Tarjeta Amarilla",
        explicacion: "Regla 12: una acción temeraria muestra desprecio por el peligro o las consecuencias para el adversario y debe sancionarse con tarjeta amarilla.",
        explicacionEu: "12. Araua: Ekintza ausart batek arriskuarekiko edo aurkariaren ondoriokiko mespretxua erakusten du eta txartel horiarekin zigortu behar da."
    },
    {
        id: 3,
        tipo: "Entrada con fuerza excesiva",
        tipoEu: "Sarrera gehiegizko indarrarekin",
        descripcion: "Un defensor realiza una entrada con fuerza excesiva poniendo en peligro la integridad física del rival.",
        descripcionEu: "Defentsa batek gehiegizko indarrarekin egindako sarrera bat burutzen du, aurkariaren osotasun fisikoa arriskuan jarriz.",
        posX: 420,
        posY: 200,
        decisionCorrecta: "Falta + Tarjeta Roja",
        explicacion: "Regla 12: utilizar fuerza excesiva o poner en peligro la seguridad del adversario constituye juego brusco grave y requiere expulsión.",
        explicacionEu: "12. Araua: Gehiegizko indarra erabiltzea edo aurkariaren segurtasuna arriskuan jartzea joko zakar larria da eta kanporaketa eskatzen du."
    },
    {
        id: 4,
        tipo: "Empujón sin disputa de balón",
        tipoEu: "Baloiaren lehiarik gabeko bultzada",
        descripcion: "Un jugador empuja deliberadamente a un rival mientras el balón está en juego.",
        descripcionEu: "Jokalari batek nahita bultzatzen du aurkari bat baloia jokoan dagoen bitartean.",
        posX: 250,
        posY: 300,
        decisionCorrecta: "Falta",
        explicacion: "Regla 12: empujar a un adversario constituye una infracción sancionable con tiro libre directo cuando el balón está en juego.",
        explicacionEu: "12. Araua: Aurkari bat bultzatzea jaurtiketa libre zuzenarekin zigortu beharreko arau-haustea da baloia jokoan dagoenean."
    },
    {
        id: 5,
        tipo: "Empujón temerario",
        tipoEu: "Bultzada ausarta",
        descripcion: "Un jugador empuja a un rival de forma temeraria durante una disputa.",
        posX: 340,
        posY: 320,
        decisionCorrecta: "Falta + Tarjeta Amarilla",
        explicacion: "Regla 12: el contacto realizado de manera temeraria debe sancionarse con tiro libre directo y tarjeta amarilla.",
        explicacionEu: "12. Araua: Modu ausartean egindako ukipena jaurtiketa libre zuzenarekin eta txartel horiarekin zigortu behar da."
    },
    {
        id: 6,
        tipo: "Sujeción de camiseta",
        tipoEu: "Kamiseta heltzea",
        descripcion: "Un defensor agarra claramente la camiseta del atacante para impedir que avance.",
        descripcionEu: "Defentsa batek garbi heltzen dio erasotzailearen kamisetari aurrera egitea eragozteko.",
        posX: 520,
        posY: 250,
        decisionCorrecta: "Falta",
        explicacion: "Regla 12: sujetar a un adversario constituye una infracción de tiro libre directo.",
        explicacionEu: "12. Araua: Aurkari bati heltzea jaurtiketa libre zuzeneko arau-haustea da."
    },
    {
        id: 7,
        tipo: "Sujeción para detener ataque prometedor",
        tipoEu: "Eraso promesgarri bat eteteko helduketa",
        descripcion: "Un defensor agarra al atacante cuando este inicia una acción prometedora.",
        posX: 550,
        posY: 310,
        decisionCorrecta: "Falta + Tarjeta Amarilla",
        explicacion: "Regla 12: detener una acción prometedora mediante una infracción sancionable con tiro libre directo puede requerir amonestación por conducta antideportiva.",
        explicacionEu: "12. Araua: Jaurtiketa libre zuzenarekin zigortu daitekeen arau-hauste baten bidez eraso promesgarri bat eteteak kirol-kontrako jokabideagatik ohartarazpena eska dezake."
    },
    {
        id: 8,
        tipo: "Zancadilla fuera del área",
        tipoEu: "Zango-trabea (zancadilla) áreatik kanpo",
        descripcion: "Un defensor intenta disputar el balón pero hace tropezar al atacante fuera del área penal.",
        posX: 400,
        posY: 350,
        decisionCorrecta: "Falta",
        explicacion: "Regla 12: poner la zancadilla o intentar ponerla constituye infracción de tiro libre directo.",
        explicacionEu: "12. Araua: Zango-trabea jartzea edo jartzen saiatzea jaurtiketa libre zuzeneko arau-haustea da."
    },
    {
        id: 9,
        tipo: "Zancadilla dentro del área",
        tipoEu: "Zango-trabea área barruan",
        descripcion: "Un defensor hace tropezar a un atacante dentro de su propia área penal.",
        posX: 650,
        posY: 300,
        decisionCorrecta: "Penalti",
        explicacion: "Reglas 12 y 14: una infracción sancionable con tiro libre directo cometida dentro del área penal del defensor se sanciona con penalti.",
        explicacionEu: "12. eta 14. Arauak: Defentsaren área penaltiaren barruan egindako jaurtiketa libre zuzenezko arau-haustea penaltiarekin zigortzen da."
    },
    {
        id: 10,
        tipo: "Entrada legal al balón",
        tipoEu: "Baloiarekiko sarrera legezkoa",
        descripcion: "El defensor toca claramente el balón primero y el contacto posterior con el atacante es consecuencia normal de la disputa.",
        posX: 430,
        posY: 250,
        decisionCorrecta: "No hay falta",
        explicacion: "No toda disputa con contacto constituye infracción. Si la acción es legal y el contacto es consecuencia normal de la disputa, se permite continuar.",
        explicacionEu: "Ukipena duen lehia oro ez da arau-haustea. Ekintza legezkotzat jotzen bada eta ukipena lehiaren ohiko ondorioa bada, jokatzen utzi behar da."
    },
    {
        id: 11,
        tipo: "Mano deliberada",
        tipoEu: "Nahita egindako eskua",
        descripcion: "Un jugador mueve deliberadamente el brazo hacia el balón y lo toca.",
        posX: 350,
        posY: 210,
        decisionCorrecta: "Falta",
        explicacion: "Regla 12: tocar deliberadamente el balón con la mano o el brazo constituye infracción sancionable con tiro libre directo.",
        explicacionEu: "12. Araua: Baloia eskuz edo besoaz nahita ukitzea jaurtiketa libre zuzenarekin zigortzeko moduko arau-haustea da."
    },
    {
        id: 12,
        tipo: "Mano accidental sin consecuencia",
        tipoEu: "Ondorioik gabeko eskua nahigabe",
        descripcion: "El balón golpea accidentalmente el brazo de un jugador y este no obtiene una ventaja inmediata relevante.",
        posX: 280,
        posY: 230,
        decisionCorrecta: "No hay falta",
        explicacion: "Regla 12: no todo contacto del balón con la mano o brazo constituye infracción. Deben cumplirse los criterios establecidos para sancionar mano.",
        explicacionEu: "12. Araua: Baloia eskuz edo besoaz ukitze oro ez da arau-haustea. Eskua zigortzeko ezarritako irizpideak bete behar dira."
    },
    {
        id: 13,
        tipo: "Mano que corta un pase",
        tipoEu: "Pase bat mozten duen eskua",
        descripcion: "Un defensor coloca el brazo de manera antinatural y el balón impacta claramente en él, impidiendo un pase.",
        posX: 500,
        posY: 280,
        decisionCorrecta: "Falta",
        explicacion: "Regla 12: una posición del brazo que no sea consecuencia de un movimiento corporal justificable puede constituir una infracción por mano.",
        explicacionEu: "12. Araua: Gorputzaren mugimendu justifikagarri baten ondorio ez den besoaren posizio batek eskuko arau-haustea ekar dezake."
    },
    {
        id: 14,
        tipo: "Mano dentro del área",
        tipoEu: "Eskua área barruan",
        descripcion: "El balón golpea el brazo de un defensor dentro de su área y la posición del brazo hace que el cuerpo ocupe un espacio mayor de forma no justificable.",
        posX: 650,
        posY: 250,
        decisionCorrecta: "Penalti",
        explicacion: "Regla 12: una infracción por mano cometida por un defensor dentro de su propia área se sanciona con penalti.",
        explicacionEu: "12. Araua: Defentsa batek bere árearen barruan egindako eskuko arau-haustea penaltiarekin zigortzen da."
    },
    {
        id: 15,
        tipo: "Mano que evita ocasión manifiesta",
        tipoEu: "Aukera garbia eragozten duen eskua",
        descripcion: "Un defensor detiene deliberadamente con la mano un balón que se dirigía hacia una portería sin guardameta.",
        posX: 700,
        posY: 200,
        decisionCorrecta: "Falta + Tarjeta Roja",
        explicacion: "Regla 12: una mano deliberada que evita un gol o una ocasión manifiesta de gol constituye infracción de expulsión.",
        explicacionEu: "12. Araua: Gol bat edo gol aukera garbi bat eragozten duen nahita egindako eskua kanporatzeko arau-haustea da."
    },
    {
        id: 16,
        tipo: "Mano DOGSO dentro del área",
        tipoEu: "DOGSO eskua área barruan",
        descripcion: "Un defensor comete una mano no deliberada dentro de su área y con ella evita una ocasión manifiesta de gol.",
        posX: 680,
        posY: 280,
        decisionCorrecta: "Penalti + Tarjeta Amarilla",
        explicacion: "Regla 12: cuando una mano no deliberada provoca un DOGSO y se concede penalti, corresponde tarjeta amarilla.",
        explicacionEu: "12. Araua: Nahita gabeko eskuko batek DOGSO bat eragiten duenean eta penaltia adierazten denean, txartel horia dagokio."
    },
    {
        id: 17,
        tipo: "DOGSO con posibilidad de jugar balón",
        tipoEu: "DOGSO baloia jokatzeko aukerarekin",
        descripcion: "Un defensor derriba dentro del área a un atacante que tenía una ocasión manifiesta de gol intentando disputar el balón.",
        posX: 620,
        posY: 340,
        decisionCorrecta: "Penalti + Tarjeta Amarilla",
        explicacion: "Regla 12: si la infracción dentro del área es un intento de jugar el balón y evita una ocasión manifiesta de gol, se sanciona con penalti y amarilla.",
        explicacionEu: "12. Araua: Árearen barruko arau-haustea baloia jokatzeko saiakera bat bada eta gol aukera garbi bat eragozten badu, penaltiarekin eta horiarekin zigortzen da."
    },
    {
        id: 18,
        tipo: "DOGSO sin posibilidad de disputar balón",
        tipoEu: "DOGSO baloia lehiatzeko aukerarik gabe",
        descripcion: "Un defensor agarra deliberadamente al atacante dentro del área para impedir una ocasión manifiesta de gol, sin posibilidad real de jugar el balón.",
        posX: 600,
        posY: 230,
        decisionCorrecta: "Penalti + Tarjeta Roja",
        explicacion: "Regla 12: un DOGSO mediante una infracción distinta de intentar jugar el balón, como una sujeción, normalmente requiere expulsión.",
        explicacionEu: "12. Araua: Baloia jokatzen saiatzea ez den beste arau-hauste baten bidezko DOGSO batek, helduketa batek kasu, normalean kanporaketa eskatzen du."
    },
    {
        id: 19,
        tipo: "Juego brusco grave",
        tipoEu: "Joko zakar larria",
        descripcion: "Un jugador entra violentamente a un rival mientras disputa el balón y pone en peligro su integridad física.",
        posX: 360,
        posY: 360,
        decisionCorrecta: "Falta + Tarjeta Roja",
        explicacion: "Regla 12: una entrada o disputa que ponga en peligro la seguridad del adversario mediante fuerza excesiva constituye juego brusco grave.",
        explicacionEu: "12. Araua: Gehiegizko indarrez aurkariaren segurtasuna arriskuan jartzen duen sarrera edo lehia joko zakar larria da."
    },
    {
        id: 20,
        tipo: "Conducta violenta sin balón",
        tipoEu: "Jokabide bortitza baloirik gabe",
        descripcion: "Un jugador golpea deliberadamente a un adversario cuando ambos no están disputando el balón.",
        posX: 450,
        posY: 400,
        decisionCorrecta: "Falta + Tarjeta Roja",
        explicacion: "Regla 12: emplear o intentar emplear fuerza excesiva o brutalidad contra un adversario cuando no se disputa el balón constituye conducta violenta.",
        explicacionEu: "12. Araua: Baloia lehiatzen ari ez direnean aurkari baten aurka gehiegizko indarra edo basakeria erabiltzea edo erabiltzen saiatzea jokabide bortitza da."
    },
    {
        id: 21,
        tipo: "Insulto a un adversario",
        tipoEu: "Irainak aurkari bati",
        descripcion: "Un jugador utiliza lenguaje ofensivo, insultante o humillante contra un adversario.",
        posX: 300,
        posY: 400,
        decisionCorrecta: "Falta + Tarjeta Amarilla",
        explicacion: "Regla 12: utilizar lenguaje o comportarse de forma ofensiva, insultante o humillante es una infracción sancionable con tiro libre indirecto y puede requerir tarjeta.",
        explicacionEu: "12. Araua: Hizkuntza erasokorra, irainduzkoa edo umiliagarria erabiltzea edo horrela jokatzea jaurtiketa libre zeharkakoarekin zigortzeko moduko arau-haustea da eta txartela eska dezake."
    },
    {
        id: 22,
        tipo: "Juego peligroso sin contacto",
        tipoEu: "Joko arriskutsua ukipenik gabe",
        descripcion: "Un jugador levanta la pierna peligrosamente cerca de la cabeza de un rival, sin llegar a producir contacto.",
        posX: 420,
        posY: 310,
        decisionCorrecta: "Falta",
        explicacion: "Regla 12: jugar de forma peligrosa sin contacto físico se sanciona con tiro libre indirecto.",
        explicacionEu: "12. Araua: Ukipen fisikorik gabe modu arriskutsuan jokatzea jaurtiketa libre zeharkakoarekin zigortzen da."
    },
    {
        id: 23,
        tipo: "Carga legal",
        tipoEu: "Karga legezkoa",
        descripcion: "Un jugador carga contra un rival hombro contra hombro de forma legal mientras ambos disputan el balón.",
        posX: 350,
        posY: 170,
        decisionCorrecta: "No hay falta",
        explicacion: "Una carga puede ser legal cuando se realiza respetando las condiciones establecidas por las Reglas de Juego.",
        explicacionEu: "Karga bat legezkoa izan daiteke Joko Arauek ezarritako baldintzak errespetatuz burutzen denean."
    },
    {
        id: 24,
        tipo: "Obstrucción sin contacto",
        tipoEu: "Obstrukzioa ukipenik gabe",
        descripcion: "Un jugador se coloca deliberadamente en la trayectoria de un rival sin realizar contacto físico.",
        posX: 270,
        posY: 350,
        decisionCorrecta: "Falta",
        explicacion: "Regla 12: obstaculizar el avance de un adversario sin contacto físico se sanciona con tiro libre indirecto.",
        explicacionEu: "12. Araua: Ukipen fisikorik gabe aurkari baten aurrerapena oztopatzea jaurtiketa libre zeharkakoarekin zigortzen da."
    },
    {
        id: 25,
        tipo: "Fuera de juego claro",
        tipoEu: "Jekiz kanpo (Fuera de juego) garbia",
        descripcion: "Un atacante está más cerca de la línea de meta que el balón y el penúltimo defensor cuando su compañero juega el balón. Después participa directamente en la jugada.",
        posX: 650,
        posY: 150,
        decisionCorrecta: "Fuera de juego",
        explicacion: "Regla 11: estar en posición de fuera de juego no es suficiente; debe existir participación activa en el juego.",
        explicacionEu: "11. Araua: Jokoz kanpoko posizioan egotea ez da nahikoa; jokoan parte-hartze aktiboa egon behar da."
    },
    {
        id: 26,
        tipo: "Atacante en línea",
        tipoEu: "Erasotzailea lerro berean",
        descripcion: "El atacante está exactamente a la misma altura que el penúltimo defensor cuando su compañero juega el balón.",
        posX: 580,
        posY: 160,
        decisionCorrecta: "No hay falta",
        explicacion: "Regla 11: un jugador que está a la misma altura que el penúltimo adversario no se encuentra en posición de fuera de juego.",
        explicacionEu: "11. Araua: Azken-aurreko aurkariaren altuera berean dagoen jokalari bat ez dago jokoz kanpoko posizioan."
    },
    {
        id: 27,
        tipo: "Fuera de juego por interferir al portero",
        tipoEu: "Jokoz kanpo atezaina oztopatzeagatik",
        descripcion: "Un atacante en posición de fuera de juego bloquea claramente la línea de visión del guardameta cuando otro compañero dispara.",
        posX: 670,
        posY: 190,
        decisionCorrecta: "Fuera de juego",
        explicacion: "Regla 11: un jugador en posición de fuera de juego comete infracción si interfiere con un adversario, por ejemplo bloqueando claramente su línea de visión.",
        explicacionEu: "11. Araua: Jokoz kanpoko posizioan dagoen jokalari batek arau-haustea egiten du aurkari batekin oztopatzen badu, adibidez bere ikusmen-lerroa garbi blokeatuz."
    },
    {
        id: 28,
        tipo: "Fuera de juego tras rechace del portero",
        tipoEu: "Jokoz kanpo atezainaren aldaratzearen ondoren",
        descripcion: "Un atacante estaba en fuera de juego cuando su compañero disparó. El portero rechaza el balón y el atacante marca.",
        posX: 700,
        posY: 220,
        decisionCorrecta: "Fuera de juego",
        explicacion: "Regla 11: sacar ventaja de una posición de fuera de juego jugando un balón que ha sido rechazado por el adversario puede constituir infracción.",
        explicacionEu: "11. Araua: Aurkariak aldaratutako baloi bat jokatuz jokoz kanpoko posizio batetik abantaila ateratzea arau-haustea izan daiteke."
    },
    {
        id: 29,
        tipo: "Fuera de juego tras córner",
        tipoEu: "Jokoz kanpo korner baten ostean",
        descripcion: "Un atacante recibe directamente el balón procedente de un saque de esquina aunque estaba inicialmente en posición adelantada.",
        posX: 680,
        posY: 100,
        decisionCorrecta: "No hay falta",
        explicacion: "Regla 11: no existe infracción de fuera de juego cuando un jugador recibe directamente el balón de un saque de esquina.",
        explicacionEu: "11. Araua: Ez dago jokoz kanpoko arau-hausterik jokalari batek zuzenean korner batetik baloia jasotzen duenean."
    },
    {
        id: 30,
        tipo: "Fuera de juego tras saque de meta",
        tipoEu: "Jokoz kanpo ateko sakearen ostean",
        descripcion: "Un atacante recibe directamente el balón de un saque de meta y posteriormente avanza hacia la portería.",
        posX: 550,
        posY: 120,
        decisionCorrecta: "No hay falta",
        explicacion: "Regla 11: no existe infracción de fuera de juego cuando el jugador recibe directamente el balón de un saque de meta.",
        explicacionEu: "11. Araua: Ez dago jokoz kanpoko arau-hausterik jokalariak ateko sake batetik zuzenean baloia jasotzen duenean."
    },
    {
        id: 31,
        tipo: "Fuera de juego tras saque de banda",
        tipoEu: "Jokoz kanpo alboko sakearen ostean",
        descripcion: "Un atacante recibe directamente el balón de un saque de banda aunque se encontraba adelantado.",
        posX: 500,
        posY: 100,
        decisionCorrecta: "No hay falta",
        explicacion: "Regla 11: un jugador no puede ser sancionado por fuera de juego al recibir directamente el balón de un saque de banda.",
        explicacionEu: "11. Araua: Jokalari bat ezin da jokoz kanpo zigortu alboko sake batetik zuzenean baloia jasotzean."
    },
    {
        id: 32,
        tipo: "Atacante en posición de fuera de juego sin participar",
        tipoEu: "Erasotzailea jokoz kanpoko posizioan parte hartu gabe",
        descripcion: "Un delantero está adelantado pero no toca el balón ni interfiere con ningún adversario. Otro compañero recibe el pase.",
        posX: 600,
        posY: 120,
        decisionCorrecta: "No hay falta",
        explicacion: "Regla 11: estar en posición de fuera de juego por sí mismo no constituye infracción. Es necesaria participación activa.",
        explicacionEu: "11. Araua: Berez jokoz kanpoko posizioan egotea ez da arau-haustea. Parte-hartze aktiboa beharrezkoa da."
    },
    {
        id: 33,
        tipo: "Gol legal",
        tipoEu: "Gol legitimoa",
        descripcion: "El delantero recibe un pase estando habilitado y marca sin cometer ninguna infracción.",
        posX: 720,
        posY: 170,
        decisionCorrecta: "Gol",
        explicacion: "Reglas 10 y 11: si el balón entra completamente en la portería y no existe una infracción previa, el gol debe concederse.",
        explicacionEu: "10. eta 11. Arauak: Baloia erabat sartzen bada atean eta aurretiazko arau-hausterik ez badago, gola eman egin behar da."
    },
    {
        id: 34,
        tipo: "Gol anulado por mano atacante",
        tipoEu: "Erasotzailearen eskuagatik baliogabetutako gola",
        descripcion: "Un delantero controla deliberadamente el balón con la mano y posteriormente marca.",
        posX: 700,
        posY: 300,
        decisionCorrecta: "Falta",
        explicacion: "Regla 12: tocar deliberadamente el balón con la mano constituye infracción. El gol no puede concederse.",
        explicacionEu: "12. Araua: Baloia eskuz nahita ukitzea arau-haustea da. Gola ezin da eman."
    },
    {
        id: 35,
        tipo: "Falta dentro del área con ventaja",
        tipoEu: "Falta área barruan abantailarekin",
        descripcion: "Un defensor comete una falta sobre un atacante, pero el balón queda en posesión clara del atacante y existe una ocasión evidente para continuar.",
        posX: 590,
        posY: 280,
        decisionCorrecta: "Falta",
        explicacion: "Regla 5: el árbitro puede aplicar ventaja cuando el equipo no infractor se beneficia de continuar la acción. La infracción disciplinaria se valorará posteriormente cuando corresponda.",
        explicacionEu: "5. Araua: Epaileak abantaila aplika dezake arau-hauste egin ez duen taldeari ekintza jarraitzeak mesede egiten dionean. Diziplina-zehapena aurrerago baloratuko da dagokionean."
    },
    {
        id: 36,
        tipo: "Ventaja y gol",
        tipoEu: "Abantaila eta gola",
        descripcion: "Un defensor comete una falta que detiene un ataque prometedor, pero el atacante continúa, entra en el área y marca.",
        posX: 700,
        posY: 250,
        decisionCorrecta: "Gol",
        explicacion: "Regla 12: si se aplica ventaja y como consequence se marca un gol, no se muestra tarjeta amarilla por una infracción destinada únicamente a detener una acción prometedora.",
        explicacionEu: "12. Araua: Abantaila aplikatzen bada eta ondorioz gola sartzen bada, ez da txartel horirik erakusten eraso promesgarri bat eteteko soilik pentsatutako arau-hausteagatik."
    },
    {
        id: 37,
        tipo: "Falta táctica en contraataque",
        tipoEu: "Falta taktikoa kontraerasoan",
        descripcion: "Un jugador agarra a un rival para detener un contraataque prometedor.",
        posX: 330,
        posY: 250,
        decisionCorrecta: "Falta + Tarjeta Amarilla",
        explicacion: "Regla 12: detener una acción prometedora mediante una infracción sancionable puede constituir conducta antideportiva y requerir amonestación.",
        explicacionEu: "12. Araua: Eraso promesgarri bat arau-hauste zigorgarri baten bidez etetea kirol-kontrako jokabidea izan daiteke eta oharpena eskatu dezake."
    },
    {
        id: 38,
        tipo: "Balón golpeado con objeto",
        tipoEu: "Objektu batekin kolpatutako baloia",
        descripcion: "Un defensor se quita una bota y la utiliza para golpear el balón dentro de su área.",
        posX: 640,
        posY: 350,
        decisionCorrecta: "Penalti",
        explicacion: "Regla 12: si un jugador toca el balón con un objeto que lleva en la mano, se sanciona con tiro libre directo o penalti si ocurre dentro de su propia área.",
        explicacionEu: "12. Araua: Jokalari batek eskuan daraman objektu batekin baloia ukitzen badu, jaurtiketa libre zuzenarekin edo penaltiarekin zigortzen da bere árearen barruan gertatzen bada."
    },
    {
        id: 39,
        tipo: "Lanzamiento de objeto al balón",
        tipoEu: "Baloiaren aurka objektu bat jaurtitzea",
        descripcion: "Un jugador lanza deliberadamente un objeto contra el balón para evitar que llegue a un atacante.",
        posX: 520,
        posY: 330,
        decisionCorrecta: "Falta + Tarjeta Amarilla",
        explicacion: "Regla 12: utilizar un objeto para interferir con el balón constituye una infracción y la sanción disciplinaria dependerá de las circunstancias.",
        explicacionEu: "12. Araua: Baloiarekin interferitzeko objektu bat erabiltzea arau-haustea da eta diziplina-zehapena egoeraren arabera egongo da."
    },
    {
        id: 40,
        tipo: "Guardameta retiene demasiado el balón",
        tipoEu: "Atezainak baloia gehiegi atxikitzen du",
        descripcion: "El guardameta mantiene el balón controlado con las manos durante un periodo superior al permitido por las Reglas de Juego.",
        posX: 730,
        posY: 250,
        decisionCorrecta: "Falta",
        explicacion: "Regla 12: el guardameta no puede controlar el balón con las manos más allá del tiempo permitido. La infracción se sanciona con tiro libre indirecto.",
        explicacionEu: "12. Araua: Atezainak ezin du baloia eskuekin kontrolatu Joko Arauek baimendutako denbora baino gehiago. Arau-haustea jaurtiketa libre zeharkakoarekin zigortzen da."
    },
    {
        id: 41,
        tipo: "Portero recoge pase deliberado con pie",
        tipoEu: "Atezainak oinez emandako nahitaezko pasea hartzen du",
        descripcion: "Un defensor juega deliberadamente el balón con el pie hacia su guardameta y este lo recoge con las manos.",
        posX: 670,
        posY: 350,
        decisionCorrecta: "Falta",
        explicacion: "Regla 12: el guardameta no puede tocar con las manos un balón que un compañero le haya cedido deliberadamente con el pie.",
        explicacionEu: "12. Araua: Atezainak ezin ditu eskuekin ukitu kide batek oinez nahita utzi dion baloia."
    },
    {
        id: 42,
        tipo: "Portero recoge balón de cabeza",
        tipoEu: "Atezainak buruzko baloia jasotzen du",
        descripcion: "Un defensor cabecea deliberadamente el balón hacia su guardameta y este lo recoge con las manos.",
        posX: 600,
        posY: 350,
        decisionCorrecta: "No hay falta",
        explicacion: "Un guardameta puede recibir con las manos un balón cedido mediante una acción legal de cabeza, siempre que no exista un intento deliberado de eludir la Regla.",
        explicacionEu: "Atezain batek eskuz jaso dezake buruzko ekintza legal baten bidez utzitako baloi bat, Araua saihesteko nahitaezko asmorik ez dagoen bitartean."
    },
    {
        id: 43,
        tipo: "Simulación dentro del área",
        tipoEu: "Simulazioa área barruan",
        descripcion: "Un atacante entra en el área y se deja caer deliberadamente sin haber recibido contacto que justifique la caída.",
        posX: 650,
        posY: 330,
        decisionCorrecta: "Falta + Tarjeta Amarilla",
        explicacion: "Regla 12: intentar engañar al árbitro simulando haber sufrido una infracción constituye conducta antideportiva y debe sancionarse con tarjeta amarilla.",
        explicacionEu: "12. Araua: Epailea iruzurtzen saiatzea arau-hauste bat jasan duela simulatuz kirol-kontrako jokabidea da eta txartel horiarekin zigortu behar da."
    },
    {
        id: 44,
        tipo: "Celebración provocadora",
        tipoEu: "Ospakizun probokatzailea",
        descripcion: "Después de marcar, un jugador realiza una celebración provocadora dirigida claramente hacia los aficionados rivales.",
        posX: 700,
        posY: 100,
        decisionCorrecta: "Falta + Tarjeta Amarilla",
        explicacion: "Regla 12: determinadas celebraciones provocadoras o que generen una situación de confrontación pueden constituir conducta antideportiva y ser sancionables.",
        explicacionEu: "12. Araua: Ospakizun probokatzaile jakin batzuek edo konfrontazio egoera bat sortzen dutenek kirol-kontrako jokabidea ekar dezakete eta zigorgarriak izan daitezke."
    },
    {
        id: 45,
        tipo: "Protesta reiterada",
        tipoEu: "Protesta errepikatua",
        descripcion: "Un jugador protesta repetidamente las decisiones arbitrales de manera que incurre en una conducta sancionable.",
        posX: 300,
        posY: 100,
        decisionCorrecta: "Falta + Tarjeta Amarilla",
        explicacion: "Regla 12: mostrar desaprobación mediante palabras o acciones puede ser sancionado disciplinariamente.",
        explicacionEu: "12. Araua: Hitz edo ekintzen bidez desadostasuna erakustea diziplina-neurriz zigortu daiteke."
    },
    {
        id: 46,
        tipo: "Retrasar un saque",
        tipoEu: "Sake bat atzeratzea",
        descripcion: "Un jugador recoge deliberadamente el balón y se aleja con él para impedir que el rival realice rápidamente un saque.",
        posX: 200,
        posY: 250,
        decisionCorrecta: "Falta + Tarjeta Amarilla",
        explicacion: "Regla 12: retrasar la reanudación del juego es una infracción sancionable con tarjeta amarilla.",
        explicacionEu: "12. Araua: Jokoari berrekin ezinezko atzerapena egitea txartel horiarekin zigortzeko moduko arau-haustea da."
    },
    {
        id: 47,
        tipo: "Portero adelanta un pie en penalti",
        tipoEu: "Atezainak oin bat aurreratzen du penaltian",
        descripcion: "Durante un penalti, el guardameta tiene parte de un pie tocando o alineado con la línea de meta en el momento del golpeo.",
        posX: 730,
        posY: 200,
        decisionCorrecta: "No hay falta",
        explicacion: "Regla 14: en el momento del golpeo, el guardameta debe tener al menos parte de un pie tocando, en línea con o detrás de la línea de meta.",
        explicacionEu: "14. Araua: Kolpearen unean, atezainak oin baten zati bat ukitzen, lerroan edo atzealdean izan behar du ate-lerroarekiko."
    },
    {
        id: 48,
        tipo: "Portero completamente adelantado en penalti",
        tipoEu: "Atezaina guztiz aurreratuta penaltian",
        descripcion: "El guardameta abandona completamente la línea de meta antes del golpeo y su posición ilegal influye claramente en el resultado del lanzamiento.",
        posX: 710,
        posY: 220,
        decisionCorrecta: "Penalti",
        explicacion: "Regla 14: el guardameta debe cumplir los requisitos de posición hasta el golpeo. Si infringe la regla y afecta al resultado, el lanzamiento puede repetirse.",
        explicacionEu: "14. Araua: Atezainak posizio-eskakizunak bete behar ditu kolpea eman arte. Araua urratzen badu eta emaitzan eragiten badu, jaurtiketa errepikatu egin daiteke."
    },
    {
        id: 49,
        tipo: "Penalti cometido por el portero",
        tipoEu: "Atezainak egindako penaltia",
        descripcion: "El guardameta sale de su portería, derriba de manera imprudente al atacante dentro del área y evita una ocasión manifiesta de gol.",
        posX: 690,
        posY: 300,
        decisionCorrecta: "Penalti + Tarjeta Amarilla",
        explicacion: "Reglas 12 y 14: corresponde penalti por la infracción dentro del área. Si el guardameta intentaba disputar el balón, un DOGSO mediante una acción de juego puede sancionarse con amarilla.",
        explicacionEu: "12. eta 14. Arauak: Penaltia dagokio árearen barruko arau-hausteagatik. Atezaina baloia lehiatzen saiatzen ari bazen, joko-ekintza baten bidezko DOGSO bat horiarekin zigortu daiteke."
    },
    {
        id: 50,
        tipo: "Agarrón fuera que continúa dentro del área",
        tipoEu: "Kanpotik hasi eta área barruan jarraitzen duen helduketa",
        descripcion: "Un defensor comienza a sujetar al atacante fuera del área y continúa sujetándolo hasta que ambos entran en el área penal.",
        posX: 600,
        posY: 270,
        decisionCorrecta: "Penalti",
        explicacion: "Regla 12: si un defensor comienza a sujetar a un atacante fuera del área y continúa sujetándolo dentro de ella, se concede penalti.",
        explicacionEu: "12. Araua: Defentsa bat erasotzaileari áreatik kanpo heltzen hasten bada eta barruan heltzen jarraitzen badu, penaltia adierazten da."
    }
];

// ==========================================
// 2. ESTADO DEL USUARIO
// ==========================================
let usuarioState = {
    puntos: 0,
    aciertos: 0,
    totalJugadas: 0,
    racha: 0,
    maxRacha: 0
};

let marcadorActual = null;
let situacionActual = null;
let usuarioFirebaseActual = null;
let idiomaActual = "es";

// ==========================================
// 3. DICCIONARIO MULTIDIOMA DE LA INTERFAZ
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
        btnPenalti: "Penalti",
        btnPenaltiAmarilla: "Penalti + Amarilla",
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
        btnSiguiente: "Hurrengo jokaldia",
        decisionOficial: "Erabaki ofiziala:",
        aciertoMsg: "ERABAKI ZUZENA! 👏",
        falloMsg: "OKERRA ❌"
    }
};

// ==========================================
// 4. REFERENCIAS AL DOM
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
// 5. FUNCIONES DE SINCRONIZACIÓN EN LA NUBE
// ==========================================
async function guardarProgreso() {
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
            await guardarProgreso();
        }
        actualizarMarcador();
    } catch (e) {
        console.error("Error al cargar de Firestore:", e);
    }
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
    
    // Soporte bilingüe en la interfaz de la jugada
    tituloSituacion.textContent = (idiomaActual === 'eu' && situacionActual.tipoEu) ? situacionActual.tipoEu : situacionActual.tipo;
    descripcionSituacion.textContent = (idiomaActual === 'eu' && situacionActual.descripcionEu) ? situacionActual.descripcionEu : situacionActual.descripcion;

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
    const t = traducciones[idiomaActual];

    botonesOpcion.forEach(btn => btn.disabled = true);
    panelFeedback.classList.remove('oculto');

    usuarioState.totalJugadas++;

    if (decisionElegida.trim() === situacionActual.decisionCorrecta.trim()) {
        usuarioState.aciertos++;
        usuarioState.racha++;
        if (usuarioState.racha > usuarioState.maxRacha) {
            usuarioState.maxRacha = usuarioState.racha;
        }

        const puntosGanados = 100 + (usuarioState.racha > 1 ? (usuarioState.racha - 1) * 20 : 0);
        usuarioState.puntos += puntosGanados;

        panelFeedback.classList.add('acierto');
        resultadoFeedback.textContent = `${t.aciertoMsg} (+${puntosGanados} pts)`;
    } else {
        usuarioState.racha = 0;
        panelFeedback.classList.add('fallo');
        resultadoFeedback.textContent = `${t.falloMsg} (${t.decisionOficial} ${situacionActual.decisionCorrecta})`;
    }

    const explicacionFinal = (idiomaActual === 'eu' && situacionActual.explicacionEu) ? situacionActual.explicacionEu : situacionActual.explicacion;
    explicacionFeedback.textContent = explicacionFinal;

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

    // Actualizar etiquetas de los 6 botones de opciones
    if (botonesOpcion.length >= 6) {
        botonesOpcion[0].innerHTML = `<span class="decision__glyph" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 12.5L10 17.5L19 6.5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span> ${t.btnNoFalta}`;
        botonesOpcion[1].innerHTML = `<span class="decision__glyph" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2.2"/><path d="M12 7v6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><circle cx="12" cy="16.3" r="1.15" fill="currentColor"/></svg></span> ${t.btnFalta}`;
        botonesOpcion[2].innerHTML = `<span class="decision__card" aria-hidden="true"></span> ${t.btnAmarilla}`;
        botonesOpcion[3].innerHTML = `<span class="decision__card" aria-hidden="true"></span> ${t.btnRoja}`;
        botonesOpcion[4].innerHTML = `<span class="decision__card" aria-hidden="true" style="background:var(--papel)"></span> ${t.btnPenalti}`;
        botonesOpcion[5].innerHTML = `<span class="decision__card" aria-hidden="true" style="background:var(--amarilla)"></span> ${t.btnPenaltiAmarilla}`;
    }

    const btnSig = document.getElementById('btn-nueva-situacion');
    if (btnSig) btnSig.textContent = t.btnSiguiente;

    if (situacionActual) {
        tituloSituacion.textContent = (idiomaActual === 'eu' && situacionActual.tipoEu) ? situacionActual.tipoEu : situacionActual.tipo;
        descripcionSituacion.textContent = (idiomaActual === 'eu' && situacionActual.descripcionEu) ? situacionActual.descripcionEu : situacionActual.descripcion;
    }
}

// ==========================================
// 6. EVENTOS E INICIALIZACIÓN
// ==========================================
botonNuevaSituacion.addEventListener('click', cargarNuevaSituacion);

botonesOpcion.forEach(boton => {
    boton.addEventListener('click', evaluarDecision);
});

document.addEventListener("DOMContentLoaded", () => {
    const contenedorBanderas = document.getElementById("selector-idioma");
    if (contenedorBanderas) {
        contenedorBanderas.addEventListener("click", (e) => {
            const boton = e.target.closest("button");
            if (!boton) return;
            
            idiomaActual = boton.getAttribute("data-lang");
            aplicarTraducciones();
        });
    }
});

// Inicialización de arranque
actualizarMarcador();
cargarNuevaSituacion();

// ==========================================
// 7. GESTIÓN DE MODAL Y SESIÓN (FIREBASE)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const modalAuth = document.getElementById("auth-modal");
  const btnAbrirAuth = document.getElementById("btn-abrir-auth");
  const btnCerrarAuth = document.getElementById("btn-cerrar-auth");

  if (btnAbrirAuth && modalAuth) {
    btnAbrirAuth.addEventListener("click", () => {
      modalAuth.style.display = "flex";
    });
  }

  if (btnCerrarAuth && modalAuth) {
    btnCerrarAuth.addEventListener("click", () => {
      modalAuth.style.display = "none";
    });
  }

  window.addEventListener("click", (e) => {
    if (modalAuth && e.target === modalAuth) {
      modalAuth.style.display = "none";
    }
  });

  setTimeout(() => {
    const { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } = window.refSimFirebase || {};
    
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
        actualizarMarcador();
      }
    });

    if (btnLogin && btnRegister && emailInput && passwordInput && statusText) {
      btnLogin.addEventListener("click", async () => {
        try {
          await signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
          statusText.style.color = "#2E9B5E";
          statusText.innerText = "¡Inicio de sesión exitoso!";
          setTimeout(() => { 
            if (modalAuth) modalAuth.style.display = "none"; 
          }, 1000);
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
          setTimeout(() => { 
            if (modalAuth) modalAuth.style.display = "none"; 
          }, 1000);
        } catch (error) {
          statusText.style.color = "#E63946";
          statusText.innerText = "Error: " + error.message;
        }
      });
    }
  }, 1000);
});