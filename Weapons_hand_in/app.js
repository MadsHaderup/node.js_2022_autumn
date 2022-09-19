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
    response.send(weapons.find((weapon) => weapon.id === id));
})

app.post("/weapons", (request, response) => {
    let currentId = weapons.length;
    const weapon = req.body;
    weapon.id = ++currentId;
    weapons.push(weapon);
    response.status(201).send({ data: weapon, message: `Weapon with name: ${request.body.name} is saved`});
})

app.put("/weapons/:id", (request, response) => {
    const id = parseInt(request.params.id);
    const body = request.body;
    
    let index = weapons.findIndex((weapon) => weapon.id === id);
    if(index){
        weapons[index] = body;
        response.status(200).send({ data: body.name, message: `Weapon with name: ${request.body.name} is edited`});
    } else {
        response.status(404).send({data: undefined, message: `Weapon with id: ${id} doesn't exist`});
    }
})

app.patch("/weapons/:id", (request, response) => {
    const id = parseInt(request.params.id);
    
    let index = weapons.findIndex((weapon) => weapon.id === parseInt(request.params.id));
    if(index !== -1){
        const foundWeapon = weapons[index];
        const weaponToUpdate = { ...foundWeapon, ...request.body, id: Number(request.params.id)};
        weapons[index] = weaponToUpdate;
        response.status(200).send({ data: weaponToUpdate, message: `Weapon with name: ${weaponToUpdate.name} is edited`});
    } else {
        response.status(404).send({ data: undefined, message: `Weapon with id: ${id} doesn't exist`});
    }
})

app.delete("/weapons/:id", (request, response) => {
    const id = parseInt(request.params.id);
    
    let index = weapons.findIndex((weapon) => weapon.id === id);
    if(index){
        const deletedWeapon = weapons.splice(index, 1);
        response.status(200).send({ data: deletedWeapon, message: `Weapon with id: ${id} is deleted` });
    } else {
        response.status(404).send({ data: undefined, message: "Weapon doesn't exist" });
    }
})

app.listen(8080);