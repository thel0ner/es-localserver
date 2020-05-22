const express = require("express");
const systemInfo = require("./systeminfo");
const serveIndex = require('serve-index');
const serveStatic = require('serve-static');
module.exports = (port = 7777, directory = "/", Dom) => {
    return new Promise(
        (resolve) => {
            const app = express();
            systemInfo().then(
                ip => {
                    Dom.style.display = "block";
                    app.use((req, res, next) => {
                        let date = new Date();
                        let msg = `<br />IP: ${req.connection.remoteAddress} , Method : ${req.method} , url: ${req.headers.host + '/' + req.url}  - Time : ${date.toLocaleDateString("en-US")}<br />`;
                        Dom.innerHTML += msg;
                        next();
                    })
                    app.use(serveIndex(directory, { icons: true }));
                    app.use(serveStatic(directory));
                    let instance = app.listen(
                        port,
                        ip,
                        () => { }
                    );
                    resolve(instance);
                },
                err => console.error(err)
            );
        }
    );
};