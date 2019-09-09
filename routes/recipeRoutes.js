const knex = require("knex")
const router = require("express").Router()
const db = knex(knexConfig.development)
const {authenticate} = require("../auth/authenticate")

//receiving all categories 
router.get("/",authenticate,(req,res)=>{
    
})

module.exports = router;