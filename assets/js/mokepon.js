window.addEventListener('load', iniciarJuego)


const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const sectionReiniciar = document.getElementById("reiniciar")
const botonMascotaJugador = document.getElementById('boton-mascota')
const spanMascotaJugador = document.getElementById("nomMascotaJugador")
const botonReiniciar = document.getElementById("boton-Reiniciar")

const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const spanMascotaEnemigo = document.getElementById("nomMascotaEnemigo")
const mascotaSeleccionada = document.querySelector('input[name="mascota"]:checked')


const spanVidasJugador = document.getElementById("vidasJugador")
const spanVidasEnemigo = document.getElementById("vidasEnemigo")

const sectionMensajes = document.getElementById('resultado')

const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById("botonesCombate")

const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let jugadorId = null
let mascotaJugadorObjeto
let indexAtaqueJugador
let indexAtaqueEnemigo
let listaMokepones = []
let ataqueJugador = []
let ataqueEnemigo = []
let botones = []
let botonFuego 
let botonAgua 
let botonTierra 
let opcionMokepones
let ataquesMokepon 
let ataquesMokeponEnemigo = []
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground= new Image()
mapaBackground.src = './assets/img/mapaMokepon.jpg'

class Mokepon {
    constructor(nombre, foto, vida, id = null){
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 60
        this.alto = 60
        this.x = aleatorio(0, 400 - this.ancho)
        this.y = aleatorio(0, 400 - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = foto 
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let hipodogue = new Mokepon('Hipodogue','./assets/img/hipodoge.jpg', 5)
let capipepo = new Mokepon("Capipepo",'./assets/img/capipepo.jpg', 5)
let ratigueya = new Mokepon('Ratigueya', './assets/img/ratigueya.jpg', 5)
let langostelvis = new Mokepon('Langostelvis','./assets/img/langostelvis.jpg', 5)
let tucapalma = new Mokepon('Tucapalma','./assets/img/tucapalma.jpg', 5)
let pydos = new Mokepon('Pydos','./assets/img/pydos.jpg', 5)

/*let hipodogueEnemigo = new Mokepon('Hipodogue','./assets/img/hipodoge.jpg', 5)
let capipepoEnemigo = new Mokepon("Capipepo",'./assets/img/capipepo.jpg', 5)
let ratigueyaEnemigo = new Mokepon('Ratigueya', './assets/img/ratigueya.jpg', 5)
let langostelvisEnemigo = new Mokepon('Langostelvis','./assets/img/langostelvis.jpg', 5)
let tucapalmaEnemigo = new Mokepon('Tucapalma','./assets/img/tucapalma.jpg', 5)
let pydosEnemigo = new Mokepon('Pydos','./assets/img/pydos.jpg', 5)*/

const hipodoge_ataques = [
    {nombre: '💦', id:'boton-Agua'},
    {nombre: '💦', id:'boton-Agua'},
    {nombre: '💦', id:'boton-Agua'},
    {nombre: '🔥', id:'boton-Fuego'},
    {nombre: '🌱', id:'boton-Tierra'}
]
hipodogue.ataques.push(...hipodoge_ataques)

const capipepo_ataques = [
    {nombre: '🌱', id:'boton-Tierra'},
    {nombre: '🌱', id:'boton-Tierra'},
    {nombre: '🌱', id:'boton-Tierra'},
    {nombre: '💦', id:'boton-Agua'},
    {nombre: '🔥', id:'boton-Fuego'},
]
capipepo.ataques.push(...capipepo_ataques)

const ratigueya_ataques = [
    {nombre: '💦', id:'boton-Agua'},
    {nombre: '🔥', id:'boton-Fuego'},
    {nombre: '🔥', id:'boton-Fuego'},
    {nombre: '🌱', id:'boton-Tierra'},
    {nombre: '🌱', id:'boton-Tierra'},
]
ratigueya.ataques.push(...ratigueya_ataques)

const langostelvis_ataques = [
    {nombre: '💦', id:'boton-Agua'},
    {nombre: '💦', id:'boton-Agua'},
    {nombre: '🔥', id:'boton-Fuego'},
    {nombre: '🔥', id:'boton-Fuego'},
    {nombre: '🌱', id:'boton-Tierra'},
]

langostelvis.ataques.push(...langostelvis_ataques)

const tucapalma_ataques = [
    {nombre: '💦', id:'boton-Agua'},
    {nombre: '🔥', id:'boton-Fuego'},
    {nombre: '🔥', id:'boton-Fuego'},
    {nombre: '🔥', id:'boton-Fuego'},
    {nombre: '🌱', id:'boton-Tierra'},
]
tucapalma.ataques.push(...tucapalma_ataques)

const pydos_ataques = [
    {nombre: '💦', id:'boton-Agua'},
    {nombre: '🔥', id:'boton-Fuego'},
    {nombre: '🌱', id:'boton-Tierra'},
    {nombre: '🌱', id:'boton-Tierra'},
    {nombre: '🌱', id:'boton-Tierra'},
]
pydos.ataques.push(...pydos_ataques)

listaMokepones.push(hipodogue, capipepo, ratigueya, langostelvis, tucapalma, pydos)

function iniciarJuego(){

    sectionSeleccionarAtaque.style.display = 'none'
    sectionReiniciar.style.display = 'none'
    sectionVerMapa.style.display = 'none'

    listaMokepones.forEach((mokepon) => {
        opcionMokepones = `<input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}><p>${mokepon.nombre}</p>
        <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label> 
        `
        contenedorTarjetas.innerHTML += opcionMokepones
    })

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    botonReiniciar.addEventListener('click', reiniciarJuego)

    unirseAlJuego()
}

function unirseAlJuego(){
    fetch("http://localhost:8080/unirse")
        .then(function (res){
            if (res.ok){
                res.text()
                    .then(function (respuesta){
                        console.log(respuesta)
                        jugadorId = respuesta
                    }) 
            }
        })
}

function seleccionarMascotaJugador(){
        
    const mascotaSeleccionada = document.querySelector('input[name="mascota"]:checked')

    while (mascotaSeleccionada){
        alert("La mascota seleccionada es: " + mascotaSeleccionada.id)
        seleccionarMokepon(mascotaSeleccionada)
        spanMascotaJugador.innerHTML = mascotaSeleccionada.id
        sectionSeleccionarMascota.style.display = 'none'
        sectionVerMapa.style.display = 'flex'
        extraerAtaques(mascotaSeleccionada)
        sectionVerMapa.style.display = 'flex'
        iniciarMapa()
        return
    }

    alert("Debes seleccionar una mascota antes de continuar.");

}

function seleccionarMokepon(mascotaSeleccionada){
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaSeleccionada.id
        })
    })
}

