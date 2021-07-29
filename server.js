const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const {
    MONGO_HOSTNAME,
    MONGO_DB,
    MONGO_PORT
} = process.env;

mongoose.connect(`mongodb://${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}`, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connected");
})

const dorayakiRouter = require('./routes/dorayaki');
const tokoRouter = require('./routes/toko');

app.use('/dorayaki', dorayakiRouter);
app.use('/toko', tokoRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
});