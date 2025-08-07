import express from "express"
import cors from "cors"
import routes from "./Rotas.js"
import "./database/Conexao.js"

const server = express()

server.use(cors())
server.use(express.json())
server.use(routes)

server.listen(4000, function() {
    console.log("SERVER IS RUNNING!")
    console.log("http://localhost:4000/")
})