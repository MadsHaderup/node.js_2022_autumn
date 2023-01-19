const divContainer = document.getElementById("adminContainer");
const userTable = document.getElementById("userTable");

async function loadUsers() {
    const response = await fetch("http://localhost:8080/user").then(response => response.json());
    const userMap = new Map();
    const userlist = response.data;
    userlist.forEach((user) => {
        userMap.set(user.email, user);
    });
  
    userMap.forEach(user => addRow(user));
}

function addRow(user) {

    const rowCount = userTable.rows.length;
    console.log("row count: " + rowCount);
    let row = userTable.insertRow(rowCount);
    let colCount = 0;

    let idCell = row.insertCell(colCount++);
    idCell.innerText = user.id;

    emailCell = row.insertCell(colCount++);
    emailCell.innerText = user.email;

    passwordCell = row.insertCell(colCount++);
    passwordCell.innerText = user.password;
    
}

document.addEventListener('DOMContentLoaded', () => {
  loadUsers();
});