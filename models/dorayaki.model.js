const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dorayakiSchema = new Schema({
    rasa: {
        type: String,
        required: true,
        unique: true
    },
    deskripsi: {
        type: String,
        required: true
    },
    gambar: {
        type: String,
        required: true
    },
})

const Dorayaki = mongoose.model('Dorayaki', dorayakiSchema);

module.exports = Dorayaki;