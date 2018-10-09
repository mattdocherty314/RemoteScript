window.addEventListener("load", pageLoad);

function pageLoad() {
    setInterval(compareChanges, 1000);
    setInterval(computerDataValid, 1000);
}

function compareChanges() {
    var pageInfo = getPageInfo();
    if (pageInfo[0] === "edit") {
        if (pageInfo[1] === "computers.html") {
            compareComputerData();
        } else if (pageInfo[1] === "scripts.html") {
            compareScriptData();
        }
    }
}

function getPageInfo() {
    var pagePath = window.location.pathname;
    var pageName = pagePath.split("/").pop();
    return pageName.split("-");
}

function compareComputerData() {
    var ids = ["name", "os", "ip", "port", "user", "pass"];
    var inputValues = [];
    for (var i in ids) {
        var inputElement = document.getElementById("edit-"+ids[i]);
        inputValues.push(inputElement.value);
    }

    var modifyBtn = document.getElementById("modify");
    modifyBtn.disabled = true;
    var emptyStatus = checkEmptyStatus(inputValues);
    if (emptyStatus === 0) {
        modifyBtn.disabled = false;
        var computerJSON = getJSON("../../backend/json/computers.json");
        for (var c in computerJSON) {
            var dataValues = [];
            for (var i in ids) {
                dataValues.push(computerJSON[c][ids[i]]);
            }

            var idElement = document.getElementById("com-id");
            if (isListIdentical(inputValues, dataValues) <= 1) {
                idElement.innerHTML = "<strong> Computer ID: </strong>"+c;
                modifyBtn.innerHTML = "Edit Computer";
                break;
            } else {
                idElement.innerHTML = "";
                modifyBtn.innerHTML = "Add Computer";
            }
        }
    }
}

function compareScriptData() {
    var ids = ["name", "content"];
    var inputValues = [];
    for (var i in ids) {
        var inputElement = document.getElementById("edit-"+ids[i]);
        inputValues.push(inputElement.value);
    }

    var modifyBtn = document.getElementById("modify");
    var startStopBtn = document.getElementById("start-stop");
    modifyBtn.disabled = true;
    startStopBtn.disabled = true;
    var emptyStatus = checkEmptyStatus(inputValues);
    if (emptyStatus === 0) {
        modifyBtn.disabled = false;
        var scriptJSON = getJSON("../../backend/json/scripts.json");
        for (var s in scriptJSON) {
            var dataValues = [];
            for (var i in ids) {
                dataValues.push(scriptJSON[s][ids[i]]);
            }

            var idElement = document.getElementById("script-id");
            if (isListIdentical(inputValues, dataValues) <= 1) {
                idElement.innerHTML = "<strong> Script ID: </strong>"+s;
                startStopBtn.disabled = false;
                break;
            } else {
                idElement.innerHTML = "";
            }
        }
    }

}

function getJSON(dbFile) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", dbFile, false);
    xhr.send();
    if (xhr.status == 200) {
        var json = JSON.parse(xhr.responseText);
        return json;
    }
}

function checkEmptyStatus(list) {
    var emptyFields = 0;
    for (var i in list) {
        if (list[i] === "") {
            emptyFields++;
        }
    } if (emptyFields === list.length) {
        return 2;
    } else if (emptyFields === 0) {
        return 0;
    } return 1;
}

function isListIdentical(orig, comp) {
    var numChanged = 0;
    for (var i in orig) {
        if (orig[i].toString() !== comp[i].toString()) {
            numChanged++;
        }
    }

    if (numChanged === 0) {
        return 0;
    } else if (numChanged <= orig.length/2) {
        return 1;
    } return 2;
}

function computerDataValid() {
    var ipValue = document.getElementById("edit-ip").value;
    var validIP = checkValidIP(ipValue);

    var portValue = document.getElementById("edit-port").value;
    var validPort = checkValidPort(portValue);
    
    var comDataValid = (validIP && validPort);
    var modifyBtn = document.getElementById("modify");
    modifyBtn.disabled = true;
    if (comDataValid === true) {
        modifyBtn.disabled = false;
    }
}

function checkValidIP(ip) {
    var validIpChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
    var ipChars = ip.split("");
    for (var c in ipChars) {
        if (validIpChars.includes(ipChars[c]) === false) {
            return false;
        }
    }

    var ipNums = ip.split(".");
    if (ipNums.length > 4) {
        return false;
    } for (var n in ipNums) {
        if (parseInt(ipNums[n]) > 255) {
            return false;
        }
    }

    return true;
}

function checkValidPort(port) {
    var validPortChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    var portChars = port.split("");
    for (var c in portChars) {
        if (validPortChars.includes(portChars[c]) === false) {
            return false;
        }
    }

    portInt = parseInt(port);
    if (portInt > 65535) {
        return false;
    }
    return true;
}