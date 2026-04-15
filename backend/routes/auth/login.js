import express from 'express'
import roleModel from '../../models/model/roleModel.js'
import roleValidation from '../../models/validation/roleValidation.js'

const login = express.Router();

login.post('/', async (req, res) => {
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
        const check=await roleModel.findOne({email:value.email,role:value.role});
        if(!check){
            return res.status(400).json({
                message:"user not found please signup"
            })
        }
        console.log(check);
        res.status(200).json({
            message: "login successful"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            error
        })
    }
})

export default login