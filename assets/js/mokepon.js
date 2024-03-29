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

const spanVidasJugador = document.getElementById("vidasJugador")
const spanVidasEnemigo = document.getElementById("vidasEnemigo")

const sectionMensajes = document.getElementById('resultado')

const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById("botonesCombate")


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
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3

class Mokepon {
    constructor(nombre, foto, vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let hipodogue = new Mokepon('Hipodogue','./assets/img/hipodoge.jpg', 5)
let capipepo = new Mokepon("Capipepo",'./assets/img/capipepo.jpg', 5)
let ratigueya = new Mokepon('Ratigueya', './assets/img/ratigueya.jpg', 5)
let langostelvis = new Mokepon('Langostelvis','./assets/img/langostelvis.jpg', 5)
let tucapalma = new Mokepon('Tucapalma','./assets/img/tucapalma.jpg', 5)
let pydos = new Mokepon('Pydos','./assets/img/pydos.jpg', 5)

hipodogue.ataques.push(
    {nombre: '💦', id:'boton-Agua'},
    {nombre: '💦', id:'boton-Agua'},
    {nombre: '💦', id:'boton-Agua'},
    {nombre: '🔥', id:'boton-Fuego'},
    {nombre: '🌱', id:'boton-Tierra'},
)

capipepo.ataques.push(
    {nombre: '🌱', id:'boton-Tierra'},
    {nombre: '🌱', id:'boton-Tierra'},
    {nombre: '🌱', id:'boton-Tierra'},
    {nombre: '💦', id:'boton-Agua'},
    {nombre: '🔥', id:'boton-Fuego'},
)

ratigueya.ataques.push(
    {nombre: '💦', id:'boton-Agua'},
    {nombre: '🔥', id:'boton-Fuego'},
    {nombre: '🔥', id:'boton-Fuego'},
    {nombre: '🌱', id:'boton-Tierra'},
    {nombre: '🌱', id:'boton-Tierra'},
)

langostelvis.ataques.push(
    {nombre: '💦', id:'boton-Agua'},
    {nombre: '💦', id:'boton-Agua'},
    {nombre: '🔥', id:'boton-Fuego'},
    {nombre: '🔥', id:'boton-Fuego'},
    {nombre: '🌱', id:'boton-Tierra'},
)

tucapalma.ataques.push(
    {nombre: '💦', id:'boton-Agua'},
    {nombre: '🔥', id:'boton-Fuego'},
    {nombre: '🔥', id:'boton-Fuego'},
    {nombre: '🔥', id:'boton-Fuego'},
    {nombre: '🌱', id:'boton-Tierra'},
)

pydos.ataques.push(
    {nombre: '💦', id:'boton-Agua'},
    {nombre: '🔥', id:'boton-Fuego'},
    {nombre: '🌱', id:'boton-Tierra'},
    {nombre: '🌱', id:'boton-Tierra'},
    {nombre: '🌱', id:'boton-Tierra'},
)

listaMokepones.push(hipodogue, capipepo, ratigueya, langostelvis, tucapalma, pydos)

function iniciarJuego(){

    sectionSeleccionarAtaque.style.display = 'none'
    sectionReiniciar.style.display = 'none'

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
}

function seleccionarMascotaJugador(){
        
    const mascotaSeleccionada = document.querySelector('input[name="mascota"]:checked')

    while (mascotaSeleccionada){
        alert("La mascota seleccionada es: " + mascotaSeleccionada.id)
        spanMascotaJugador.innerHTML = mascotaSeleccionada.id
        sectionSeleccionarMascota.style.display = 'none'
        sectionSeleccionarAtaque.style.display = 'block'
        extraerAtaques(mascotaSeleccionada)
        seleccionarMascotaEnemigo()
        return
    }

    alert("Debes seleccionar una mascota antes de continuar.");

}

function seleccionarMascotaEnemigo(){

    let enemigoAleatorio = aleatorio(0, listaMokepones.length -1)

    alert("La mascota del enemigo es: " + listaMokepones[enemigoAleatorio].nombre)
    spanMascotaEnemigo.innerHTML = listaMokepones[enemigoAleatorio].nombre

    ataquesMokeponEnemigo = listaMokepones[enemigoAleatorio].ataques

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
                console.log(ataqueJugador)
                boton.disabled = true
            }else if(e.target.textContent == '💦'){
                ataqueJugador.push('💦')
                console.log(ataqueJugador)
                boton.disabled = true
            }else{
                ataqueJugador.push('🌱')
                console.log(ataqueJugador)
                boton.disabled = true
            }
            ataqueAleatorioEnemigo()
        })
    })
}


function ataqueAleatorioEnemigo(){

    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length -1)
    ataqueEnemigo.push(ataquesMokeponEnemigo[ataqueAleatorio].nombre)

    console.log(ataqueEnemigo)


    crearMensaje()
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
            ataqueAmbosOponentesIndex[i, i]
            crearMensaje("Empate")
        }else if(ataqueJugador[i] == "🔥" && ataqueEnemigo[i] == "🌱" || ataqueJugador[i] == "💦" && ataqueEnemigo[i] == "🔥" || ataqueJugador[i] == "🌱" && ataqueEnemigo[i] == "💦"){
            ataqueAmbosOponentesIndex[i, i]
            crearMensaje("Ganaste")
            victoriasJugador++    
            spanVidasJugador.innerHTML = victoriasJugador    
        }else{
            ataqueAmbosOponentesIndex[i, i]
            crearMensaje("Perdiste")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }       
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
    nuevoAtaquedelJugador.innerHTML = ataqueJugador
    nuevoAtaquedelEnemigo.innerHTML = ataqueEnemigo


    ataquesDelJugador.appendChild(nuevoAtaquedelJugador) 
    ataquesDelEnemigo.appendChild(nuevoAtaquedelEnemigo)
}

function crearMensajeFinal(resultadoFinal){
    
    sectionMensajes.innerHTML = resultadoFinal
}


function aleatorio (min, max){
    return Math.floor(Math.random() * (max-min+1) + min)
}

function reiniciarJuego(){
    location.reload();
}

