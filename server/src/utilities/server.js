const { app } = require("./app.js"); 

app.listen(process.env.PORT, () => console.log(`The application is listening on port ${process.env.PORT}.`));

