const express = require("express")
const cors = require("cors")
const { markAsUntransferable } = require("worker_threads")

const app = express()
const jugadores = []

app.use(cors())
app.use(express.json())

class Jugador {
    constructor(id){
        this.id = id
    }

    asignarMokepon(mokepon){
        this.mokepon = mokepon
    }

    actualizarPosicion(x,y){
        this.x = x
        this.y = y 
    }
}

class Mokepon {
    constructor(nombre){
        this.nombre = nombre
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

app.post("/mokepon/:jugadorId", (req,res) =>{
    const jugadorID = req.params.jugadorId || ""
    const nombre = req.body.mokepon || ""
    const mokepon = new Mokepon(nombre)

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorID == jugador.id)
    
    if (jugadorIndex >= 0){
        jugadores[jugadorIndex].asignarMokepon(mokepon)
    }

    console.log(nombre)
    //console.log(jugadorID)
    res.end()
})

app.post("/mokepon/:jugadorId/posicion", (req, res) =>{
    const jugadorID = req.params.jugadorId || ""
    const x = req.body.x || 0
    const y = req.body || 0

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorID == jugador.id)
    
    if (jugadorIndex >= 0){
        jugadores[jugadorIndex].actualizarPosicion(x,y)
    }

    const enemigos = jugadores.filter((jugador) => jugadorID != jugador.id)

    res.send({
        enemigos
    })
})

app.listen(8080, () => {
    console.log("Servidor funcionando")
})