const {Schema} = require("mongoose");
const orderScheme = new Schema({
    id: Number,
    dishes: Array,
    distributionPoint: String,
    userId: Number,
    date: String,
    status: String
});

module.exports = orderScheme;