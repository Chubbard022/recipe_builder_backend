const knex = require("knex")
const router = require("express").Router()
const knexConfig = require("../knexfile")
const db = knex(knexConfig.development)
const {authenticate} = require("../auth/authenticate")

//receiving all recipies 
router.get("/",(req,res)=>{
    db("recipes")
        .then(Response=>{
            res.status(200).json(Response)
        })
        .catch(err=>{
            res.status(400).json(err)
        })
})

//receiving a recipe by their id
router.get("/:id",(req,res)=>{
    db("recipes")
    .where({id: req.params.id})
    .first()
    .then(response=>{
        res.status(200).json(response)
    })
    .catch(err=>{
        res.status(400).json(err)
    })
})

//posting a new recipe
router.post("/",(req,res)=>{
    newCategory = req.body

    db("recipes")
    .insert(newCategory)

    //responding back with message
    .then(response=>{
            res.status(201).json(response)
    })
    .catch(err=>{
        res.status(401).json(err)
    })
})

//editing a recipe
router.put("/:id",(req,res)=>{
    db("recipes")
    .where({id:req.params.id})
    .update(req.body)
    .then(response=>{
        res.status(200).json(response)
    })
    .catch(err=>{
        res.status(400).json(err)
    })
})

//deleting a recipe
router.delete("/:id",(req,res)=>{
    db("recipes")
    .where({id: req.params.id})
    .del()
    .then(response=>{
        res.status(203).json(response)
    })
    .catch(err=>{
        res.status(400).json(err)
    })
})

module.exports = router;