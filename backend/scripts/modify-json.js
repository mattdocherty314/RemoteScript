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
        var dbFile = "backend/json/computers.json";
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
    } else if (db === "script") {
        var dbFile = "backend/json/scripts.json";
        var newEntry = `{
            "name": "${data.name}",
            "content": "${data.content}",
            "running": [

            ]
        }`;
    }

    var oldDB = getOldData(dbFile);
    if (id === "") {
        var newDB = addEntry(oldDB, newEntry);
    } else {
        var newDB = modifyEntry(oldDB, id, newEntry);
    }
    saveDB(dbFile, newDB);
}

function getOldData(file) {
    var fileContent = fs.readFileSync(file);
    return JSON.parse(fileContent);
}

function addEntry(db, newRow) {
    var newData = [];
    
    for (var r in db) {
        newData.push(db[r]);
    } newData.push(JSON.parse(newRow));

    return newData;
}

function modifyEntry(db, id, newRow) {
    var newData = [];

    for (var r in db) {
        if (r === id) {
            newData.push(JSON.parse(newRow));
        } else {
            newData.push(db[r]);
        }
    }

    return newData;   
}

function saveDB(file, db) {
    var formatDB = JSON.stringify(db, null, 4);
    fs.writeFileSync(file, formatDB);
}