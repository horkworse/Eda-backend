const dishScheme = new Schema({
    id: Number,
    name: String,
    description: String,
    price: Number,
    image: Array,
    ingredient: Array,
    type: String
});

module.exports = dishScheme;