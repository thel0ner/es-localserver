const { app, BrowserWindow, Menu } = require("electron");

app.on(
    "ready",
    () => {
        let win = new BrowserWindow(
            {
                width: 860,
                height: 700,
                icon: __dirname + '/wifi.png',
                webPreferences: {
                    nodeIntegration: true,
                    allowRunningInsecureContent : true
                }
            }
        );
        win.loadFile("./index.html");
        win.setResizable(false);
        Menu.setApplicationMenu(null);
        // win.webContents.openDevTools();
    }
);