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

// const  ingredientModel = mongoose.model(" ingredient",  ingredientSchema);
const  dishTypeModel = mongoose.model(" dishType",  dishTypeSchema);
const  dishModel = mongoose.model(" dish",  dishSchema);
// const  orderedDishModel = mongoose.model(" orderedDish",  orderedDishSchema);
// const  userModel = mongoose.model(" user",  userSchema);
// const  orderModel = mongoose.model(" order",  orderSchema);
// const  cardModel = mongoose.model(" card",  cardSchema);
// const  distributionPointModel = mongoose.model(" distributionPoint",  distributionPointSchema);
// const  orderStatusModel = mongoose.model(" orderStatus",  orderStatusSchema);

mongoose.connect("mongodb+srv://horkworse:rtf-123@cluster0.phklg.mongodb.net/eda-backend?retryWrites=true&w=majority", function(err){
    if(err) return console.log(err);
    app.listen(3000, function(){
        console.log("Сервер ожидает подключения...");
    });
});

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

app.get("/dish/insert", (req, res) => {
    // if(!req.body) return res.sendStatus(400);

    const coffee = {
        name: "Капучино",
        description: "Ароматный свежий капучино",
        price: 45,
        image: ["https://coffeemania.ru/uploads/p16/5b3f45a1794a064.jpg"],
        ingredient: [{
            name: "Зерна кофе",
            price: 0,
            required: true,
            additional: false
        }, {
            name: "Молоко",
            price: 0,
            required: true,
            additional: false
        }],
        type: ""
    };

    let salad = {
        name: "Салат весна",
        description: "Ароматный свежий салат",
        price: 45,
        image: ["https://static.1000.menu/img/content/37230/salat-graciya_1564753184_1_max.jpg"],
        ingredient: [{
            name: "Капуста",
            price: 0,
            required: true,
            additional: false
        }, {
            name: "Перец",
            price: 0,
            required: true,
            additional: false
        }, {
            name: "Лук",
            price: 0,
            required: true,
            additional: false
        }, {
            name: "Морковь",
            price: 0,
            required: true,
            additional: false
        }],
        type: ""
    };

    const coffeeModel = new dishModel(coffee);
    const saladModel = new dishModel(salad);

    coffeeModel.save(function(err){
        if(err) return console.log(err);
        saladModel.save(function(err){
            if(err) return console.log(err);
            res.send("ok");
        });
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