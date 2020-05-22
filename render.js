const electron = require('electron').remote;
const shell = require('electron').shell;
const dialog = electron.dialog;
window.$ = window.jQuery = require('jquery');
window.Bootstrap = require('bootstrap');
const database = require('electron-localstorage');
const sysInfo = require('./systeminfo');
const serverRunner = require("./server");
var IP, Directory, Port = "";
var serverInstance = null;
$("#Messenger").toast("hide");
sysInfo().
    then(ip => {
        document.querySelector("#ipAddress").value = ip;
        IP = ip !== null && ip !== "" ? ip : "127.0.0.1";
    })
    .catch(err => console.error(err));
let rawData = database.getItem("settings");
if (rawData !== null && rawData.length > 0) {
    rawData = JSON.parse(rawData);
    document.querySelector("#customFileLabel").value = rawData.directory;
    document.querySelector("#ipAddress").value = rawData.ip;
    document.querySelector("#portNumber").value = rawData.port;
    document.querySelector("#saveSettings").value = rawData.saveSettings;
}
delete rawData;
document.querySelector("#customFile").addEventListener(
    "click",
    (event) => {
        event.preventDefault();
        const path = dialog.showOpenDialogSync({
            properties: ['openDirectory']
        });
        Directory = path[0];
        document.querySelector("#customFileLabel").innerText = path[0].length > 20 ? path[0].substr(0, 20) + "..." : path[0];
        if (Directory.length > 0) {
            document.querySelector("#ServerPanelErrors").style.display = "none";
        }
    }
);
document.querySelector("#startServer").addEventListener(
    "click",
    (event) => {

        Port = document.querySelector("#portNumber").value;
        if (typeof Directory !== "undefined" && Directory.length > 0) {
            // console.log(Directory);
            
            let check = Port !== null && Port.length > 0 ? parseInt(Port) : 8080;
            if (!isNaN(check) && check > 0 && check < 65536) {
                $("#Messenger").toast("show");
                $("#serverPanel").modal("hide");
                document.querySelector("#preface").style.display = "none";
                document.querySelector("#status").innerHTML = `Server is Up and running. <br /> Address : <a href="http://${IP}:${Port}" id="Open" >http://${IP}:${check}</a>`;
                document.querySelector("#status").style.display = "block";

                document.querySelector("#startServerPanel").style.display = "none";
                document.querySelector("#shutdownServer").style.display = "block";
                document.querySelector("#Open").addEventListener(
                    "click",
                    event => {
                        if (document.querySelector("#saveSettings").value === "on") {
                            let temp = {
                                directory: Directory,
                                ip: IP,
                                port: Port,
                                saveSettings: "on"
                            };
                            database.setItem("settings", JSON.stringify(temp));
                        } else {
                            database.clear();
                        }
                        shell.openExternal(`http://${IP}:${check}`);
                        event.preventDefault();
                    }
                );
                document.querySelector("#logs").innerText = "";
                serverRunner(Port, Directory, document.querySelector("#logs")).then(
                    data => {
                        serverInstance = data;
                        // console.log(serverInstance);
                    }
                );
            } else {
                document.querySelector("#ServerPanelErrors").innerText = "Incorrect port number!";
                document.querySelector("#ServerPanelErrors").style.display = "block";
            }

        } else {
            document.querySelector("#ServerPanelErrors").innerText = "Sorry, but Directory path is required!";
            document.querySelector("#ServerPanelErrors").style.display = "block";
        }
    }
);
document.querySelector("#shutdownServer").addEventListener(
    "click",
    (event) => {
        $("#shutdDownServerModal").modal("show");
    }
);
document.querySelector("#shutServerDownConfirmed").addEventListener(
    "click",
    (event) => {
        serverInstance.close();
        $("#shutdDownServerModal").modal("hide");
        document.querySelector("#preface").style.display = "block";
        document.querySelector("#status").style.display = "none";
        document.querySelector("#startServerPanel").style.display = "block";
        document.querySelector("#shutdownServer").style.display = "none";
        document.querySelector("#logs").innerHTML = "";
    }
);