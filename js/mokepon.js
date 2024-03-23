window.addEventListener('load', iniciarJuego)

let ataqueJugador
let ataqueEnemigo

function iniciarJuego(){
    let botonMascotaJugador = document.getElementById('boton-mascota')
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    
    let botonFuego = document.getElementById("boton-fuego")
    botonFuego.addEventListener('click', ataqueFuego)
    let botonAgua = document.getElementById("boton-Agua")
    botonAgua.addEventListener('click', ataqueAgua)
    let botonTierra = document.getElementById("boton-Tierra")
    botonTierra.addEventListener('click', ataqueTierra)
}

function seleccionarMascotaJugador(){
    
    let spanMascotaJugador = document.getElementById("nomMascotaJugador")

    const mascotaSeleccionada = document.querySelector('input[name="mascota"]:checked')

    if (!mascotaSeleccionada) {
        alert("Debes seleccionar una mascota antes de continuar.");
        return;
    }
    
    alert("La mascota seleccionada es: " + mascotaSeleccionada.id)
    spanMascotaJugador.innerHTML = mascotaSeleccionada.id
    
    
    seleccionarMascotaEnemigo()
}



function seleccionarMascotaEnemigo(){

    let spanMascotaEnemigo = document.getElementById("nomMascotaEnemigo")

    const diccionarioOpciones={
        "hipodogue":"Hipodogue","capipepo":"Capipepo","ratigueya":"Ratigueya","langostelvis":"Langostelvis", "tucapalma":"Tucapalma",
        "pydos":"Pydos"
    }

    const indiceAleatorio = Math.floor(Math.random() * Object.keys(diccionarioOpciones).length);
    const resultadoAleatorio = diccionarioOpciones[Object.keys(diccionarioOpciones)[indiceAleatorio]];

    alert("La mascota del enemigo es: " + resultadoAleatorio)
    spanMascotaEnemigo.innerHTML = resultadoAleatorio

}

function ataqueFuego(){

    const mascotaSeleccionada = document.querySelector('input[name="mascota"]:checked')

    if (!mascotaSeleccionada) {
        alert("Debes seleccionar una mascota antes de continuar.");
        return;
    }

    ataqueJugador = "Fuego"
    ataqueAleatorioEnemigo()
}

function ataqueAgua(){

    const mascotaSeleccionada = document.querySelector('input[name="mascota"]:checked')

    if (!mascotaSeleccionada) {
        alert("Debes seleccionar una mascota antes de continuar.");
        return;
    }

    ataqueJugador = "Agua"
    ataqueAleatorioEnemigo()
}

function ataqueTierra(){

    const mascotaSeleccionada = document.querySelector('input[name="mascota"]:checked')

    if (!mascotaSeleccionada) {
        alert("Debes seleccionar una mascota antes de continuar.");
        return;
    }

    ataqueJugador = "Tierra"
    ataqueAleatorioEnemigo()
}

function crearMensaje(){
    let sectionMensajes = document.getElementById("mensajes")

    let parrafo = document.createElement("p")
    parrafo.innerHTML = "Tu máscota atacó con " + ataqueJugador + ", la mascota del enemigo atacó con " + ataqueEnemigo +  " Pendiente"

    sectionMensajes.appendChild(parrafo)
}

function ataqueAleatorioEnemigo(){
    
    const diccionarioAtaques={
        "fuego":"Fuego","agua":"Agua","tierra":"Tierra"
    }

    const ataqueAleatorio = Math.floor(Math.random() * Object.keys(diccionarioAtaques).length);
    const enemigoAleatorio = diccionarioAtaques[Object.keys(diccionarioAtaques)[ataqueAleatorio]];

    ataqueEnemigo = enemigoAleatorio
    //alert("El ataque del enemigo es: " + enemigoAleatorio)
    crearMensaje()
}

