const express = require("express");
const app = express();
app.use(express.json());

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

app.post("/weapons", (request, response) => {
    weapons.push(request.body);
    response.status(201).send(`${request.body.name} is saved`);
})

app.put("/weapons/:id", (request, response) => {
    const id = parseInt(request.params.id);
    const body = request.body;
    
    let index = weapons.findIndex((weapon) => weapon.id === id);
    if(index){
        weapons[index] = body;
        response.status(200).send(`${request.body.name} is edited`);
    } else {
        response.status(404).send("Weapon doesn't exist");
    }
})

app.patch("/weapons/:id", (request, response) => {
    const id = parseInt(request.params.id);
    const name = request.body.name;
    
    let index = weapons.findIndex((weapon) => weapon.id === id);
    if(index){
        weapons[index].name = name;
        response.status(200).send(`${request.body.name} is edited`);
    } else {
        response.status(404).send("Weapon doesn't exist");
    }
})

app.delete("/weapons/:id", (request, response) => {
    const id = parseInt(request.params.id);
    
    let index = weapons.findIndex((weapon) => weapon.id === id);
    if(index){
        weapons.splice(index, 1);
        response.status(200).send(`${id} is deleted`);
    } else {
        response.status(404).send("Weapon doesn't exist");
    }
})

app.listen(8080);