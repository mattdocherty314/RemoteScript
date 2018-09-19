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
    console.log(json[0]);
    div.innerHTML = "";
    for (var c in json) {
        div.innerHTML += "<div id='c"+c+"'> <br>";
        div.innerHTML += "<p id='name"+c+"'> <strong> Name: </strong> "+json[c].name+" </p>";
        div.innerHTML += "<p id='os"+c+"'> <strong> OS: </strong> "+json[c].os+" </p>";
        div.innerHTML += "<p id='ip"+c+"'> <strong> IP Address: </strong> "+json[c].ip+" </p>";
        div.innerHTML += "<p id='port"+c+"'> <strong> Port: </strong> "+json[c].port+" </p>";
        div.innerHTML += "<p id='cpu"+c+"'> <strong> CPU Usage (%): </strong> "+json[c].cpu+" </p>";
        div.innerHTML += "<p id='ram"+c+"'> <strong> RAM Usage (KB): </strong> "+json[c].ram+" </p>";
        if (json[c].online === true) {
            div.innerHTML += "<p id='online"+c+"'><strong> Online </strong></p>";
        } else {
            div.innerHTML += "<p id='online"+c+"'><strong> Offline </strong></p>";
        }
        div.innerHTML += "</div>";
    }
}