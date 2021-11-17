const {Schema} = require("mongoose");
const userScheme = new Schema({
    id: Number,
    name: String,
    surname: String,
    phone: String,
    email: String,
    birthDate: String,
    studentCard: String
});

module.exports = userScheme;