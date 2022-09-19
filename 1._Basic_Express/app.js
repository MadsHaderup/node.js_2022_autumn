const express = require("express");
const app = express();

app.get("/", (request, response) => {
    response.send({ message: "Created my first route. Check"});
});

//console.log(new Date().toLocaleString());


app.listen(8080);