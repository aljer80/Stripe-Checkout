const { userJoiSchema } = require("../utilities/userValidation.js");
const bcrypt = require("bcrypt"); 


//funktion för att hämta en specifik användare
async function getUserById(req, res, next){
    try{
        //const user = 
        if (user) {
            res.status(200).json( user.username)
        } else {
            res.status(404).json("User with username " + req.params.id + " was not found");
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json();
    }
   
};


module.exports = { getUserById };