const express = require("express");
const log = require('simple-node-logger').createSimpleLogger();

const app = express();

app.use((req, res, next) => {
    log.info("request ", req.url);
    return next();
});

app.get("/", (req, res) => {
    res.send("<h2>Привет Express!</h2>");
});

app.listen(3001);