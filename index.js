const express = require("express");
const log = require('simple-node-logger').createSimpleLogger();
const mongoose = require("mongoose");
const app = express();

app.use((req, res, next) => {
    log.info("request ", req.url);
    // req.query.token =
    return next();
});

app.get("/", (req, res) => {
    res.send("<h2>Привет Express!</h2>");
});

app.listen(3001);