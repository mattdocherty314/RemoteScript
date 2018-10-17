var format_script = require("./shared/format-script.js");

var exec = require("child_process").exec;
var fs = require("fs");

exports.main = function() {
    var fields = ["cpu", "ram"];
    for (var f in fields) {
        updateField(fields[f]);
    }
}

function updateField(field) {
    var computerDB = fs.readFileSync("backend/json/computers.json");
    var computerJSON = JSON.parse(computerDB);

    for (var c in computerJSON) {
        if (field === "cpu") {
            var psArg = "pcpu";
        } else if (field === "ram") {
            var psArg = "pmem";
        }
        var sshCommand = `ps -A -e -o ${psArg} --sort -${psArg}`;

        var command = format_script.main(computerJSON[c], sshCommand);
        exec(command, c, function(err, stdout, stderd) {
            var val = addValues(stdout.split("\n "));
            editField(this.field, this.c, val);
        }.bind({c: c, field: field}));
    }
}

function addValues(values) {
    var total = 0;
    for (var v in values) {
        var vP = parseFloat(values[v]);
        if (isNaN(vP) === false) {
            total += vP;
            if (vP === 0) {
                break;
            }
        }
    }

    return total.toFixed(2);
}

function editField(field, id, total) {
    var computerFile = "backend/json/computers.json";
    var computerDB = fs.readFileSync(computerFile);
    var computerJSON = JSON.parse(computerDB);

    computerJSON[id][field] = parseFloat(total);

    var formatDB =  JSON.stringify(computerJSON, null, 4);
    fs.writeFileSync(computerFile, formatDB);
}