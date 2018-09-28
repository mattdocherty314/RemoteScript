var fs = require("fs");
var http = require("http");
var url = require("url");

var exe_rem = require("./scripts/execute-remote.js");
var exe_can = require("./scripts/execute-cancel.js");
var get_use = require("./scripts/get-usage.js");
var mod_jsn = require("./scripts/modify-json.js");

setInterval(() => {
    exe_rem.execute_remote();
    exe_can.execute_cancel();
    get_use.get_usage();
}, 1000);

http.createServer(function (req, res) {
    if ((req.method == "POST") && (req.url == "/backend/modify-data")) {
        var jsonString = "";
        req.on("data", function (data) {
            jsonString += data;
            
        });
        req.on("end", function () {
            json = JSON.parse(jsonString);
            console.log(json);
            mod_jsn.modify_json(json);
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