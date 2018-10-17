var format_script = require("./shared/format-script.js");
var get_data = require("./shared/get-data.js");

var exec = require("child_process").exec;
var fs = require("fs");

exports.main = function(computer, script) {
    var computerSettings = get_data.main("backend/json/computers.json", computer);
    var scriptSettings = get_data.main("backend/json/scripts.json", script);

    stopScript(computerSettings, scriptSettings);
    removeComputerFromRunning(computer, scriptSettings);
}

function stopScript(computerData, scriptData) {
    var script = scriptData.content.split(" ")[0];
    var sshCommand = `ps -A | grep ${script}`;

    var getPID = format_script.main(computerData, sshCommand);
    exec(getPID, function(err, stdout, stderr) {
        var pid = stdout.split(" ")[0];
        var killPID = format_script.main(computerData, `kill ${pid}`);
        exec(killPID, () => {});
    });
}

function removeComputerFromRunning(computer, scriptData) {
    var scriptDB = fs.readFileSync("backend/json/scripts.json");
    var scriptJSON = JSON.parse(scriptDB);

    for (var s in scriptJSON) {
        if (scriptJSON[s].name === scriptData.name) {
            for (c in scriptJSON[s].running) {
                if (scriptJSON[s].running[c] === computer) {
                    scriptJSON[s].running.splice(c, 1);
                }
                break;
            }
            break;
        }
    }
    
    var formatDB =  JSON.stringify(scriptJSON, null, 4)
    fs.writeFileSync("backend/json/scripts.json", formatDB);
}