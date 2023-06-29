const express = require('express');

const app = express();

app.use(express.json());
require('./src/db'); 

const { authenticationRoute, flightRoute } = require('./src/routes');

app.use('/api/v1/auth', authenticationRoute);
app.use('/api/v1/flight', flightRoute);

app.get("*", (req, res) => {
    res.status(404).send({ message: "Page not found" });
});

module.exports = app;

