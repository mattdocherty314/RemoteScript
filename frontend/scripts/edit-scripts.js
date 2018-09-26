window.addEventListener("load", pageLoad);

function pageLoad() {
    var scriptDiv = document.getElementById("list-scripts");
    var scriptJSON = loadComputerJSON();
    var comDiv = document.getElementById("computers");
    var comJSON = loadScriptJSON();

    displayScriptName(scriptDiv, scriptJSON);
    displayComputers(comDiv, comJSON);
}

function loadComputerJSON() {
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
        div.innerHTML += "<button id='edit-com-"+c+"'> Edit Data </button>";
        div.innerHTML += "<button id='stop-script-"+c+"'> Stop Script </button>";
        div.innerHTML += "</div><br>";
    }
}

function loadScriptJSON() {
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
    div.innerHTML = "<option> all </option>";
    for (var c in json) {
        div.innerHTML += "<option>"+json[c].name+"</option>";
    }
}