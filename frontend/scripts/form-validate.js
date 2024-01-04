function pageLoad() {
    let editNameField = document.getElementById("edit-name");
    let editOSField = document.getElementById("edit-os");
    let editIPField = document.getElementById("edit-ip");
    let editPortField = document.getElementById("edit-port");
    let editUserField = document.getElementById("edit-user");
    let editPassField = document.getElementById("edit-pass");

    editNameField.addEventListener("input", checkValid);
    editOSField.addEventListener("input", checkValid);
    editIPField.addEventListener("input", checkValid);
    editPortField.addEventListener("input", checkValid);
    editUserField.addEventListener("input", checkValid);
    editPassField.addEventListener("input", checkValid);
}

function checkValid() {
}

// Validation Functions
function isValidName(name) {
    const userRegex = /[A-Za-z0-9\-]+/g
    return user === userRegex.exec(user);

} function isValidOS(os) {
    return ((os === "Windows") || (os === "Linux"));

} function isValidIP(ip) {
    let ipBytes = ip.split(".");
    return ipBytes.every((byte) => {return (parseInt(byte) <= 255) && (parseInt(byte) >= 0)}) && ipBytes.length === 4;

} function isValidPort(port) {
    return ((parseInt(port) <= 65535) && (parseInt(port >= 0)));

} function isValidUsername(user) {
    const userRegex = /[A-Za-z0-9]+/g
    return user === userRegex.exec(user);

} function isValidPassword(passwd) {
    const userRegex = /[A-Za-z0-9]+/g
    return user === userRegex.exec(user);
}

window.addEventListener("load", pageLoad);