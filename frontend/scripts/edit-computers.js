const HOST = "http://localhost:3000"

function selectComputer(itemID) {
	console.log(itemID);
}

function pageLoad() {
	let listComputersDiv = document.getElementById("list-computers");
	let errorDiv = document.getElementById("error");
	fetch(`${HOST}/view-computers`)
	.then((res) => {
		return res.json();
	})
	.then((res) => {
		console.log(res);
		listComputersDiv.innerHTML = "";
		res.map((com, idx) => {
			listComputersDiv.innerHTML += `<li onClick='selectComputer(this.id)' id='com${com._id}' class='com'>${com.name}</li>`;
		});
	})
	.catch((err) => {
		errorDiv.innerHTML = err;
	})
}



window.addEventListener("load", pageLoad);