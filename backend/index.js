const fs = require('fs');
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
	let path = req.url.split('/').slice(-2); // Get URL path
	let entryID = -1;
	let resp = "";

	res.setHeader('Access-Control-Allow-Origin', "*");
	res.setHeader('Content-Type', "application/json");

	// Setup routes manually in NodeJS
	if (path[1] === "view-computers") {
		let computerDBFile = fs.readFileSync('./database/computers.json')
		resp = JSON.parse(computerDBFile);
	}
	else if (path[1] === "view-scripts") {
		let scriptDBFile = fs.readFileSync('./database/scripts.json')
		resp = JSON.parse(scriptDBFile);
	}
	else if (path[0] === "get-computer") {
		let computerDBEntry = fs.readFileSync('./database/computers.json')
		resp = JSON.parse(computerDBEntry).filter((entry) => {return entry._id === parseInt(path[1])});

	}
	else if (path[0] === "get-script") {
		let scriptDBEntry = fs.readFileSync('./database/scripts.json')
		resp = JSON.parse(scriptDBEntry).filter((entry) => {entry._id === parseInt(path[1])});
	}
	else if (path[1] === "edit-computers") {
		
	}
	else if (path[1] === "edit-scripts") {
		
	}
	else if (path[1] === "run-script") {
		
	}
	else if (path[1] === "stop-script") {
		
	}
	else {
		
	}

	res.end(JSON.stringify(resp)); // Finish sending the requests
});

server.listen(port, hostname, () => { // Listen for any connections
	console.log(`Server running at http://${hostname}:${port}/`);
});