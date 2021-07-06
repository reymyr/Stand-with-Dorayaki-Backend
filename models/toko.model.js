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
    stok: [{dorayakiId: { type: mongoose.ObjectId, ref: 'Dorayaki' }, jumlah: Number}]
})

const TokoDorayaki = mongoose.model('Toko Dorayaki', tokoDorayakiSchema);

module.exports = TokoDorayaki;