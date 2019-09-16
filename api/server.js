const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const configureRoutes = require("../config/routes")

const recipeRouter = require("../routes/recipeRoutes")
const categoryRouter = require("../routes/categoryRoutes")

const {authenticate} = require("../auth/authenticate")

const server = express()

server.use(express.json())
server.use(helmet())
server.use(cors({
    //origin: //put netlify url here,
    credentials: true
}))
server.use("/api/recipe",recipeRouter)
server.use("/api/category",categoryRouter)

server.get("/",(req,res)=>{
    res.status(200).json("server is working")
})

configureRoutes(server);
module.exports = server