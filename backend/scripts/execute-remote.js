var exec = require("child_process").exec;
var fs = require("fs");

exports.execute_remote = function(computer, script) {
    main(computer, script);
}

function main(computer, script) {
    var computerSettings = getComputerSettings(computer);
    var scriptSettings = getScriptSettings(script);

    startScript(computerSettings, scriptSettings);
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
    var name = scriptData.name;
    var script = scriptData.content;
    var ip = computerData.ip;
    var port = computerData.port;
    var user = computerData.user;
    var pass = computerData.pass;

    var command = `sshpass -p "${pass}" ssh -p ${port} ${user}@${ip} ${script} > backend/cmd-output/${name}.txt`;
    exec(command, function(err, stdout, stderr) {
        console.log(err);
        console.log(stdout);
    });
}