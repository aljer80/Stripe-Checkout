const { userJoiSchema } = require("../utilities/userValidation.js");
const bcrypt = require("bcrypt"); 


//funktion för att skapa en användare (kolla vad Stripe behöver)
async function createUser (req, res, next) {
    try {
        //const newUser = 
        res.status(201).json(newUser);      
    } catch (error) {
        console.log(error.message);
        res.status(500).json();
    }   
}

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

//KAN TAS BORT
//funktion för att hämta alla användare
async function getUsers(req, res, next) {
    try{
        //const users = 
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json(error);
    }
};


module.exports = { createUser, getUserById, getUsers };