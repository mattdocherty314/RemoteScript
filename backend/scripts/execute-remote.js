var exec = require("child_process").exec;
var fs = require("fs");

exports.execute_remote = function(computer, script) {
    main(computer, script);
}

function main(computer, script) {
    var computerSettings = getComputerSettings(computer);
    var scriptSettings = getScriptSettings(script);

    startScript(computerSettings, scriptSettings);
    addComputerToRunning(computer, scriptSettings);
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

function startScript(computerData, scriptData) {
    var scriptName = scriptData.name;
    var script = scriptData.content;
    var computerName = computerData.name;
    var ip = computerData.ip;
    var port = computerData.port;
    var user = computerData.user;
    var pass = computerData.pass;

    var command = `sshpass -p "${pass}" ssh -p ${port} ${user}@${ip} ${script} > "backend/cmd-output/${scriptName}_&_${computerName}.txt"`;
    exec(command, () => {});
}

function addComputerToRunning(computer, scriptData) {
    var scriptDB = fs.readFileSync("backend/json/scripts.json");
    var scriptJSON = JSON.parse(scriptDB);

    for (var s in scriptJSON) {
        if (scriptJSON[s].name === scriptData.name) {
            scriptJSON[s].running.push(computer);
            break;
        }
    }
    
    fs.writeFileSync("backend/json/scripts.json", JSON.stringify(scriptJSON, null, 4));
}