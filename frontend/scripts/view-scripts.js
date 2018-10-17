window.addEventListener("load", pageLoad);

function pageLoad() {
    var scriptDiv = document.getElementById("scripts");
    var scriptJSON = loadJSON("../../backend/json/scripts.json");

    displayScriptJSON(scriptDiv, scriptJSON);
}

function displayScriptJSON(div, json) {
    div.innerHTML = "";
    for (var s in json) {
        div.innerHTML += `<div id='script${s}'><br>`;
        div.innerHTML += `<p class='name'><strong>Name: </strong>${json[s].name}</p>`;
        div.innerHTML += `<p class='content'><strong>Content: </strong> ${json[s].content}</p>`;
        div.innerHTML += "<p><strong>Running on:</strong></p>";
        for (var c in json[s].running) {
            div.innerHTML += `<ul>${json[s].running[c]}</ul>`;
        }
        div.innerHTML += "</div>";
    }
}