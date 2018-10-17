exports.main = function(computerData, command) {
    var ip = computerData.ip;
    var port = computerData.port;
    var user = computerData.user;
    var pass = computerData.pass;

    return `sshpass -p "${pass}" ssh -p ${port} ${user}@${ip} "${command}"`;
}