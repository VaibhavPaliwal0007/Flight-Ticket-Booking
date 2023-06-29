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
        type: Date,
        required: true
    },

    airline: {
        type: String,
        required: true
    },

    fromTime: {
        type: Date,
        required: true
    },

    toTime: {
        type: Date,
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


const FlightDetail = mongoose.model("FlightDetail", FlightDetailSchema);

module.exports = FlightDetail;