var exe_rem = require("execute-remote.js");
var exe_can = require("execute-cancel.js");

var fs = require("fs");

exports.toggle_run = function(data) {
    main(data);
}

function main(json) {
    var scriptRunning = getScriptState(json.computer, json.script);
    
    if (scriptRunning === true) {
        exe_can.execute_cancel(json.computer, json.script);
    } else {
        exe_rem.execute_remote(json.computer, json.script);
    }
}

function getScriptState(computer, script) {
    var file = "backend/json/scripts.json";
    var fileContent = fs.readFileSync(file);
    var fileJSON = JSON.parse(fileContent);
    
    for (var r in fileJSON) {
        if (fileJSON[r].name === script) {
            for (var c in fileJSON[r].running) {
                if (computer === fileJSON[r].running[c]) {
                    return true;
                } return false;
            }
        }
    }
}