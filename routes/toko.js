const router = require('express').Router();

const TokoDorayaki = require('../models/toko.model');

// GET
// Mengambil semua toko dorayaki
router.route('/').get((req, res) => {
    TokoDorayaki.find()
        .then(toko => {res.json(toko)})
        .catch(err => res.status(400).json('Error: ' + err));
});

// Mengambil toko dorayaki sesuai id
router.route('/:id').get((req, res) => {
    TokoDorayaki.findById(req.params.id)
        .populate('stok.dorayaki')
        .then(toko => {res.json(toko)})
        .catch(err => res.status(400).json('Error: ' + err));
});

// POST
// Menambah toko dorayaki
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
        .then(() => res.status(201).json('Toko Dorayaki added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// PUT
// Mengubah data toko dorayaki
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

// PATCH
// Menambah atau mengurangi stok
router.route('/:id/stok').patch((req, res) => {
    const stok = req.body.stok;
    TokoDorayaki.findById(req.params.id)
        .then(toko => {
            stokToko = toko.stok;
            stok.forEach(element => {
                dorayakiTambahan = stokToko.find(it => it.dorayaki == element.dorayaki);
                if (dorayakiTambahan) {
                    dorayakiTambahan.jumlah += element.jumlah;
                } else {
                    stokToko.push(element);
                }
            });
            
            toko.save((err, toko) => {
                if (err) {
                    res.status(400).json('Error: ' + err)
                } else {
                    TokoDorayaki.populate(toko, {path: 'stok.dorayaki'})
                        .then((toko) => {
                            console.log(toko);
                            res.status(200).json({message: 'Stock updated', stok: toko.stok})
                        })
                }
            })
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


// Memindahkan stok dari satu toko ke toko lain
router.route('/transfer').patch((req, res) => {
    const asal = req.body.asal;
    const tujuan = req.body.tujuan;
    const stok = req.body.stok;

    TokoDorayaki.findById(asal)
        .then(tokoAsal => {
            stokAsal = tokoAsal.stok;

            stok.forEach(element => {
                stokAsal[stokAsal.findIndex(it => it.dorayaki == element.dorayaki)].jumlah -= element.jumlah;
            });

            tokoAsal.save()
                .then(() => {
                    TokoDorayaki.findById(tujuan)
                        .then(tokoTujuan => {
                            stokTujuan = tokoTujuan.stok;
                            stok.forEach(element => {
                                dorayakiTambahan = stokTujuan.find(it => it.dorayaki == element.dorayaki);
                                if (dorayakiTambahan) {
                                    dorayakiTambahan.jumlah += element.jumlah;
                                } else {
                                    stokTujuan.push(element);
                                }
                            });
                            
                            tokoTujuan.save()
                                .catch(err => res.status(400).json('Error: ' + err));
                        })
                        .then(() => res.status(200).json('Stok berhasil dipindahkan'))
                        .catch(err => res.status(400).json('Error: ' + err));    
                })
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// DELETE
// Menghapus toko sesuai id
router.route('/:id').delete((req, res) => {
    TokoDorayaki.findByIdAndDelete(req.params.id)
        .then(() => res.json('Toko Dorayaki deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;