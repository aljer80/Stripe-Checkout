//MIDDLEWARES

//middleware för att kolla om användaren är inloggad
function userIsLoggedIn (req, res, next) {
    if (req.session._id) return next();
    res.status(401).json();
}

//middleware för att kolla om användaren är inloggad som admin
function userLoggedInAsAdmin (req, res, next) {
//console.log(req.session);
    if (req.session.isAdmin) return next();
    res.status(403).json();
}

module.exports = { userIsLoggedIn, userLoggedInAsAdmin };