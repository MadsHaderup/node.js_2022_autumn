const express = require("express");
const app = express();

const weapons = [
    { id: 1, name: "Pistol"},
    { id: 2, name: "Rifle"},
    { id: 3, name: "Machine Gun"}
  ];

app.get("/weapons", (request, response) => {
    response.send({weapons});
});

app.get("/weapons/:id", (request, response) => {
    const id = parseInt(request.params.id);
    response.send(weapons.find((weapon) => weapon.id == id));
})

app.listen(8080);