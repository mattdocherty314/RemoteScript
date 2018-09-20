window.addEventListener("load", pageLoad);

function pageLoad() {
    var scriptDiv = document.getElementById("scripts");
    var scriptJSON = loadScriptJSON();

    displayScriptJSON(scriptDiv, scriptJSON);
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

function displayScriptJSON(div, json) {
    div.innerHTML = "";
    for (var s in json) {
        div.innerHTML += "<div id='script"+s+"'> <br>";
        div.innerHTML += "<p class='name'> <strong> Name: </strong> "+json[s].name+" </p>";
        div.innerHTML += "<p class='content'> <strong> Name: </strong> "+json[s].content+" </p>";
        div.innerHTML += "<p class='name'> <strong> Running on: </strong> </p>";
        for (var c in json[s].running) {
            div.innerHTML += "<ul> "+json[s].running[c]+" </ul>";
        }
        div.innerHTML += "</div>";
    }
}