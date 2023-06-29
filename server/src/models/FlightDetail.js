const mongoose = require('mongoose');
const generateTime = require('../helpers/dummyData');

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
        type: Date,
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

FlightDetailSchema.statics.findById = async function (id) {
    const FlightDetail = this;
    const flight = await FlightDetail.findOne({
         _id: id
    }).populate("passengers", {
         email: 1,
          _id: 1
    });

    return flight;
};

FlightDetailSchema.methods.showFormattedFlight = () => {
    const flight = this;
    const { from, to, date, passengerCount, group } = flight;
    const detail = { from, to, date, passengerCount, group };

    detail.airline = airlines[Math.floor(Math.random() * airlines.length)];
    detail.price = Math.floor(Math.random() * 7000) + 3000;
    [detail.fromTime, detail.toTime, detail.duration] = generateTime();
    detail.passengers = [];

    return detail;
};

const FlightDetail = mongoose.model("FlightDetail", FlightDetailSchema);

module.exports = FlightDetail;