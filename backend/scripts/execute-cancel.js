var exec = require("child_process").exec;
var fs = require("fs");

exports.execute_cancel = function(computer, script) {
    main(computer, script);
}

function main(computer, script) {
    var computerSettings = getComputerSettings(computer);
    var scriptSettings = getScriptSettings(script);

    stopScript(computerSettings, scriptSettings);
    removeComputerFromRunning(computer, scriptSettings);
}

function getComputerSettings(computer) {
    var computerDB = fs.readFileSync("backend/json/computers.json");
    var computerJSON = JSON.parse(computerDB);
    for (var c in computerJSON) {
        if (computerJSON[c].name === computer) {
            var computerData = computerJSON[c];
            break;
        }
    }

    return computerData;
}

function getScriptSettings(script) {
    var scriptDB = fs.readFileSync("backend/json/scripts.json");
    var scriptJSON = JSON.parse(scriptDB);
    for (var s in scriptJSON) {
        if (scriptJSON[s].name === script) {
            var scriptData = scriptJSON[s];
            break;
        }
    }

    return scriptData;
}

function stopScript(computerData, scriptData) {
    var script = scriptData.content.split(" ")[0];
    var ip = computerData.ip;
    var port = computerData.port;
    var user = computerData.user;
    var pass = computerData.pass;

    var getPID = `sshpass -p "${pass}" ssh -p ${port} ${user}@${ip} "ps -A | grep ${script}"`;
    exec(getPID, function(err, stdout, stderr) {
        var pid = stdout.split(" ")[0];
        var killPID = `sshpass -p "${pass}" ssh -p ${port} ${user}@${ip} kill ${pid}`;
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
    
    fs.writeFileSync("backend/json/scripts.json", JSON.stringify(scriptJSON, null, 4));
}