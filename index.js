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
const {ObjectId} = require("mongodb");

const Ingredient = mongoose.model(" ingredient", ingredientSchema);
const DishType = mongoose.model(" dishType", dishTypeSchema);
const Dish = mongoose.model(" dish", dishSchema);
const OrderedDish = mongoose.model(" orderedDish", orderedDishSchema);
const User = mongoose.model(" user", userSchema);
const Order = mongoose.model(" order", orderSchema);
const Card = mongoose.model(" card", cardSchema);
const DistributionPoint = mongoose.model(" distributionPoint", distributionPointSchema);
const OrderStatus = mongoose.model(" orderStatus", orderStatusSchema);

const connectionString = `mongodb+srv://${config.get("dbuser")}:${config.get("dbpassword")}@cluster0.phklg.mongodb.net/${config.get("dbname")}?retryWrites=true&w=majority`;
mongoose.connect(connectionString, function (err) {
    if (err) console.log(err);
    app.listen(3000, function () {
        console.log("Сервер ожидает подключения...");
    });
});

const userRouter = express.Router();

app.use((req, res, next) => {
    log.info("request ", req.url);

    if (!req.query.token || !bcrypt.compareSync(req.query?.token, config.get("token"))) {
        log.error("access denied");
        return res.sendStatus(401);
    }
    return next();
});

const dishRouter = express.Router();

dishRouter.get("/", (req, res) => {
    Dish.find({}, (err, dishes) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }
        res.send(dishes);
    });
});

dishRouter.get("/:id", (req, res) => {
    Dish.findOne({_id: ObjectId(req.params.id)}, (err) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }
        res.send(dish);
    });
});

dishRouter.put("/edit", (req, res) => {
    let newDish = {
        name: req.query.name,
        description: req.query.description,
        price: req.query.price,
        image: req.query.image,
        ingredient: req.query.ingredient,
        type: req.query.type
    };

    Dish.findOneAndUpdate({_id: req.params.id}, newDish, (err) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }
        res.send(200);
    });
});

dishRouter.post("/add", (req, res) => {
    let dish = new Dish({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
        ingredient: req.body.ingredient,
        type: req.body.type
    });

    dish.save((err, dishes) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }
        res.sendStatus(200);
    });
});

dishRouter.delete("/delete/:id", (req, res) => {
    Dish.findByIdAndDelete(ObjectId(req.params.id), (err) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }
        res.sendStatus(200);
    });
});

app.use("/dish", dishRouter);

const dishTypeRouter = express.Router();

dishTypeRouter.get("/", (req, res) => {
    DishType.find({}, (err, dishTypes) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }
        res.send(dishTypes);
    });
});

dishTypeRouter.get("/:id", (req, res) => {
    DishType.findOne({_id: ObjectId(req.params.id)}, (err, dishType) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }
        res.send(dishType);
    })
});

dishTypeRouter.put("/edit", (req, res) => {
    let newDishType = {
        name: req.query.name
    };

    DishType.findOneAndUpdate({_id: req.params.id}, newDishType, (err) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }
        res.send(200);
    })
});

dishTypeRouter.post("/add", (req, res) => {
    let dishType = new DishType({
        name: req.body.name
    });

    dishType.save((err) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }
        res.sendStatus(200);
    });
});

dishTypeRouter.delete("/delete/:id", (req, res) => {
    DishType.findByIdAndDelete(ObjectId(req.params.id), (err) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }
        res.sendStatus(200);
    });
});

app.use("/dishType", dishTypeRouter);





app.get("/user/", (req, res) => {

});

app.get("/", (req, res) => {
    res.send("<h2>Ну привет, пидарюга (:</h2>");
});

const ingredientRouter = express.Router();

app.get("/ingredient", (req, res) => {
    Ingredient.find({}, (err, ingredients) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }
        res.send(ingredients);
    });
});

const orderedDishRouter = express.Router();

app.get("/orderedDish", (req, res) => {

});

const orderRouter = express.Router();

app.get("/order", (req, res) => {

});

const cardRouter = express.Router();

app.get("/card", (req, res) => {
    Card.find({}, (err, card) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }
        res.send(card);
    });
});

const distributionPointRouter = express.Router();

app.get("/distributionPoint", (req, res) => {
    DistributionPoint.find({}, (err, points) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }
        res.send(points);
    });
});

app.listen(3001);