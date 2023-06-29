const { FlightDetail } = require("../models");

const bookTicket = async (req, res) => {
    try {
        const flight = await FlightDetail.findById(req.params.id);

        if (!flight) {
            return res.status(404).json({ error: "Flight not found" });
        }

        if (flight.passengers.length >= 60) {
            return res.status(400).json({ error: "Flight is full" });
        }

        flight.passengers.forEach((passenger) => {
            if (passenger.email === req.user.email) {
                return res.status(400).json({ error: "You have already booked a ticket on this flight" });
            }
        });

        flight.passengers.push(req.user._id);
        req.user.bookings.push(flight._id);
        await flight.save();
        await req.user.save();

        res.status(200).json({ flight });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

const searchFlightBasedOnQuery = async (req, res) => {
    try {
        let { from, to, date } = req.body;
        let { limit, start } = req.query;

        if (!limit) {
            limit = 10;
        }

        if (!start) {
            start = 0;
        }

        let flights = null;

        if (!from && !to && !date) {
            flights = await FlightDetail.find().skip(start).limit(limit);
        } else if (from && to && date) {
            flights = await FlightDetail.find({ from: from, to: to, date: date }).skip(start).limit(limit);
        } else if (from && to) {
            flights = await FlightDetail.find({ from: from, to: to }).skip(start).limit(limit);
        } else if (date) {
            flights = await FlightDetail.find({ date: date }).skip(start).limit(limit);
        }

        /*
        flights = await FlightDetail.find({
            ...(from && to && date && { from, to, date }),
            ...(from && to && !date && { from, to }),
            ...(date && !from && !to && { date })
        }).skip(start).limit(limit);
        */

        if (!flights) {
            return res.status(404).json({ message: "Flights not found on particular query" });
        }

        res.status(200).json({ flights });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

const searchFlightBasedOnDates = async (req, res) => {
    const { from, to } = req.body;
    const { limit, start } = req.query;

    if (!limit) {
        limit = 10;
    }

    if (!start) {
        start = 0;
    }

    try {
        const flights = await FlightDetail.find({ date: { $gte: from, $lte: to } }).skip(start).limit(limit);

        if (!flights) {
            return res.status(404).json({ message: "Flights not found on particular query" });
        }

        res.status(200).json({ flights });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

const getMyBookings = async (req, res) => {
    try {
        await req.user.populate("bookings").execPopulate();
        res.status(200).json({ bookings: req.user.bookings });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

const addFlight = async (req, res) => {
    try {
        const flight = new FlightDetail(req.body);
        await flight.save();
        res.status(201).json({ flight });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

const removeFlight = async (req, res) => {
    try {
        const flight = await FlightDetail.findByIdAndDelete(req.params._id);

        if (!flight) {
            return res.status(404).json({ error: "Flight not found" });
        }

        res.status(200).json({ flight });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

const removeFlights = async (req, res) => {
    try {
        const flights = await FlightDetail.deleteMany({ _id: { $in: req.body.ids } });
        res.status(200).json({ flights });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

const viewAllBookingsAtADate = async (req, res) => {
    try {

        const { date } = req.body;
        let { limit, start } = req.query;

        if (!limit) {
            limit = 10;
        }

        if (!start) {
            start = 0;
        }

        const flights = await FlightDetail.find({ date: date }).skip(start).limit(limit).populate("passengers");

        if (!flights) {
            return res.status(404).json({ message: "Flights not found on particular query" });
        }

        res.status(200).json({ flights, nextStart: start + limit });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

const viewAllBookingsOnDates = async (req, res) => {
    try {
        const { from, to } = req.body;
        let { limit, start } = req.query;

        if (!limit) {
            limit = 10;
        }

        if (!start) {
            start = 0;
        }

        const flights = await FlightDetail.find({ date: { $gte: from, $lte: to } }).skip(start).limit(limit).populate("passengers");

        if (!flights) {
            return res.status(404).json({ message: "Flights not found on particular query" });
        }

        for (let flight of flights) {
            flight = flight.showFormattedFlight()
        }

        res.status(200).json({ flights, nextStart: start + limit });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

module.exports = {
    bookTicket,
    searchFlightBasedOnQuery,
    searchFlightBasedOnDates,
    getMyBookings,
    addFlight,
    removeFlight,
    removeFlights,
    viewAllBookingsAtADate,
    viewAllBookingsOnDates
};

