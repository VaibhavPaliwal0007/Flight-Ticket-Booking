const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send("Hello World");
});

app.get("*", (req, res) => {
    res.status(404).send({ message: "Page not found" });
});

module.exports = app;

