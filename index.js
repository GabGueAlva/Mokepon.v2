const express = require("express")
const { markAsUntransferable } = require("worker_threads")

const app = express()
const jugadores = []

class Jugador {
    constructor(id){
        this.id = id
    }
}

//Dentro del request viene todo lo que está en el body, recibe los datos del servidor.
//Response: Lo que contestamos al usuario, con qué datos.

app.get("/unirse", (req, res) =>{
    const id = `${Math.random()}`
    const jugador = new Jugador(id)

    jugadores.push(jugador)

    res.setHeader("Access-Control-Allow-Origin", "*")

    res.send(id)
})

app.listen(8080, () => {
    console.log("Servidor funcionando")
})