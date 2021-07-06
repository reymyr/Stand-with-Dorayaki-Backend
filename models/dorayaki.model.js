const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dorayakiSchema = new Schema({
    rasa: {
        type: String,
        required: true,
        unique: true
    },
    deskripsi: String,
    gambar: Buffer,
})

const Dorayaki = mongoose.model('Dorayaki', dorayakiSchema);

module.exports = Dorayaki;