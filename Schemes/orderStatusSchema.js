const {Schema} = require("mongoose");
const orderStatusScheme = new Schema({
    id: Number,
    name: String
});

module.exports = orderStatusScheme;