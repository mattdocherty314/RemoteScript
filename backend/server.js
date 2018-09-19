var http = require('http');
var url = require('url');
var fs = require('fs');

var exe_rem = require('./scripts/execute-remote.js');
var exe_can = require('./scripts/execute-cancel.js');
var get_use = require('./scripts/get-usage.js');

http.createServer(function (req, res) {
    var q = url.parse(req.url, true)
    var pName = "."+q.pathname;
    fs.readFile(pName, function(err, data) {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("404 Not Found");
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
}).listen(3000);

setInterval(() => {
    exe_rem.execute_remote();
    exe_can.execute_cancel();
    get_use.get_usage();
}, 1000);