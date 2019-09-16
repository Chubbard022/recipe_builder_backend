const knex = require("knex")
const router = require("express").Router()
const knexConfig = require("../knexfile")
const db = knex(knexConfig.development)
const {authenticate} = require("../auth/authenticate")

//receiving all categories 
router.get("/",authenticate,(req,res)=>{
    db("categories")
        .then(Response=>{
            res.status(200).json(Response)
        })
        .catch(err=>{
            res.status(400).json(err)
        })
})

//getting specific category by their id
router.get("/:id",(req,res)=>{
    db("categories")
    .where({id: categoriesID})
    .first()
    .then(response=>{
        res.status(200).json(response)
    })
    .catch(err=>{
        res.status(400).json(err)
    })
})

//getting each recipe from within a given category
router.get("/:id/recipe",(req,res)=>{
    db("recipes")
        .where({recipe_id: req.params.id})
        .then(response=>{
            res.status(200).json(response)
        })
        .catch(err=>{
            res.status(400).json(err)
        })
})

//posting a category
router.post("/",(req,res)=>{
    newCategory = req.body

    db("categories")
    .insert(newCategory)

    //responding back with message
    .then(response=>{
        const id = response[0]
        db("categories")
        .where({id})
        .first()
        .then(response=>{
            res.status(201).json(response)
        })
        .catch(err=>{
            res.status(401).json(err)
        })
    })
})

//updating a category
router.put("/:id",(req,res)=>{
    db("categories")
    .where({id:req.params.id})
    .update(req.body)
    .then(response=>{
        res.status(200).json(response)
    })
    .catch(err=>{
        res.status(400).json(err)
    })
})

//deleting a category
router.delete("/:id",(req,res)=>{
    db("categories")
    .where({id: req.params.id})
    .del()
    .then(response=>{
        res.status(200).json(response)
    })
    .catch(err=>{
        res.status(400).json(err)
    })
})

module.exports = router;