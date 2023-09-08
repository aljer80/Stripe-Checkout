const { app } = require("./app.js"); 


main().catch((err) => console.log(err));

function main() {
    app.listen(process.env.PORT, () => console.log(`The application is listening on port ${process.env.PORT}.`));
};
