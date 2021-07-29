const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tokoDorayakiSchema = new Schema({
    nama: {
        type: String,
        required: true,
        unique: true
    },
    jalan: {
        type: String,
        required: true
    },
    kecamatan: {
        type: String,
        required: true
    },
    provinsi: {
        type: String,
        required: true
    },
    stok: [{dorayaki: { type: mongoose.Types.ObjectId, ref: 'Dorayaki' }, jumlah: {type: Number, min: 0}}]
})

const TokoDorayaki = mongoose.model('Toko', tokoDorayakiSchema);

module.exports = TokoDorayaki;