window.addEventListener("load", pageLoad);

function pageLoad() {
    var showOutputBtn = document.getElementById("show");
    showOutputBtn.addEventListener("click", showOutput);

    var comDiv = document.getElementById("computer");
    var comJSON = loadComputerJSON();
    displayOptions(comDiv, comJSON);

    var scriptDiv = document.getElementById("script");
    var scriptJSON = loadScriptJSON();
    displayOptions(scriptDiv, scriptJSON);
}

function displayOptions(div, json) {
    div.innerHTML = "";
    for (var c in json) {
        div.innerHTML += "<option>"+json[c].name+"</option>";
    }
}

function loadComputerJSON() {
    var xhr = new XMLHttpRequest();
    var file = "../../backend/json/computers.json";
    xhr.open("GET", file, false);
    xhr.send();
    if (xhr.status == 200) {
        var json = JSON.parse(xhr.responseText);
        return json;
    }
}

function loadScriptJSON() {
    var xhr = new XMLHttpRequest();
    var file = "../../backend/json/scripts.json";
    xhr.open("GET", file, false);
    xhr.send();
    if (xhr.status == 200) {
        var json = JSON.parse(xhr.responseText);
        return json;
    }
}

function showOutput() {
    var computer = document.getElementById("computer").value;
    var script = document.getElementById("script").value;

    var xhr = new XMLHttpRequest();
    var file = `../../backend/cmd-output/${script}_&_${computer}.txt`;
    xhr.open("GET", file, false);
    xhr.send();

    var content = "<em> No File Found </em>";
    if (xhr.status == 200) {
        content = xhr.responseText;
    }

    var outputDiv = document.getElementById("output");
    var contentLines = content.split("\n");
    outputDiv.innerHTML = "";
    for (var l in contentLines) {
        outputDiv.innerHTML += contentLines[l]+"<br>";
    }
}