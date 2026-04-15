import express from 'express'
import roleModel from '../../models/model/roleModel.js'
import roleValidation from '../../models/validation/roleValidation.js'

const signup = express.Router();

signup.post('/', async (req, res) => {
    try {
        if (!req.body || req.body == 0) {
            return res.status(400).json({
                message: "Enter all data"
            })
        }
        const { error, value } = roleValidation.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.message
            })
        }
        await roleModel.create(value);
        res.status(201).json({
            message: "signup successful"
        })
    } catch (error) {
        res.status(500).json({
            message: "signup fail",
            error
        })
    }
})

export default signup