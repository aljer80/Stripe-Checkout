const fs = require('fs');
const bcrypt = require('bcrypt');

// Funktion för att registrera ny användare


// Funktion för att logga in
async function loginUser(req, res) {
    const { username, password } = req.body;
  
    try {
      const users = readUsersFromFile();
      const user = users.find((user) => user.username === username);
  
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json("Wrong username or password");
      }
  
      // Sätt session-cookie med användarinformation
      req.session = user;
  
      // Radera lösenordet från användarobjektet innan du skickar det tillbaka
      user.password = undefined;
  
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json(error);
    }
  }


//funktion för att logga ut
async function logoutUser(req, res, next){
    req.session = null;
    res.status(204).json("You have successfully logged out");
}


module.exports = { loginUser, logoutUser };