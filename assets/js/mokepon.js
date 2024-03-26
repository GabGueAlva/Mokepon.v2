window.addEventListener('load', iniciarJuego)

let ataqueJugador
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3

function iniciarJuego(){

    let sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
    sectionSeleccionarAtaque.style.display = 'none'

    let sectionReiniciar = document.getElementById("reiniciar")
    sectionReiniciar.style.display = 'none'

    let botonMascotaJugador = document.getElementById('boton-mascota')
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    
    let botonFuego = document.getElementById("boton-fuego")
    botonFuego.addEventListener('click', ataqueFuego)
    let botonAgua = document.getElementById("boton-Agua")
    botonAgua.addEventListener('click', ataqueAgua)
    let botonTierra = document.getElementById("boton-Tierra")
    botonTierra.addEventListener('click', ataqueTierra)

    let botonReiniciar = document.getElementById("boton-Reiniciar")
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador(){
    
    let sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")

    let sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")

    let spanMascotaJugador = document.getElementById("nomMascotaJugador")
    const radios = document.querySelectorAll('input[type="radio"][name="mascota"]')
    
    const mascotaSeleccionada = document.querySelector('input[name="mascota"]:checked')


    while (mascotaSeleccionada){
        alert("La mascota seleccionada es: " + mascotaSeleccionada.id)
        spanMascotaJugador.innerHTML = mascotaSeleccionada.id
        sectionSeleccionarMascota.style.display = 'none'
        sectionSeleccionarAtaque.style.display = 'block'
        seleccionarMascotaEnemigo()
        return
    }

    alert("Debes seleccionar una mascota antes de continuar.");

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
    let botonFuego = document.getElementById("boton-fuego")

    while(vidasEnemigo > 0 && vidasJugador > 0){
        ataqueJugador = "Fuego"
        ataqueAleatorioEnemigo()
        return
    }
    
    botonFuego.disabled = true

}

function ataqueAgua(){

    const mascotaSeleccionada = document.querySelector('input[name="mascota"]:checked')
    let botonAgua = document.getElementById("boton-Agua")

    while(vidasEnemigo > 0 && vidasJugador > 0){
        ataqueJugador = "Agua"
        ataqueAleatorioEnemigo()
        return
    }

    botonAgua.disabled= true
}

function ataqueTierra(){

    const mascotaSeleccionada = document.querySelector('input[name="mascota"]:checked')
    let botonTierra = document.getElementById("boton-Tierra")

    while(vidasEnemigo > 0 && vidasJugador > 0){
        ataqueJugador = "Tierra"
        ataqueAleatorioEnemigo()
        return
    }

    botonTierra.disabled = true
}

function combate(){

    let spanVidasJugador = document.getElementById("vidasJugador")

    let spanVidasEnemigo = document.getElementById("vidasEnemigo")

    let sectionReiniciar = document.getElementById("reiniciar")

    if(ataqueEnemigo == ataqueJugador){
        crearMensaje("Hubo empate")
    }else if(ataqueJugador == "Fuego" && ataqueEnemigo == "Tierra" || ataqueJugador == "Agua" && ataqueEnemigo == "Fuego" || ataqueJugador == "Tierra" && ataqueEnemigo == "Agua"){
        crearMensaje("Ganaste")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    }else{
        crearMensaje("Perdiste")
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
    }

    if (vidasEnemigo == 0){
        crearMensajeFinal("¡Felicitaciones, ganaste la partida!")
        sectionReiniciar.style.display = 'block'
    }else if(vidasJugador == 0){
        crearMensajeFinal(" ¡Perdiste la partida!")
        sectionReiniciar.style.display = 'block'
    }

}    


function crearMensaje(resultadoCombate){
    let sectionMensajes = document.getElementById("mensajes")

    let parrafo = document.createElement("p")
    parrafo.innerHTML = "Tu máscota atacó con " + ataqueJugador + ", la mascota del enemigo atacó con " + ataqueEnemigo + ", " + resultadoCombate

    sectionMensajes.appendChild(parrafo)
}

function crearMensajeFinal(resultadoCombate){
    let sectionMensajes = document.getElementById("mensajes")

    let parrafo = document.createElement("p")
    parrafo.innerHTML = resultadoCombate

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
    combate()
}

function reiniciarJuego(){
    location.reload();
}

