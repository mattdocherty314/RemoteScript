const HOST = "http://localhost:3000"

function pageLoad() {
	let computersDiv = document.getElementById("computers");
	let errorDiv = document.getElementById("error");
	fetch(`${HOST}/view-computers`)
	.then((res) => {
		return res.json();
	})
	.then((res) => {
		console.log(res);
		computersDiv.innerHTML = "";
		res.forEach((com, idx) => {
			computersDiv.innerHTML += `<div id='com${com._id}' class='com'>
				<h2> ${com.name} <b class='${com.online ? 'online' : 'offline'}'>*</b></h2>
					<ul><b>OS:</b> ${com.os} </ul>
					<ul><b>IP:</b> ${com.ip} </ul>
					<ul><b>PORT:</b> ${com.port} </ul>
					<ul><b>USERNAME:</b> ${com.user} </ul> 
					<ul><b>PASSWORD:</b> ${com.pass} </ul> 
					<ul><b>CPU:</b> ${textProgress(com.cpu)}</ul>
					<ul><b>RAM:</b> ${textProgress(com.ram)}</ul>
			</div>`
		});
	})
	.catch((err) => {
		errorDiv.innerHTML = err;
	})
}

function textProgress(value) {
	let prog = "";
	for (let i = 0; i <= 100; i+=2.5) {
		if (i > value) {
			break;
		}
		prog += "|"
	}
	return prog;
}

window.addEventListener("load", pageLoad);