window.addEventListener("load", pageLoad);

function pageLoad() {
    var scriptDiv = document.getElementById("list-scripts");
    var scriptJSON = loadJSON("../../backend/json/scripts.json");
    var comDiv = document.getElementById("computers");
    var comJSON = loadJSON("../../backend/json/computers.json");

    displayScriptName(scriptDiv, scriptJSON);
    displayComputers(comDiv, comJSON);

    addEventListeners(scriptJSON);
}

function displayScriptName(div, json) {
    div.innerHTML = "";
    for (var c in json) {
        div.innerHTML += `<div id='com${c}'>`;
        div.innerHTML += `<p class='name'>${json[c].name}</p>`;
        div.innerHTML += `<button id='edit-script-${c}'> Edit Data </button>`;
        div.innerHTML += "</div><br>";
    }
}

function displayComputers(div, json) {
    div.innerHTML = "";
    for (var c in json) {
        div.innerHTML += `<option>${json[c].name}</option>`;
    }
}

function addEventListeners(json) {
    var clearBtn = document.getElementById("clear");
    clearBtn.addEventListener("click", function() {
        location.reload();
    });

    var modifyBtn = document.getElementById("modify");
    modifyBtn.addEventListener("click", modifyData);

    var startStopBtn = document.getElementById("start-stop");
    startStopBtn.addEventListener("click", toggleRun);

    var i = 0;
    do {
        var currentEditButton = document.getElementById(`edit-script-${i}`);
        currentEditButton.addEventListener("click", function (evt) {
            editScript(evt.srcElement.id.split("-")[2], json);
        });
        i += 1;
    } while (currentEditButton !== null);
}

function updateButton() {
    document.getElementById("computers").addEventListener("change", updateButton);
    
    var scriptID = document.getElementById("script-id");
    var scriptSelected = scriptID.innerHTML.split(" ").slice(-1)[0]

    var comSelected = document.getElementById("computers").value;
    var scriptJSON = loadJSON("../../backend/json/script.json");
    var comRunning = scriptJSON[scriptSelected].running;

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
    idPara.innerHTML = `<strong>Script ID: </strong> ${id}`; 

    var modifyBtn = document.getElementById("modify");
    modifyBtn.innerHTML = "Edit Script";

    updateButton(json[id]);
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
    sendBackend(json, "../../backend/modify-json");
}

function toggleRun() {
    var comName = document.getElementById("computers").value;
    var scriptName = document.getElementById("edit-name").value;

    var data = JSON.parse(`{
        "computer": "${comName}",
        "script": "${scriptName}"
    }`);

    sendBackend(data, "../../backend/toggle-run");
}
