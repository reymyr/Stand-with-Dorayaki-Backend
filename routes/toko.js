const router = require('express').Router();
let TokoDorayaki = require('../models/toko.model');

// GET
router.route('/').get((req, res) => {
    TokoDorayaki.find()
        .then(toko => {res.json(toko)})
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    TokoDorayaki.findById(req.params.id)
        .then(toko => {res.json(toko)})
        .catch(err => res.status(400).json('Error: ' + err));
});

// POST
router.route('/add').post((req, res) => {
    const nama = req.body.nama;
    const jalan = req.body.jalan;
    const kecamatan = req.body.kecamatan;
    const provinsi = req.body.provinsi;
    const stok = req.body.stok;

    const newToko = new TokoDorayaki({
        nama,
        jalan,
        kecamatan,
        provinsi,
        stok,
    });

    newToko.save()
        .then(() => res.json('Toko Dorayaki added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// PUT
router.route('/:id').put((req, res) => {
    TokoDorayaki.findById(req.params.id)
        .then(toko => {
            toko.nama = req.body.nama ? req.body.nama : toko.nama;
            toko.jalan = req.body.jalan ? req.body.jalan : toko.jalan;
            toko.kecamatan = req.body.kecamatan ? req.body.kecamatan : toko.kecamatan;
            toko.provinsi = req.body.provinsi ? req.body.provinsi : toko.provinsi;
            toko.stok = req.body.stok ? req.body.stok : toko.stok;

            toko.save()
                .then(() => res.json('Toko updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// DELETE
router.route('/:id').delete((req, res) => {
    TokoDorayaki.findByIdAndDelete(req.params.id)
        .then(() => res.json('Toko Dorayaki deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;