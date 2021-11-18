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
    if (err) log.error(err);
    app.listen(3001, () => {
        console.log("success");
    });
});

app.use((req, res, next) => {
    log.info("request ", req.url);
    // console.log(req.query);
    // console.log(req.params);
    // console.log(req.body);
    // console.log(req.headers);

    // if (!req.query?.token || !req.body?.token || !bcrypt.compareSync(req.query?.token, config.get("token"))) {
    //     log.error("access denied");
    //     return res.sendStatus(401);
    // }
    return next();
});

const dishRouter = express.Router();

dishRouter.get("/", (req, res) => {
    Dish.find({}, (err, dishes) => {
        if (err) {
            log.error(err);
            return res.sendStatus(400);
        }
        return dishes? res.send(dishes) : res.sendStatus(404);
    });
});

dishRouter.get("/:id", (req, res) => {
    Dish.findOne({_id: ObjectId(req.params.id)}, (err, dish) => {
        if (err) {
            log.error(err);
            return res.sendStatus(400);
        }
        return dish? res.send(dish) : res.sendStatus(404);
    });
});

dishRouter.put("/edit", (req, res) => {
    if(!req.body) {
        log.error("empty body");
        return res.sendStatus(400);
    }
    let dish = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
        ingredient: req.body.ingredient,
        type: req.body.type
    };

    Dish.findOneAndUpdate({_id: req.params.id}, dish, (err, newDish) => {
        if (err) {
            log.error(err);
            return res.sendStatus(400);
        }
        res.send(newDish.id);
    });
});

dishRouter.post("/add", jsonParser, (req, res) => {
    if(!req.body) {
        log.error("empty body");
        return res.sendStatus(400);
    }
    let dish = new Dish({
        name: req.query.name,
        description: req.query.description,
        price: req.query.price,
        image: req.query.image,
        ingredient: req.query.ingredient,
        type: req.query.type
    });
    dish.save((err, newDish) => {
        if (err) {
            log.error(err);
            return res.sendStatus(400);
        }
        res.send(newDish.id);
    });
});

dishRouter.delete("/delete/:id", (req, res) => {
    Dish.findByIdAndDelete(ObjectId(req.params.id), (err) => {
        if (err) {
            log.error(err);
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
            log.error(err);
            return res.sendStatus(400);
        }
        res.send(dishTypes);
        return dishTypes? res.send(dishTypes) : res.sendStatus(404);
    });
});

dishTypeRouter.get("/:id", (req, res) => {
    DishType.findOne({_id: ObjectId(req.params.id)}, (err, dishType) => {
        if (err) {
            log.error(err);
            return res.sendStatus(400);
        }
        return dishType? res.send(dishType) : res.sendStatus(404);
    })
});

dishTypeRouter.put("/edit", (req, res) => {
    if(!req.body) {
        log.error("empty body");
        return res.sendStatus(400);
    }
    let dishType = {
        name: req.query.name
    };
    DishType.findOneAndUpdate({_id: req.params.id}, dishType, (err, newDishType) => {
        if (err) {
            log.error(err);
            return res.sendStatus(400);
        }
        res.send(newDishType.id);
    })
});

dishTypeRouter.post("/add", (req, res) => {
    if(!req.body) {
        log.error("empty body");
        return res.sendStatus(400);
    }
    let dishType = new DishType({
        name: req.body.name,
        group: req.body.group
    });
    dishType.save((err, newDishType) => {
        if (err) {
            log.error(err);
            return res.sendStatus(400);
        }
        res.send(newDishType.id);
    });
});

dishTypeRouter.delete("/delete/:id", (req, res) => {
    DishType.findByIdAndDelete(ObjectId(req.params.id), (err) => {
        if (err) {
            log.error(err);
            return res.sendStatus(400);
        }
        res.sendStatus(200);
    });
});

app.use("/dishType", dishTypeRouter);

const ingredientRouter = express.Router();

ingredientRouter.get("/", (req, res) => {
    Ingredient.find({}, (err, ingredients) => {
        if (err) {
            log.error(err);
            return res.sendStatus(400);
        }
        return ingredients? res.send(ingredients) : res.sendStatus(404);
    });
});

