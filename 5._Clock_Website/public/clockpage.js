const cities = ["Copenhagen", "London", "New York", "Los Angeles", "Sydney", "Taipei", "Cairo", "Aleppo"];
const timeDifference = [0, -1, -6, -9, 8, 6, 0, 1];
var today = new Date();

const timeTable = document.getElementById("timeTable");

function addRow(city) {

    const rowCount = timeTable.rows.length;
    console.log("row count: " + rowCount);
    let row = timeTable.insertRow(rowCount);
    let colCount = 0;

    let cell = row.insertCell(colCount++);
    cell.innerText = city;

    cell = row.insertCell(colCount++);
    var time = (today.getHours()+timeDifference[rowCount-2]) + ":" + today.getMinutes();
    cell.innerText = time;
}

function createTable(){
    cities.forEach(city => {
      addRow(city);
    });
}

createTable();