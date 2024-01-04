const HOST = "http://localhost:3000"

function pageLoad() {
	let scriptsDiv = document.getElementById("scripts");
	let errorDiv = document.getElementById("error");
	fetch(`${HOST}/view-scripts`)
	.then((res) => {
		return res.json();
	})
	.then((res) => {
		console.log(res);
		scriptsDiv.innerHTML = "";
		res.forEach(async (script, idx) => {
			let computerName = await fetch(`${HOST}/get-computer/${script.computer_id}`)
			.then(async (resp) => {
				return await resp.json()
			})
			.catch((err) => {
				errorDiv.innerHTML = err;
			})
			console.log(computerName)
			scriptsDiv.innerHTML += `<div id='script${script._id}' class='com'>
				<h2> ${script.name} <b class='${script.running ? 'online' : 'offline'}'>*</b></h2>
					<ul><b>RUN ON COMPUTER:</b> '${computerName[0].name}' </ul>
					<ul><b>SCRIPT:</b> \`${script.script}\` </ul>
			</div>`
		});
	})
	.catch((err) => {
		errorDiv.innerHTML = err;
	})
}

window.addEventListener("load", pageLoad);