var fs = require("fs");
var http = require("http");
var url = require("url");

var get_use = require("./scripts/get-usage.js");
var mod_jsn = require("./scripts/modify-json.js");
var scr_sts = require("./scripts/script-status.js");
var tog_run = require("./scripts/toggle-run.js");

setInterval(() => {
    get_use.get_usage();
    scr_sts.script_status();
}, 1000);

http.createServer(function (req, res) {
    if (req.method == "POST") {
        var jsonString = "";
        var json;
        req.on("data", function (data) {
            jsonString += data;
            
        });
        req.on("end", function () {
            json = JSON.parse(jsonString);
            console.log(json);
            
            if (req.url == "/backend/modify-json") {
                mod_jsn.modify_json(json);
            } else if (req.url == "/backend/toggle-run") {
                tog_run.toggle_run(json);
            }
        });
    } else {
        var q = url.parse(req.url, true);
        var pName = "."+q.pathname;
        fs.readFile(pName, function(err, data) {
            if (err) {
                res.writeHead(404, {"Content-Type": "text/html"});
                return res.end("404 Not Found");
            }
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(data);
            return res.end();
        });
    }
}).listen(3000);

console.log("Listening on port 3000");