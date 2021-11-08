const express = require("express");
const config = require("config");
const log = require('simple-node-logger').createSimpleLogger();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jsonParser = express.json();
const Schema = mongoose.Schema;
const app = express();
const ingredientSchema = require("./Schemes/ingredientSchema");
const dishTypeSchema = require("./Schemes/dishTypeSchema");
const dishSchema = require("./Schemes/dishSchema");
const orderedDishSchema = require("./Schemes/orderedDishSchema");
const userSchema = require("./Schemes/userSchema");
const orderSchema = require("./Schemes/orderSchema");
const cardSchema = require("./Schemes/cardSchema");
const distributionPointSchema = require("./Schemes/distributionPointSchema");
const orderStatusSchema = require("./Schemes/orderStatusSchema");

const  ingredientModel = mongoose.Model(" ingredient",  ingredientSchema);
const  dishTypeModel = mongoose.Model(" dishType",  dishTypeSchema);
const  dishModel = mongoose.Model(" dish",  dishSchema);
const  orderedDishModel = mongoose.Model(" orderedDish",  orderedDishSchema);
const  userModel = mongoose.Model(" user",  userSchema);
const  orderModel = mongoose.Model(" order",  orderSchema);
const  cardModel = mongoose.Model(" card",  cardSchema);
const  distributionPointModel = mongoose.Model(" distributionPoint",  distributionPointSchema);
const  orderStatusModel = mongoose.Model(" orderStatus",  orderStatusSchema);

app.use((req, res, next) => {
    log.info("request ", req.url);

    if (!req.query.token || !bcrypt.compareSync(req.query?.token, config.get("token"))) {
        log.error("access denied");
        return res.sendStatus(401);
    }
    return next();
});

app.get("/user/", (req, res) => {

});

app.get("/", (req, res) => {
    res.send("<h2>Привет Express!</h2>");
});

app.get("/ingredient", (req, res) => {
    ingredientModel.find({}, function(err, ingredients){
        if(err) return console.log(err);
        res.send(ingredients)
    });
});

app.get("/dishType", (req, res) => {
    dishTypeModel.find({}, function(err, types){
        if(err) return console.log(err);
        res.send(types)
    });
});

app.get("/dish", (req, res) => {
    dishModel.find({}, function(err, dishes){
        if(err) return console.log(err);
        res.send(dishes)
    });
});

app.get("/orderedDish", (req, res) => {

});

app.get("/order", (req, res) => {

});

app.get("/card", (req, res) => {
    cardModel.find({}, function(err, card){
        if(err) return console.log(err);
        res.send(card)
    });
});

app.get("/distributionPoint", (req, res) => {
    distributionPointModel.find({}, function(err, points){
        if(err) return console.log(err);
        res.send(points)
    });
});

app.listen(3001);