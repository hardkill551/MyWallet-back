export function validateUser(schema){
    return (req,res,next)=>{
        const validation = schema.validate(req.body, {abortEarly: false})

        if(validation.error){
        const errors = validation.error.details.map(detail => detail.message)
        if(errors[0].includes("email")){
            return res.status(422).send("Insira um email válido")
        }
        if(errors[0].includes("password")){
            return res.status(422).send("Insira uma senha com mais de 3 caracteres")
        }
        return res.status(422).send(errors)
    }
        next()
    }
    
}

export function validateTransaction(schema){
    return (req, res, next) =>{
        const validation = schema.validate(req.body, {abortEarly:false})
        if(validation.errors){
            const errors = validation.error.details.map(detail => detail.message)
            return res.status(422).send(errors)
        }
        next()
    }

    
}
