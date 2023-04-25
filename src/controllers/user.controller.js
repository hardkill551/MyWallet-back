import { db } from "../database/database.connection.js"
import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid"


export async function register(req, res){
    const {name, email, password} = req.body

    try {
        const sameEmail = await db.collection("Users").findOne({email})
        if(sameEmail){
            return res.status(409).send("O email já existe!")
        }
        const pass = bcrypt.hashSync(password, 10);

        await db.collection("Users").insertOne({name, email, password:pass})
        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message)
    }
    
}



export async function login(req, res){
    const {email, password} = req.body
    try{
        const user = await db.collection("Users").findOne({email})
        if(!user){
            return res.status(404).send("Usuário não cadastrado")
        }
        const pass = bcrypt.compareSync(password, user.password)
        if(!pass){
            return res.status(401).send("Senha incorreta")
        }
        const token = uuid()
        await db.collection("sessions").insertOne({userId:user._id, token})
        res.send(token)

    } catch(err){
        res.status(500).send(err.message)
    }
}

export async function active(req, res){
    const {authorization} = req.headers
    const token = authorization?.replace("Bearer ", "")

    try {
        const active = await db.collection("sessions").findOne({token})
        if(!active){
            return res.send(false)
        }
        const user = await db.collection("Users").findOne({_id: active.userId})
        
        return res.send(user.name)

            
    } catch (err) {
        res.status(500).send(err.message)
    }
}