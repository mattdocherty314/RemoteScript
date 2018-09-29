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

    changeDB(keySplit[1], keySplit[0], json);
}

function changeDB(id, db, data) {
    var isNewEntry = false;
    if (id === "") {
        isNewEntry = true;
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
    }

    if (db === "com") {
        oldDB = getOldData();
        if (isNewEntry === true) {
            //addComputerEntry(oldDB, newEntry)
        } else {
            //modifyComputerEntry(oldDB, id);
        }
    } else if (db === "script") {
    }
}

function getOldData() {
    var fs = require("fs");
}

function addComputerEntry(db, newRow) {

}

function modifyComputerEntry(db, id) {

}