function loadJSON(jsonFile) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", jsonFile, false);
    xhr.send();
    if (xhr.status == 200) {
        var json = JSON.parse(xhr.responseText);
        return json;
    }
}