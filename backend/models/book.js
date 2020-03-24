const { Schema, model } = require('mongoose');
//de mongoose traemos a shcema y model para modelar los objetos y poder usarlos
const BookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, required: true },
    imagePath: { type: String, required: false },
    created_at: { type: Date, default: Date.now }
});

//solamente exportamos el schema de libro
module.exports = model('Book', BookSchema);