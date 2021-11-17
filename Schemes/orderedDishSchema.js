const {Schema} = require("mongoose");
const orderedDishScheme = new Schema({
    id: Number,
    ingredient: Array,
    dish: Number
});

module.exports = orderedDishScheme;