window.addEventListener("load", pageLoad);

function pageLoad() {
    var comDiv = document.getElementById("computers");
    var comJSON = loadComputerJSON();

    displayComputerJSON(comDiv, comJSON);
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

function displayComputerJSON(div, json) {
    div.innerHTML = "";
    for (var c in json) {
        div.innerHTML += "<div id='com"+c+"'> <br>";
        div.innerHTML += "<p class='name'> <strong> Name: </strong> "+json[c].name+" </p>";
        div.innerHTML += "<p class='os'> <strong> OS: </strong> "+json[c].os+" </p>";
        div.innerHTML += "<p class='ip'> <strong> IP Address: </strong> "+json[c].ip+" </p>";
        div.innerHTML += "<p class='port'> <strong> Port: </strong> "+json[c].port+" </p>";
        div.innerHTML += "<p class='cpu'> <strong> CPU Usage (%): </strong> "+json[c].cpu+" </p>";
        div.innerHTML += "<p class='ram'> <strong> RAM Usage (KB): </strong> "+json[c].ram+" </p>";
        if (json[c].online === true) {
            div.innerHTML += "<p class='online'><strong> Online </strong></p>";
        } else {
            div.innerHTML += "<p class='online'><strong> Offline </strong></p>";
        }
        div.innerHTML += "</div>";
    }
}