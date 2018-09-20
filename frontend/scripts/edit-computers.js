window.addEventListener("load", pageLoad);

function pageLoad() {
    var comDiv = document.getElementById("list-computers");
    var comJSON = loadComputerJSON();
    var scriptDiv = document.getElementById("scripts");
    var scriptJSON = loadScriptJSON();

    displayComputerName(comDiv, comJSON);
    displayScripts(scriptDiv, scriptJSON);
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
        div.innerHTML += "<div id='com"+c+"'> <br>";
        div.innerHTML += "<p class='name'>"+json[c].name+" </p>";
        div.innerHTML += "<button id='edit-com-"+c+"'> Edit Data </button>";
        div.innerHTML += "<button id='stop-script-"+c+"'> Stop Script </button>";
        div.innerHTML += "</div>";
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

function displayScripts(div, json) {
    div.innerHTML = "<option> none </option>";
    for (var c in json) {
        div.innerHTML += "<option>"+json[c].name+"</option>";
    }
}