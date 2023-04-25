import { Router } from "express";
import { active, login, register} from "../controllers/user.controller.js";
import userSchema from "../schemas/user.schema.js";
import { validateUser } from "../middlewares/validation.middleware.js";
import loginSchema from "../schemas/login.schema.js";

const userRoute = Router()

userRoute.post("/cadastro", validateUser(userSchema), register)
userRoute.post("/", validateUser(loginSchema),login)
userRoute.get("/active", active)


export default userRoute