ingredientRouter.get("/:id", (req, res) => {
    Ingredient.findOne({_id: ObjectId(req.params.id)}, (err, ingredient) => {
        if (err) {
            log.error(err);
            return res.sendStatus(400);
        }
        return ingredient? res.send(ingredient) : res.sendStatus(404);

    });
});

ingredientRouter.put("/edit", (req, res) => {
    if(!req.body) {
        log.error("empty body");
        return res.sendStatus(400);
    }
    let newIngredient = {
        name: req.query.name,
        description: req.query.description,
        price: req.query.price,
        image: req.query.image,
        ingredient: req.query.ingredient,
        type: req.query.type
    };
    Ingredient.findOneAndUpdate({_id: req.params.id}, newIngredient, (err, ingredient) => {
        if (err) {
            log.error(err);
            return res.sendStatus(400);
        }
        res.send(ingredient.id);
    });
});

ingredientRouter.post("/add", (req, res) => {
    if(!req.body) {
        log.error("empty body");
        return res.sendStatus(400);
    }
    let ingredient = new Ingredient({
        name: req.body.name,
        price: req.body.price,
        required: req.body.required,
        additional: req.body.additional
    });
    ingredient.save((err, newIngredient) => {
        if (err) {
            log.error(err);
            return res.sendStatus(400);
        }
        res.send(newIngredient.id);
    });
});

ingredientRouter.delete("/delete/:id", (req, res) => {
    Ingredient.findByIdAndDelete(ObjectId(req.params.id), (err) => {
        if (err) {
            log.error(err);
            return res.sendStatus(400);
        }
        res.sendStatus(200);
    });
});

app.use("/ingredient", ingredientRouter);

const distributionPointRouter = express.Router();

distributionPointRouter.get("/", (req, res) => {
    DistributionPoint.find({}, (err, points) => {
        if (err) {
            log.error(err);
            return res.sendStatus(400);
        }
        return points? res.send(points) : res.sendStatus(404);
    });
});

distributionPointRouter.get("/:id", (req, res) => {
    DistributionPoint.findOne({_id: ObjectId(req.params.id)}, (err, distributionPoint) => {
        if (err) {
            log.error(err);
            return res.sendStatus(400);
        }
        res.send(distributionPoint);
        return distributionPoint? res.send(distributionPoint) : res.sendStatus(404);
    });
});

distributionPointRouter.put("/edit", (req, res) => {
    if(!req.body) {
        log.error("empty body");
        return res.sendStatus(400);
    }
    let distributionPoint = {
        name: req.query.name,
        address: req.query.address
    };
    DistributionPoint.findOneAndUpdate({_id: req.params.id}, distributionPoint, (err, newDistributionPoint) => {
        if (err) {
            log.error(err);
            return res.sendStatus(400);
        }
        res.send(newDistributionPoint.id);
    });
});

distributionPointRouter.post("/add", (req, res) => {
    if(!req.body) {
        log.error("empty body");
        return res.sendStatus(400);
    }
    let distributionPoint = new DistributionPoint({
        name: req.query.name,
        address: req.query.address
    });
    distributionPoint.save((err, newDistributionPoint) => {
        if (err) {
            log.error(err);
            return res.sendStatus(400);
        }
        res.send(newDistributionPoint.id);
    });
});

distributionPointRouter.delete("/delete/:id", (req, res) => {
    DistributionPoint.findByIdAndDelete(ObjectId(req.params.id), (err) => {
        if (err) {
            log.error(err);
            return res.sendStatus(400);
        }
        res.sendStatus(200);
    });
});

app.use("/distributionPoint", distributionPointRouter);
//to-do
// 1) доделать остальные по примерам сверху
// 2) протестировать все запросы
// 3) валидация и ПК зренмк
// 4)


const userRouter = express.Router();

app.get("/user/", (req, res) => {

});

app.get("/", (req, res) => {
    res.send("<h2>Ну привет, пидарюга (:</h2>");
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
            log.error(err);
            return res.sendStatus(400);
        }
        res.send(card);
    });
});