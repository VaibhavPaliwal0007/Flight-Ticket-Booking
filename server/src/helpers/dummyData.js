const { airlines, airports } = require("./airports");
const { FlightDetail } = require("../models");
const generateTime = require("./generateTime");

const generateDummyDataForNextMonth = async () => {
    for (let i = 0; i < 100; i++) {
        const fromAirport = airports[Math.floor(Math.random() * airports.length)];
        const toAirport = airports[Math.floor(Math.random() * airports.length)];
        const date = new Date();

        date.setDate(date.getDate() + Math.floor(Math.random() * 30) + 1);

        const [fromTime, toTime, duration] = generateTime();

        const obj = {
            from: fromAirport.city_name,
            to: toAirport.city_name,
            date,
            passengerCount: Math.floor(Math.random() * 60) + 1,
            group: Math.floor(Math.random() * 10) + 1,
            fromTime,
            toTime,
            duration,
            price: Math.floor(Math.random() * 7000) + 3000,
            airline: airlines[Math.floor(Math.random() * airlines.length)]
        }

        const flight = new FlightDetail(obj);
        await flight.save();
    }
};

function getCity(code) {
    for (const airport of airports) {
        if (code === airport.IATA_code) return airport.city_name;
    }
};

function sorting(details, sortby) {
    if (sortby === "price") {
        details.sort((a, b) => a.price - b.price);
    } else if (sortby === "duration") {
        details.sort((a, b) => a.duration - b.duration);
    } else if (sortby === "ao") {
        details.sort((a, b) => {
            let fa = a.airline.toLowerCase(),
                fb = b.airline.toLowerCase();
            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        });
    }
    return details;
};

module.exports = {
    getCity,
    sorting,
    generateDummyDataForNextMonth,
    generateTime
};