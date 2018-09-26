window.addEventListener("load", pageLoad);

function pageLoad() {
    var comDiv = document.getElementById("list-computers");
    var comJSON = loadComputerJSON();

    displayComputerName(comDiv, comJSON);
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
