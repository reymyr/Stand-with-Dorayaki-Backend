const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tokoDorayakiSchema = new Schema({
    nama: {
        type: String,
        required: true,
        unique: true
    },
    jalan: String,
    kecamatan: String,
    provinsi: String,
    stok: [{dorayaki: { type: mongoose.Types.ObjectId, ref: 'Dorayaki' }, jumlah: {type: Number, min: 0}}]
})

const TokoDorayaki = mongoose.model('Toko Dorayaki', tokoDorayakiSchema);

module.exports = TokoDorayaki;