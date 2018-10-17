var fs = require("fs");

exports.get_data = function(fileName, entryName) {
    var db = fs.readFileSync(fileName);
    var json = JSON.parse(db);
    for (var i in json) {
        if (json[i].name === entryName) {
            return json[i];
            break;
        }
    }
}
