const ingredientScheme = new Schema({
    id: Number,
    name: String,
    price: Number,
    required: Boolean,
    additional: Boolean
});

module.exports = ingredientScheme;