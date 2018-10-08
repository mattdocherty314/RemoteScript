var exec = require("child_process").exec;
var fs = require("fs");

exports.get_usage = function() {
    main();
}

function main() {
    updateCPU();
    updateRAM();
}

function updateCPU() {
    var computerDB = fs.readFileSync("backend/json/computers.json");
    var computerJSON = JSON.parse(computerDB);

    for (var c in computerJSON) {
        var ip = computerJSON[c].ip;
        var port = computerJSON[c].port;
        var user = computerJSON[c].user;
        var pass = computerJSON[c].pass;

        var command = `sshpass -p "${pass}" ssh -p ${port} ${user}@${ip} ps -A -e -o pcpu --sort -pcpu`;
        exec(command, c, function(err, stdout, stderd) {
            var cpu = addCPU(stdout.split("\n "));
            editCPU(this.c, cpu);
        }.bind({c: c}));
    }
}

function addCPU(cpuPercentages) {
    var totalCPU = 0;
    for (var p in cpuPercentages) {
        var cpup = parseFloat(cpuPercentages[p]);
        if (isNaN(cpup) === false) {
            totalCPU += cpup;
            if (cpup === 0) {
                break;
            }
        }
    }

    return totalCPU.toFixed(2);
}

function editCPU(id, cpuTotal) {
    var computerDB = fs.readFileSync("backend/json/computers.json");
    var computerJSON = JSON.parse(computerDB);

    computerJSON[id].cpu = parseFloat(cpuTotal);

    fs.writeFileSync("backend/json/computers.json", JSON.stringify(computerJSON, null, 4));
}

function updateRAM() {
    var computerDB = fs.readFileSync("backend/json/computers.json");
    var computerJSON = JSON.parse(computerDB);

    for (var c in computerJSON) {
        var ip = computerJSON[c].ip;
        var port = computerJSON[c].port;
        var user = computerJSON[c].user;
        var pass = computerJSON[c].pass;

        var command = `sshpass -p "${pass}" ssh -p ${port} ${user}@${ip} ps -A -e -o pmem --sort -pmem`;
        exec(command, c, function(err, stdout, stderd) {
            var ram = addRAM(stdout.split("\n "));
            editRAM(this.c, ram);
        }.bind({c: c}));
    }
}

function addRAM(ramPercentages) {
    var totalRAM = 0;
    for (var p in ramPercentages) {
        var ramp = parseFloat(ramPercentages[p]);
        if (isNaN(ramp) === false) {
            totalRAM += ramp;
            if (ramp === 0) {
                break;
            }
        }
    }
    return totalRAM.toFixed(2);
}

function editRAM(id, ramTotal) {
    var computerDB = fs.readFileSync("backend/json/computers.json");
    var computerJSON = JSON.parse(computerDB);

    computerJSON[id].ram = parseFloat(ramTotal);

    fs.writeFileSync("backend/json/computers.json", JSON.stringify(computerJSON, null, 4));
}
