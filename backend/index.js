const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
	let path = req.url.split('/').slice(-1)[0]; // Get URL path
	// Setup routes manually in NodeJS
	switch (path) {
		case "/view-computers":
			break;
		case "/view-scripts":
			break;
		case "/edit-computers":
			break;
		case "/edit-scripts":
			break;
		case "run-script":
			break;
		case "stop-script":
			break;
		default:
			break;
	}
	res.end(); // Finish sending the requests
});

server.listen(port, hostname, () => { // Listen for any connections
	console.log(`Server running at http://${hostname}:${port}/`);
});