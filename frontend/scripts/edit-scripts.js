window.addEventListener("load", pageLoad);

function pageLoad() {
    var scriptDiv = document.getElementById("list-scripts");
    var scriptJSON = loadScriptJSON();
    var comDiv = document.getElementById("computers");
    var comJSON = loadComputerJSON();

    displayScriptName(scriptDiv, scriptJSON);
    displayComputers(comDiv, comJSON);

    addEventListeners(scriptJSON);
}

function loadScriptJSON() {
    var xhr = new XMLHttpRequest();
    var file = "../../backend/json/scripts.json"
    xhr.open("GET", file, false);
    xhr.send();
    if (xhr.status == 200) {
        var json = JSON.parse(xhr.responseText);
        return json;
    }
}

function displayScriptName(div, json) {
    div.innerHTML = "";
    for (var c in json) {
        div.innerHTML += "<div id='com"+c+"'>";
        div.innerHTML += "<p class='name'>"+json[c].name+" </p>";
        div.innerHTML += "<button id='edit-script-"+c+"'> Edit Data </button>";
        div.innerHTML += "</div><br>";
    }
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

function displayComputers(div, json) {
    div.innerHTML = "";
    for (var c in json) {
        div.innerHTML += "<option>"+json[c].name+"</option>";
    }
}

function addEventListeners(json) {
    var clearBtn = document.getElementById("clear");
    clearBtn.addEventListener("click", clearData);

    var modifyBtn = document.getElementById("modify");
    modifyBtn.addEventListener("click", modifyData);

    var startStopBtn = document.getElementById("start-stop");
    startStopBtn.addEventListener("click", toggleRun);

    var i = 0;
    do {
        var currentEditButton = document.getElementById("edit-script-"+i);
        currentEditButton.addEventListener("click", (evt) => editScript(evt.srcElement.id.split("-")[2], json));
        i += 1;
    } while (currentEditButton !== null);
}

function updateButton() {
    document.getElementById("computers").addEventListener("change", updateButton);
    
    var scriptID = document.getElementById("script-id");
    var scriptSelected = scriptID.innerHTML.split(" ").slice(-1)[0]

    var comSelected = document.getElementById("computers").value;
    var comRunning = loadScriptJSON()[scriptSelected].running;

    var isRunning = false;
    for (var c in comRunning) {
        if (comSelected === comRunning[c]) {
            isRunning = true;
            break;
        } 
    }

    var startStopBtn = document.getElementById("start-stop");
    if (isRunning === true) {
        startStopBtn.innerHTML = "Stop Script";
    } else {
        startStopBtn.innerHTML = "Start Script";
    } startStopBtn.disabled = false;
}

function editScript(id, json) {
    var editName = document.getElementById("edit-name");
    editName.setAttribute("value", json[id].name);

    var editContent = document.getElementById("edit-content");
    editContent.innerHTML = json[id].content;

    var idPara = document.getElementById("script-id");
    idPara.innerHTML = "<strong> Script ID: </strong> "+id; 

    var modifyBtn = document.getElementById("modify");
    modifyBtn.innerHTML = "Edit Script";

    updateButton(json[id]);
}

function clearData() {
    var editName = document.getElementById("edit-name");
    editName.setAttribute("value", "");

    var editContent = document.getElementById("edit-content");
    editContent.innerHTML = "";

    var idPara = document.getElementById("script-id");
    idPara.innerHTML = ""; 

    var modifyBtn = document.getElementById("modify");
    modifyBtn.innerHTML = "Add Script";

    var startStopBtn = document.getElementById("start-stop");
    startStopBtn.disabled = true;
    startStopBtn.innerHTML = "Start Script";
    document.getElementById("computers").removeEventListener("change", updateButton);
}

function modifyData() {
    var idPara = document.getElementById("script-id");
    var scriptID = idPara.innerHTML.split(" ").slice(-1)[0];
    var editName = document.getElementById("edit-name");
    var editContent = document.getElementById("edit-content");
    var jsonString = `{
        "script-${scriptID}": {
            "name": "${editName.value}",
            "content": "${editContent.value}"
        }
    }`;
    var json = JSON.parse(jsonString);
    sendModifcation(json);
}

function sendModifcation(data) {
    var xhr = new XMLHttpRequest();
    var file = "../../backend/modify-data";
    xhr.open("POST", file, true);
    
    var dataString = JSON.stringify(data);
    console.log(dataString);
    xhr.send(dataString);
}

function toggleRun() {
    var comName = document.getElementById("computers").value;
    var scriptName = document.getElementById("edit-name").value;

    var data = JSON.parse(`{
        "computer": "${comName}",
        "script": "${scriptName}"
    }`);

    var xhr = new XMLHttpRequest();
    var file = "../../backend/toggle-run";
    xhr.open("POST", file, true);
    
    var dataString = JSON.stringify(data);
    console.log(dataString);
    xhr.send(dataString);
}
