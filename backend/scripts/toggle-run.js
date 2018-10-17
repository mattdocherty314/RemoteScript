var execute_remote = require("./execute-remote.js");
var execute_cancel = require("./execute-cancel.js");

var fs = require("fs");

exports.mian = function(data) {
    var scriptRunning = getScriptState(data.computer, data.script);
    
    if (scriptRunning === true) {
        execute_cancel.main(data.computer, data.script);
    } else {
        execute_remote.main(data.computer, data.script);
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