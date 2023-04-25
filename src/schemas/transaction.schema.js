import joi from "joi"

const transactionSchema = joi.object({
    value: joi.number().positive().required(),
    text: joi.string().required()
})

export default transactionSchema