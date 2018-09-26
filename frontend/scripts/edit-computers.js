window.addEventListener("load", pageLoad);

function pageLoad() {
    var comDiv = document.getElementById("list-computers");
    var comJSON = loadComputerJSON();

    displayComputerName(comDiv, comJSON);

    addEventListeners(comJSON);
}

function loadComputerJSON() {
    var xhr = new XMLHttpRequest();
    var file = "../../backend/json/computers.json"
    xhr.open("GET", file, false);
    xhr.send();
    if (xhr.status == 200) {
        var json = JSON.parse(xhr.responseText);
        return json;
    }
}

function displayComputerName(div, json) {
    div.innerHTML = "";
    for (var c in json) {
        div.innerHTML += "<div id='com"+c+"'>";
        div.innerHTML += "<p class='name'>"+json[c].name+" </p>";
        div.innerHTML += "<button id='edit-com-"+c+"'> Edit Data </button>";
        div.innerHTML += "</div><br>";
    }
}

function addEventListeners(json) {
    var clearBtn = document.getElementById("clear");
    clearBtn.addEventListener("click", clearData);

    var modifyBtn = document.getElementById("modify");
    modifyBtn.addEventListener("click", modifyData);

    var i = 0;
    do {
        var currentEditButton = document.getElementById("edit-com-"+i);
        currentEditButton.addEventListener("click", (evt) => editScript(evt.srcElement.id.split("-")[2], json));
        i += 1;
    } while (currentEditButton !== null);
}

function editScript(id, json) {
    var startStopBtn = document.getElementById("start-stop");
    var editName = document.getElementById("edit-name");
    var editOS = document.getElementById("edit-os");
    var editIP = document.getElementById("edit-ip");
    var editPort = document.getElementById("edit-port");
    var editUser = document.getElementById("edit-user");
    var editPass = document.getElementById("edit-pass");
    var modifyBtn = document.getElementById("modify");

    editName.setAttribute("value", json[id].name);
    editOS.setAttribute("value", json[id].os);
    editIP.setAttribute("value", json[id].ip);
    editPort.setAttribute("value", json[id].port);
    editUser.setAttribute("value", json[id].user);
    editPass.setAttribute("value", json[id].pass);
    modifyBtn.innerHTML = "Edit Computer";
    startStopBtn.disabled = false;
    if (json[id].online === true) {
        startStopBtn.innerHTML = "Stop Server";
    } else {
        startStopBtn.innerHTML = "Start Server";
    }
}

function clearData() {
    var startStopBtn = document.getElementById("start-stop");
    var editName = document.getElementById("edit-name");
    var editOS = document.getElementById("edit-os");
    var editIP = document.getElementById("edit-ip");
    var editPort = document.getElementById("edit-port");
    var editUser = document.getElementById("edit-user");
    var editPass = document.getElementById("edit-pass");
    var modifyBtn = document.getElementById("modify");

    editName.setAttribute("value", "");
    editOS.setAttribute("value", "");
    editIP.setAttribute("value", "");
    editPort.setAttribute("value", "");
    editUser.setAttribute("value", "");
    editPass.setAttribute("value", "");
    modifyBtn.innerHTML = "Add Computer";
    startStopBtn.disabled = true;
    startStopBtn.innerHTML = "Start Server";
}

function modifyData() {
    //sendModifcation();
}

function sendModifcation(type, data) {
}