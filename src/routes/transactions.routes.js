import { Router } from "express";
import { postTransaction, getTransaction } from "../controllers/transaction.controller.js";
import { validateTransaction } from "../middlewares/validation.middleware.js";
import transactionSchema from "../schemas/transaction.schema.js";




const transactionRoute = Router()

transactionRoute.post("/transacao/:tipo", validateTransaction(transactionSchema),postTransaction)
transactionRoute.get("/home", getTransaction)

export default transactionRoute