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
}

window.addEventListener('load', iniciarJuego)