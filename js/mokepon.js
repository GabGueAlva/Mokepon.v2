function iniciarJuego(){
    let botonMascotaJugador = document.getElementById('boton-mascota')
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
}

function seleccionarMascotaJugador(){
    
    let spanMascotaJugador = document.getElementById("nomMascotaJugador")

    const mascotaSeleccionada = document.querySelector('input[name="mascota"]:checked')
    if (mascotaSeleccionada){
        alert("La mascota seleccionada es: " + mascotaSeleccionada.id)
        spanMascotaJugador.innerHTML = mascotaSeleccionada.id
    }else{
        alert("Debes seleccionar una opción")
    }

    seleccionarMascotaEnemigo()
}

function seleccionarMascotaEnemigo(){

    let spanMascotaEnemigo = document.getElementById("nomMascotaJugador")

    const diccionarioOpciones={
        "hipodogue":"Hipodogue","capipepo":"Capipepo","ratigueya":"Ratigueya","langostelvis":"Langostelvis", "tucapalma":"Tucapalma",
        "pydos":"Pydos"
    }

    const indiceAleatorio = Math.floor(Math.random() * Object.keys(diccionarioOpciones).length);
    const resultadoAleatorio = diccionarioOpciones[Object.keys(diccionarioOpciones)[indiceAleatorio]];

    alert("La mascota del enemigo es: " + resultadoAleatorio)
    spanMascotaEnemigo.innerHTML = mascotaSeleccionada.id

}

function aleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1 ) + 1)
}


window.addEventListener('load', iniciarJuego)