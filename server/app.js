const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// const { generateDummyDataForNextMonth } = require('./src/helpers/dummyData');

app.use(express.json());
require('./src/db'); 

app.use(cors());
app.use(morgan('dev'));

// (async() => {
//     await generateDummyDataForNextMonth();
// })();

const { authenticationRoute, flightRoute } = require('./src/routes');

app.use('/api/v1/auth', authenticationRoute);
app.use('/api/v1/flight', flightRoute);

app.get("*", async (req, res) => {
    res.status(404).send({ message: "Page not found" });
});

module.exports = app;

