var format_script = require("./shared/format-script.js");

var exec = require("child_process").exec;
var fs = require("fs");

exports.main = function() {
    var computerJSON = getSettings("backend/json/computers.json");
    var scriptJSON = getSettings("backend/json/scripts.json");

    for (var s in scriptJSON) {
        isScriptRunning(computerJSON, s, scriptJSON);
    }
}

function getSettings(dbFile) {
    var db = fs.readFileSync(dbFile);
    var json = JSON.parse(db);

    return json;
}

function isScriptRunning(computerData, scriptID, scriptData) {
    var script = scriptData[scriptID].content.split(" ")[0];
    for (var c in computerData) {
        var comName = computerData[c].name;
        var sshCommand = `ps -A | grep ${script}`;

        var command = format_script.main(computerData[c], sshCommand);
        exec(command, function(err, stdout, stderr) {
            if (stdout === "") {
                var scriptRunning = this.scriptData[this.scriptID].running;
                for (var r in scriptRunning) {
                    if (scriptRunning[r] === this.comName) {
                        scriptRunning.splice(r, 1);
                        var formatDB =  JSON.stringify(this.scriptData, null, 4)
                        fs.writeFileSync("backend/json/scripts.json", formatDB);
                    }
                }
            }
        }.bind({comName: comName, scriptID: scriptID, scriptData: scriptData}));
    }
}
