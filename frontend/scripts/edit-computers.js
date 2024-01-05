const HOST = "http://localhost:3000";

function selectComputer(itemID) {
	let modifyButton = document.getElementById("modify");
	modifyButton.innerHTML = "Modify Computer";
	
	fetch(`${HOST}/get-computer/${itemID.slice(3)}`)
	.then((res) => {
		return res.json();
	})
	.then((res) => {
		let editNameField = document.getElementById("edit-name");
		let editOSField = document.getElementById("edit-os");
		let editIPField = document.getElementById("edit-ip");
		let editPortField = document.getElementById("edit-port");
		let editUserField = document.getElementById("edit-user");
		let editPassField = document.getElementById("edit-pass");

		editNameField.value = res[0].name;
		editOSField.value = res[0].os;
		editIPField.value = res[0].ip;
		editPortField.value = res[0].port;
		editUserField.value = res[0].user;
		editPassField.value = res[0].pass;
	})
	.catch((err) => {
		errorDiv.innerHTML = err;
	})
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