function pageLoad() {
    let editFields = document.getElementById("edit-data");
    editFields.addEventListener("input", checkValid);
}

function checkValid() {
    let editNameField = document.getElementById("edit-name");
    let editOSField = document.getElementById("edit-os");
    let editIPField = document.getElementById("edit-ip");
    let editPortField = document.getElementById("edit-port");
    let editUserField = document.getElementById("edit-user");
    let editPassField = document.getElementById("edit-pass");

    let addComputerBtn = document.getElementById("modify");
    let errorDiv = document.getElementById("error");

    errorDiv.innerHTML = "";
    let errorExists = false;
    if (!isValidName(editNameField.value)) {
        errorDiv.innerHTML += "Name is not valid (Can only contain letters, numbers, '-' & '_')<br/>";
        errorExists = true;
    } if (!isValidOS(editOSField.value)) {
        errorDiv.innerHTML += "OS is not valid (Can only be 'Windows' or 'Linux')<br/>";
        errorExists = true;
    } if (!isValidIP(editIPField.value)) {
        errorDiv.innerHTML += "IP is not valid (Can only be in IPv4 format)<br/>";
        errorExists = true;
    } if (!isValidPort(editPortField.value)) {
        errorDiv.innerHTML += "Port is not valid (Can only be a number between 0 and 65535)<br/>";
        errorExists = true;
    } if (!isValidUsername(editUserField.value)) {
        errorDiv.innerHTML += "Username is not valid (Can only contain letters & numbers)<br/>";
        errorExists = true;
    } if (!isValidPassword(editPassField.value)) {
        errorDiv.innerHTML += "Password is not valid (Can only contain letters & numbers)<br/>";
        errorExists = true;
    }

    if (errorExists) {
        addComputerBtn.setAttribute("disabled", "");
    } else {
        addComputerBtn.removeAttribute("disabled");
    }
}

// Validation Functions
function isValidName(name) {
    const nameRegex = /[A-Za-z0-9\-_]+/g;
    return name === (nameRegex.exec(name) || "")[0];

} function isValidOS(os) {
    return ((os === "Windows") || (os === "Linux"));

} function isValidIP(ip) {
    let ipBytes = ip.split(".");
    return ipBytes.every((byte) => {return (parseInt(byte) <= 255) && (parseInt(byte) >= 0)}) && ipBytes.length === 4;

} function isValidPort(port) {
    console.log(port);

    return ((parseInt(port) <= 65535) && (parseInt(port) >= 0));

} function isValidUsername(user) {
    const userRegex = /[A-Za-z0-9]+/g;
    return user === (userRegex.exec(user) || "")[0];

} function isValidPassword(passwd) {
    const passwdRegex = /[A-Za-z0-9]+/g;
    return passwd === (passwdRegex.exec(passwd) || "")[0];
}

window.addEventListener("load", pageLoad);