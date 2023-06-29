const mongoose = require('mongoose');

const FlightDetailSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true

    },

    to: {
        type: String,
        required: true
    },

    date: {
        type: String,
        required: true
    },

    airline: {
        type: String,
        required: true
    },

    fromTime: {
        type: String,
        required: true
    },

    toTime: {
        type: String,
        required: true
    },

    passengers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
});

const FlightDetail = mongoose.model("FlightDetail", FlightDetailSchema);

module.exports = FlightDetail;