function seleccionarMascotaEnemigo(enemigo){
    //alert("La mascota del enemigo es: " + listaMokepones[enemigoAleatorio].nombre)
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()

}

function extraerAtaques(mascotaSeleccionada){
    let ataques
    for (let i = 0; i < listaMokepones.length; i++) {
        if (mascotaSeleccionada.id == listaMokepones[i].nombre){
            ataques = listaMokepones[i].ataques
        }
    }

    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){

    
    ataques.forEach((ataque) => {
        ataquesMokepon = `<button id=${ataque.id} class="tarjetas-ataques BAtaque" >${ataque.nombre}</button>`
        contenedorAtaques.innerHTML += ataquesMokepon
    })

    botonFuego = document.getElementById("boton-Fuego")
    botonAgua = document.getElementById("boton-Agua")
    botonTierra = document.getElementById("boton-Tierra")
    botones = document.querySelectorAll('.BAtaque')

    botones.disabled = true
}

function secuenciaAtaque(){
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if(e.target.textContent == '🔥'){
                ataqueJugador.push('🔥')
                boton.disabled = true
            }else if(e.target.textContent == '💦'){
                ataqueJugador.push('💦')
                boton.disabled = true
            }else{
                ataqueJugador.push('🌱')
                boton.disabled = true
            }
            ataqueAleatorioEnemigo()
        })
    })
}


function ataqueAleatorioEnemigo(){

    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length -1)
    ataqueEnemigo.push(ataquesMokeponEnemigo[ataqueAleatorio].nombre)

    iniciarPelea()
}

function iniciarPelea(){
    if(ataqueJugador.length == 5){
        combate()
    }
}

