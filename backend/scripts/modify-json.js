var fs = require("fs");

exports.modify_json = function(data) {
    main(data);
}

function main(json) {
    var key = "";
    for (var k in json) {
        key = k;
        break;
    } 
    var keySplit = key.split("-");

    changeDB(keySplit[1], keySplit[0], json[key]);
}

function changeDB(id, db, data) {
    if (db === "com") {
        var oldDB = getOldData("backend/json/computers.json");
        var newEntry = `{
            "name": "${data.name}",
            "os": "${data.os}",
            "ip": "${data.ip}",
            "port": ${data.port},
            "user": "${data.user}",
            "pass": "${data.pass}",
            "cpu": 0,
            "ram": 0,
            "online": true
        }`;
        if (id === "") {
            addComputerEntry(oldDB, newEntry);
        } else {
            modifyComputerEntry(oldDB, id, newEntry);
        }
    } else if (db === "script") {
    }
}

function getOldData(file) {
    var fileContent = fs.readFileSync(file);
    return JSON.parse(fileContent);
}

function addComputerEntry(db, newRow) {
    var newDB = [];
    
    for (var r in db) {
        newDB.push(db[r]);
    } newDB.push(JSON.parse(newRow));

    saveDB("backend/json/computers.json", newDB);
}

function modifyComputerEntry(db, id, newRow) {
    var newDB = [];

    for (var r in db) {
        if (r === id) {
            newDB.push(JSON.parse(newRow));
        } else {
            newDB.push(db[r]);
        }
    }

    saveDB("backend/json/computers.json", newDB);
}

function saveDB(file, db) {
    var formatDB = JSON.stringify(db, null, 4);
    fs.writeFileSync(file, formatDB);
}