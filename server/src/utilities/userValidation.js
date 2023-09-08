const Joi = require("joi"); 

const userJoiSchema = Joi.object({
    username: Joi.string().email().required(), 
    password: Joi.string().min(6).required(),   
    isAdmin: Joi.string(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
});


module.exports = { userJoiSchema };