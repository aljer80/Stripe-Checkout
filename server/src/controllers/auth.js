const fs = require('fs');
const bcrypt = require('bcrypt');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


// Sökväg till JSON-filen
const usersFilePath = "./src/utilities/users.json";


// Funktion för att läsa användare från JSON-filen
function readUsersFromFile() {
  try {
    const usersData = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(usersData);
  } catch (error) {
    return [];
  }
}

// Funktion för att skriva användare till JSON-filen
function writeUsersToFile(users) {
  const jsonData = JSON.stringify(users, null, 2);
  fs.writeFileSync(usersFilePath, jsonData);
}

// Funktion för att registrera ny användare och kryptera lösenordet
async function registerUser(req, res) {
  try {
    const users = readUsersFromFile();
    const existingUser = users.find((user) => user.username === req.body.username);

    if (existingUser) {
      return res.status(409).json("User already exists.");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    //skapa customer i Stripe
    const stripeCustomer = await stripe.customers.create({
      email: req.body.username, 
    });

    const newUser = { 
      username: req.body.username, 
      password: hashedPassword, 
      stripeCustomerId: stripeCustomer.id // Spara Stripe Customer ID
    };

        
    users.push(newUser);
    writeUsersToFile(users);
    
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json(error);
  }
}

// Funktion för att logga in
async function loginUser(req, res) {
    const { username, password } = req.body;
  
    try {
      const users = readUsersFromFile();
      const user = users.find((user) => user.username === username);
  
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json("Wrong username or password");
      }

      req.session = user;  // Sätt session-cookie med användarinformation
      user.password = undefined; // Radera lösenordet från användarobjektet innan du skickar tillbaka det
  
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


module.exports = { loginUser, logoutUser, registerUser };