function ataqueAmbosOponentesIndex(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate(){

    for (let i = 0; i < ataqueJugador.length; i++) {
        if(ataqueJugador[i] == ataqueEnemigo[i]){
            console.log(indexAtaqueJugador)
            ataqueAmbosOponentesIndex(i, i)
            crearMensaje("Empate")
        }else if(ataqueJugador[i] == "🔥" && ataqueEnemigo[i] == "🌱" || ataqueJugador[i] == "💦" && ataqueEnemigo[i] == "🔥" || ataqueJugador[i] == "🌱" && ataqueEnemigo[i] == "💦"){
            ataqueAmbosOponentesIndex(i, i)
            crearMensaje("Ganaste")
            victoriasJugador++    
            spanVidasJugador.innerHTML = victoriasJugador    
        }else{
            ataqueAmbosOponentesIndex(i, i)
            crearMensaje("Perdiste")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }       
        ataqueAmbosOponentesIndex(i, i)
    }

    revisarVidas()
} 

function revisarVidas(){
    if (victoriasJugador == victoriasEnemigo){
        crearMensajeFinal("¡Ops! Fue un empate")
        sectionReiniciar.style.display = 'block'
    }else if(victoriasJugador > victoriasEnemigo){
        crearMensajeFinal(" ¡Ganaste la partida!")
        sectionReiniciar.style.display = 'block'
    }else{
        crearMensajeFinal(" Perdiste la partida!")
        sectionReiniciar.style.display = 'block'
    }
}


function crearMensaje(resultado){

    let nuevoAtaquedelJugador = document.createElement('p')
    let nuevoAtaquedelEnemigo = document.createElement('p')

    //let notificacion = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaquedelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaquedelEnemigo.innerHTML = indexAtaqueEnemigo


    ataquesDelJugador.appendChild(nuevoAtaquedelJugador) 
    ataquesDelEnemigo.appendChild(nuevoAtaquedelEnemigo)
}

function crearMensajeFinal(resultadoFinal){
    
    sectionMensajes.innerHTML = resultadoFinal
}


function aleatorio (min, max){
    return Math.floor(Math.random() * (max-min+1) + min)
}

function obtenerObjetoMascota(){

    const mascotaSeleccionada = document.querySelector('input[name="mascota"]:checked')

    for (let i = 0; i < listaMokepones.length; i++) {
        if (mascotaSeleccionada.id == listaMokepones[i].nombre){
            return listaMokepones[i]
        }
    }
}

function pintarCanvas(){
    
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0,0,mapa.width,mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)
    
    /*
    if (mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0){
        revisarColision(hipodogueEnemigo)
        revisarColision(capipepoEnemigo)
        revisarColision(ratigueyaEnemigo)
    }*/
}

function enviarPosicion(x,y){
    fetch(`http://localhost:8080/mokepon/${jugadorId})/posicion/`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
        .then(function (res) {
            if (res.ok){
                res.json()  
                    .then(function ({ enemigos }) {
                        console.log(enemigos)
                        enemigos.forEach(function (enemigo) {
                            let mokeponEnemigo = null
                            const mokeponNombre = enemigo.mokepon.nombre || ""
                            if (mokeponNombre == "Hipodoge"){
                                let mokeponEnemigo = new Mokepon('Hipodogue','./assets/img/hipodoge.jpg', 5)
                            }else if (mokeponNombre == "Capipepo"){
                                let mokeponEnemigo = new Mokepon("Capipepo",'./assets/img/capipepo.jpg', 5)
                            }else if (mokeponNombre == "Ratigueya"){
                                let mokeponEnemigo = new Mokepon('Ratigueya', './assets/img/ratigueya.jpg', 5)
                            }else if (mokeponNombre == "Langostelvis"){
                                let mokeponEnemigo = new Mokepon('Langostelvis','./assets/img/langostelvis.jpg', 5)
                            }else if (mokeponNombre == "Tucapalma"){
                                let mokeponEnemigo = new Mokepon('Tucapalma','./assets/img/tucapalma.jpg', 5)
                            }else if (mokeponNombre == "Pydos"){
                                let mokeponEnemigo = new Mokepon('Pydos','./assets/img/pydos.jpg', 5)
                            }

                            mokeponEnemigo.pintarMokepon()

                            mokeponEnemigo.x = enemigo.x
                            mokeponEnemigo.y = enemigo.y
                        })
                    })
            }
        })
}

function iniciarMapa(){

    mapa.width = 400
    mapa.height = 400
    intervalo = setInterval(pintarCanvas,50)
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaSeleccionada)
    window.addEventListener('keydown', sePresionoTecla)
    window.addEventListener('keyup', detenerMovimiento)
} 

function moverDerecha(){
    mascotaJugadorObjeto.velocidadX = 5
}

function moverIzquierda(){
    mascotaJugadorObjeto.velocidadX = -5
}

function moverAbajo(){
    mascotaJugadorObjeto.velocidadY = 5
}

function moverArriba(){
    mascotaJugadorObjeto.velocidadY = -5
}

function detenerMovimiento(){
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoTecla(event){
    switch (event.key) {
        case 'ArrowUp' :
            moverArriba()
            break;
        case 'ArrowDown':
            moverAbajo()
            break;
        case 'ArrowLeft':
            moverIzquierda()
            break;
        case 'ArrowRight':
            moverDerecha()
            break;    
    }
}

function revisarColision(enemigo){

    const arribaEnemigo = enemigo.y
    const abajoEnemmigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x

    if(abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemmigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ){
        return      
    }

    detenerMovimiento()
    clearInterval(intervalo)
    sectionSeleccionarAtaque.style.display = 'block'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
}

function reiniciarJuego(){
    location.reload();
}

