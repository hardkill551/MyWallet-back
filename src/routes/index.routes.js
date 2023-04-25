import { Router } from "express";
import transactionRoute from "./transactions.routes.js";
import userRoute from "./user.routes.js";

const routes = Router()

routes.use(transactionRoute)
routes.use(userRoute)

export default routes