const bcrpt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const {authenticate} = require("../auth/authenticate")
const secret = require("../auth/secret")
const Users = require("../auth/authenticate")

module.exports = server =>{
    server.post("/api/register", register)
    server.post("/api/login", login)
    server.post("/api/logout", logout)
}

function register(req,res){
    let user = req.body
    const hash = bcrpt.hashSync(user.password,10)
    user.password = hash

    Users.add(user)
    .then(users=>{
        res.status(201).json(users)
    })
    .catch(err=>{
        res.status(500).json({errorMessage: "error with registering"})
    })
}

function login(req,res){
    let {username,password} = req.body

    Users.findBy({username})
        .then(user=>{
            if(user && bcrpt.compareSync(password, user.password)){
                const token = generateToken(user)

                res.status(200).json({
                    message: `Welcome ${user.username}`,
                    token
                })
            }else{
                res.status(401).json({errorMessage: "Error, username or password is incorrect"})
            }
        })
        .catch(err=>{
            res.status(500).json({errorMessage: "Error with logging in occurred "})
        })
}

function logout(req,res){
    if(req.session){
        req.session.destroy(err=>{
            if(err){
                res.status(500).json({errorMessage: "Error with loggingout"})
            }else{
                res.status(200).json({message: "logout was successful"})
            }
        })
    }else{
        res.status(500).json({errorMessage: "Error with trying to logout"})
    }
}

function generateToken(user){
    const payload = {
        subject: user.id,
        username: user.username
    }
    const options = {
        expiresIn: "id"
    }
    return jwt.sign(payload, secret, options)
}
