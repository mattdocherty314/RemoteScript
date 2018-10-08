var exec = require("child_process").exec;
var fs = require("fs");

exports.script_status = function() {
    main();
}

function main() {
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
        var ip = computerData[c].ip;
        var port = computerData[c].port;
        var user = computerData[c].user;
        var pass = computerData[c].pass;

        var command = `sshpass -p "${pass}" ssh -p ${port} ${user}@${ip} "ps -A | grep ${script}"`;

        exec(command, function(err, stdout, stderr) {
            if (stdout === "") {
                for (var r in this.scriptData[this.scriptID].running) {
                    if (this.scriptData[this.scriptID].running[r] === this.comName) {
                        this.scriptData[this.scriptID].running.splice(r, 1);
                        fs.writeFileSync("backend/json/scripts.json", JSON.stringify(this.scriptData, null, 4));
                    }
                }
            }
        }.bind({comName: comName, scriptID: scriptID, scriptData: scriptData}));
    }
}
