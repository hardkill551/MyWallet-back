import { db } from "../database/database.connection.js"
import dayjs from "dayjs"

export async function postTransaction(req,res){
    const {value, description} = req.body
    const {tipo}=req.params
    const {authorization} = req.headers
    const token = authorization?.replace("Bearer ", "")
    if(!token) return res.sendStatus(401)

    try {
        const user = await db.collection("sessions").findOne({token})
        const date = new Date()
        await db.collection("come").insertOne({value, description, type:tipo, userId: user.userId, date:dayjs(date).format('DD/MM')})
    
        res.status(201).send("Transação feita!")
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getTransaction(req,res){
    const {authorization} = req.headers
    const token = authorization?.replace("Bearer ", "")
    if(!token) return res.sendStatus(401)
    try {
        const user = await db.collection("sessions").findOne({token})
        
        const transactions = await db.collection("come").find({userId: user.userId}).toArray()

        transactions.map(o =>{
            delete o.userId
            delete o._id

        })
        res.status(200).send(transactions.reverse())
    } catch (err) {
        res.status(500).send(err.message)
    }
}