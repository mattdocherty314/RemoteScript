function sendBackend(data, dir) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", dir, true);
    var dataString = JSON.stringify(data);
    xhr.send(dataString);
}