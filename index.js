const express = require("express");
const config = require("config");
const log = require('simple-node-logger').createSimpleLogger();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const app = express();

app.use((req, res, next) => {
    log.info("request ", req.url);
    // bcrypt.hash(config.get("token"), 10)
    //     .then(x => console.log(x))

    if (!req.query.token || !bcrypt.compareSync(req.query?.token, config.get("token"))) {
        log.error("access denied");
        return res.sendStatus(401);
    }
    return next();
});

app.get("/", (req, res) => {
    res.send("<h2>Привет Express!</h2>");
});

app.listen(3001);