var fs = require("fs");
var http = require("http");
var url = require("url");

var get_usage = require("./scripts/get-usage.js");
var modify_json = require("./scripts/modify-json.js");
var script_status = require("./scripts/script-status.js");
var toggle_run = require("./scripts/toggle-run.js");

setInterval(() => {
    get_usage.main();
    script_status.main();
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
                modify_json.main(json);
            } else if (req.url == "/backend/toggle-run") {
                toggle_run.main(json);
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
            var pNameType = pName.split(".")[2];
            if (pNameType === "css") {
                res.writeHead(200, {"Content-Type": "text/css"});
            } else {
                res.writeHead(200, {"Content-Type": "text/html"});
            }
            res.write(data);
            return res.end();
        });
    }
}).listen(3000);

console.log("Listening on port 3000");